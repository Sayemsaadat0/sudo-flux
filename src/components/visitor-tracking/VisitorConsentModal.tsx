'use client'

import { useState, useEffect } from 'react'
import { X, Shield, Check, X as XIcon } from 'lucide-react'
import { formatVisitorCode } from '@/lib/utils'
import { useUserLocation } from '@/hooks/useUserLocation'
import { SessionDetails, PageAnalytics } from '@/models/Visitor'
import { getDeviceType, getBrowserType } from '@/utils/deviceUtils'

interface VisitorConsentBoxProps {
  isOpen: boolean
  onAccept: () => void
  onReject: () => void
  isLocationFetching?: boolean
  visitorCode?: string | null
  onClose?: () => void
}

export default function VisitorConsentBox({ isOpen, onAccept, onReject, isLocationFetching = false, visitorCode, onClose }: VisitorConsentBoxProps) {
  const [isClosing, setIsClosing] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [fetchedLocationData, setFetchedLocationData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  
  // Initialize hooks
  const { locationData, loading: locationLoading } = useUserLocation()

  console.log('🔍 VisitorConsentModal - Component State:', {
    isOpen,
    visitorCode,
    isLocationFetching,
    locationLoading,
    locationData,
    fetchedLocationData,
    isProcessing
  })

  // Console log the session ID whenever it changes
  useEffect(() => {
    if (visitorCode) {
      console.log('🎫 VisitorConsentModal - Session ID received from provider:', visitorCode)
      console.log('🎫 VisitorConsentModal - Session ID length:', visitorCode.length)
      console.log('🎫 VisitorConsentModal - Session ID is 12 digits:', visitorCode.length === 12)
    } else {
      console.log('❌ VisitorConsentModal - No session ID received from provider')
    }
  }, [visitorCode])

  // Automatically fetch location when component mounts
  useEffect(() => {
    console.log('🚀 VisitorConsentModal - Component mounted, fetching location automatically')
    
    const fetchLocationOnMount = async () => {
      try {
        console.log('📍 Starting automatic location fetch...')
        const locationResult = await fetchLocationDirectly()
        if (locationResult) {
          console.log('✅ Location fetched successfully on mount:', locationResult)
          setFetchedLocationData(locationResult)
        } else {
          console.log('❌ Location fetch failed on mount')
        }
      } catch (error) {
        console.error('💥 Error fetching location on mount:', error)
      }
    }

    fetchLocationOnMount()
  }, []) // Empty dependency array - run only on mount

  // Direct location fetching function
  const fetchLocationDirectly = async () => {
    const services = [
      { url: "https://ipinfo.io/json", name: "ipinfo.io" },
      { url: "http://ip-api.com/json", name: "ip-api.com" },
      { url: "https://ipapi.com/ip_api.php?ip=", name: "ipapi.com" }
    ]

    for (const service of services) {
      try {
        const response = await fetch(service.url, {
          method: "GET",
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(5000),
        })

        if (response.ok) {
          const data = await response.json()
          console.log(`Successfully fetched location from ${service.name}:`, data)
          
          // Map the data to our format
          return {
            city: data.city || data.loc?.split(",")[0] || "",
            country: data.country_name || data.country || "",
            countryCode: data.countryCode || data.country_code || "",
            region: data.region || data.loc?.split(",")[1]?.trim() || "",
            regionName: data.regionName || data.region || "",
            postal: data.postal || data.postalCode || data.postcode || data.zip || "",
            timezone: data.timezone || "",
            ip: data.ip || "",
          }
        }
      } catch (error) {
        console.log(`${service.name} failed:`, error)
      }
    }
    return null
  }

  const handleAccept = async () => {
    console.log('🎯 handleAccept called')
    
    if (isProcessing) {
      console.log('⏳ Already processing, ignoring accept call')
      return
    }
    
    console.log('🔄 Setting processing state to true')
    setIsProcessing(true)
    setError(null) // Clear any previous errors
    
    try {
      console.log('📋 Starting accept handler logic')
      
      let sessionDetails: SessionDetails
      
      // Use already fetched location data (fetched on mount)
      if (fetchedLocationData) {
        console.log('✅ Using pre-fetched location data:', fetchedLocationData)
        const locationString = `${fetchedLocationData.city}, ${fetchedLocationData.country}`
        sessionDetails = {
          ip_address: fetchedLocationData.ip,
          location: locationString,
          browser_type: getBrowserType(),
          device_type: getDeviceType()
        }
        console.log('📍 Session details with location:', sessionDetails)
      } else {
        console.log('❌ No pre-fetched location data available, using fallback')
        sessionDetails = {
          ip_address: 'unknown',
          location: 'unknown',
          browser_type: getBrowserType(),
          device_type: getDeviceType()
        }
        console.log('🔧 Session details with fallback:', sessionDetails)
      }
      
      // Create analytics for consent acceptance
      const analytics: PageAnalytics[] = [{
        page_name: window.location.pathname,
        previous_page: null,
        page_sections: [{
          name: 'consent_accepted',
          previous_section: null,
          duration: 0
        }]
      }]
      
      console.log('📊 Analytics data:', analytics)
      
      // Create or update visitor session using the new hook
      if (visitorCode) {
        console.log('🎫 Using session ID from provider:', visitorCode)
        
        // First, try to create the session (this will work even if session exists)
        console.log('🔄 Creating session with POST /api/visitors')
        try {
          const createResponse = await fetch('/api/visitors', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              session_id: visitorCode,
              session_details: sessionDetails,
              analytics: analytics
            })
          })
          
          if (createResponse.ok) {
            const createResult = await createResponse.json()
            console.log('✅ Session created/updated successfully:', createResult)
          } else {
            let errorData;
            try {
              errorData = await createResponse.json()
            } catch (jsonError) {
              console.error('❌ Failed to parse error response:', jsonError)
              errorData = { error: 'Unknown error occurred', status: createResponse.status }
            }
            
            console.error('❌ Failed to create/update session:', {
              status: createResponse.status,
              statusText: createResponse.statusText,
              errorData
            })
            
            // Provide user-friendly error messages
            let errorMessage = 'Failed to create session'
            if (errorData.error) {
              errorMessage = errorData.error
            } else if (createResponse.status === 400) {
              errorMessage = 'Invalid data provided'
            } else if (createResponse.status === 404) {
              errorMessage = 'Session not found'
            } else if (createResponse.status === 409) {
              errorMessage = 'Session already exists'
            } else if (createResponse.status === 422) {
              errorMessage = 'Data validation failed'
            } else if (createResponse.status >= 500) {
              errorMessage = 'Server error occurred'
            }
            
            throw new Error(errorMessage)
          }
        } catch (createError) {
          console.error('💥 Error creating session:', createError)
          throw createError
        }
      } else {
        console.log('❌ No visitor code available, cannot create session')
      }
      
      console.log('🎉 Visitor consent accepted with location data:', sessionDetails)
    } catch (error) {
      console.error('💥 Failed to process consent acceptance:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      console.log('🏁 Accept handler finished, cleaning up...')
      setIsProcessing(false)
      console.log('📞 Calling onAccept callback')
    onAccept()
      console.log('🚪 Calling onClose callback')
      onClose?.()
    }
  }

  const handleReject = async () => {
    console.log('❌ handleReject called')
    
    if (isProcessing) {
      console.log('⏳ Already processing, ignoring reject call')
      return
    }
    
    console.log('🔄 Setting processing state to true')
    setIsProcessing(true)
    setError(null) // Clear any previous errors
    
    try {
      console.log('📋 Starting reject handler logic')
      
      // Use anonymized data when user rejects
      const sessionDetails: SessionDetails = {
        ip_address: 'anonymized',
        location: 'anonymized',
        browser_type: getBrowserType(),
        device_type: getDeviceType()
      }
      
      console.log('🔒 Session details with anonymized data:', sessionDetails)
      
      // Create analytics for consent rejection
      const analytics: PageAnalytics[] = [{
        page_name: window.location.pathname,
        previous_page: null,
        page_sections: [{
          name: 'consent_rejected',
          previous_section: null,
          duration: 0
        }]
      }]
      
      console.log('📊 Analytics data:', analytics)
      
      // Create or update visitor session using the new hook
      if (visitorCode) {
        console.log('🎫 Using session ID from provider:', visitorCode)
        
        // First, try to create the session (this will work even if session exists)
        console.log('🔄 Creating session with POST /api/visitors')
        try {
          const createResponse = await fetch('/api/visitors', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              session_id: visitorCode,
              session_details: sessionDetails,
              analytics: analytics
            })
          })
          
          if (createResponse.ok) {
            const createResult = await createResponse.json()
            console.log('✅ Session created/updated successfully with anonymized data:', createResult)
          } else {
            let errorData;
            try {
              errorData = await createResponse.json()
            } catch (jsonError) {
              console.error('❌ Failed to parse error response:', jsonError)
              errorData = { error: 'Unknown error occurred', status: createResponse.status }
            }
            
            console.error('❌ Failed to create/update session:', {
              status: createResponse.status,
              statusText: createResponse.statusText,
              errorData
            })
            
            // Provide user-friendly error messages
            let errorMessage = 'Failed to create session'
            if (errorData.error) {
              errorMessage = errorData.error
            } else if (createResponse.status === 400) {
              errorMessage = 'Invalid data provided'
            } else if (createResponse.status === 404) {
              errorMessage = 'Session not found'
            } else if (createResponse.status === 409) {
              errorMessage = 'Session already exists'
            } else if (createResponse.status === 422) {
              errorMessage = 'Data validation failed'
            } else if (createResponse.status >= 500) {
              errorMessage = 'Server error occurred'
            }
            
            throw new Error(errorMessage)
          }
        } catch (createError) {
          console.error('💥 Error creating session:', createError)
          throw createError
        }
      } else {
        console.log('❌ No visitor code available, cannot create session')
      }
      
      console.log('🚫 Visitor consent rejected, using anonymized data:', sessionDetails)
    } catch (error) {
      console.error('💥 Failed to process consent rejection:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      console.log('🏁 Reject handler finished, cleaning up...')
      setIsProcessing(false)
      console.log('📞 Calling onReject callback')
    onReject()
      console.log('🚪 Calling onClose callback')
      onClose?.()
    }
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      handleReject()
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div className={`fixed bottom-4 right-4 z-50 transform transition-all duration-300 ${
      isClosing ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
    }`}>
      <div className="bg-white rounded-lg shadow-xl border border-sudo-white-2 w-80 max-w-[calc(100vw-2rem)]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sudo-white-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-sudo-blue-1 rounded-full flex items-center justify-center">
              <Shield size={12} className="text-sudo-blue-6" />
            </div>
            <h3 className="text-sm font-semibold text-sudo-neutral-5">Privacy Notice</h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-sudo-white-1 rounded transition-colors"
          >
            <X size={12} className="text-sudo-neutral-3" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {visitorCode && (
            <div className="mb-3 p-2 bg-sudo-purple-1 rounded text-xs text-sudo-purple-6 flex items-center gap-2">
              <Shield size={12} />
              <span><strong>Visitor Code:</strong> {formatVisitorCode(visitorCode)}</span>
            </div>
          )}
          
          <p className="text-sudo-neutral-5 text-xs leading-relaxed mb-3">
            We use analytics to improve your experience. We may collect your location, device type, browser info, and page analytics.
          </p>
          
          {(isLocationFetching || locationLoading || isProcessing) && (
            <div className="mb-4 p-2 bg-sudo-green-1 rounded text-xs text-sudo-green-6 flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-sudo-green-6 border-t-transparent rounded-full animate-spin"></div>
              <span>
                {isProcessing ? 'Processing your choice...' : 
                 isLocationFetching || locationLoading ? 'Detecting your location...' : 
                 'Loading...'}
              </span>
            </div>
          )}
          
          <div className="mb-4 p-2 bg-sudo-blue-1 rounded text-xs text-sudo-blue-6">
            <strong>Note:</strong> We never collect personal information. All data is anonymized.
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700">
              <strong>Error:</strong> {error}
              <button 
                onClick={() => setError(null)}
                className="ml-2 text-red-500 hover:text-red-700 underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleReject}
              disabled={isProcessing}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-sudo-white-3 rounded text-sudo-neutral-5 hover:bg-sudo-white-1 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <XIcon size={12} />
              {isProcessing ? 'Processing...' : 'Reject'}
            </button>
            <button
              onClick={handleAccept}
              disabled={isProcessing}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 text-white rounded hover:shadow-lg transition-all duration-200 text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check size={12} />
              {isProcessing ? 'Processing...' : 'Accept'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
