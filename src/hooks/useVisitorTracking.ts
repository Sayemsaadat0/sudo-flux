'use client'

import { useState, useEffect, useCallback } from 'react'
import { useCreateOrUpdateVisitor } from './visitors.hooks'
import { useUserLocation } from './useUserLocation'
import { SessionDetails, PageAnalytics } from '@/models/Visitor'

// Utility function to get device type
const getDeviceType = (): "Desktop" | "Mobile" | "Tablet" => {
  const userAgent = navigator.userAgent.toLowerCase()
  
  if (/tablet|ipad|playbook|silk/.test(userAgent)) {
    return "Tablet"
  }
  
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/.test(userAgent)) {
    return "Mobile"
  }
  
  return "Desktop"
}

// Utility function to get browser type
const getBrowserType = (): string => {
  const userAgent = navigator.userAgent
  
  if (userAgent.includes('Chrome')) {
    const version = userAgent.match(/Chrome\/(\d+)/)?.[1] || 'Unknown'
    return `Chrome ${version}`
  }
  
  if (userAgent.includes('Firefox')) {
    const version = userAgent.match(/Firefox\/(\d+)/)?.[1] || 'Unknown'
    return `Firefox ${version}`
  }
  
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    const version = userAgent.match(/Version\/(\d+)/)?.[1] || 'Unknown'
    return `Safari ${version}`
  }
  
  if (userAgent.includes('Edge')) {
    const version = userAgent.match(/Edge\/(\d+)/)?.[1] || 'Unknown'
    return `Edge ${version}`
  }
  
  return 'Unknown Browser'
}

// Utility function to get location from cached data or IP geolocation
const getLocationFromCache = (): string => {
  try {
    const cachedLocation = localStorage.getItem('visitor-location-cache')
    if (cachedLocation) {
      const { location, timestamp } = JSON.parse(cachedLocation)
      // Cache valid for 24 hours
      const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000
      if (!isExpired) {
        return location
      }
    }
  } catch (error) {
    console.warn('Failed to read location cache:', error)
  }
  return "pending"
}

// Utility function to get IP address from cached data
const getIPFromCache = (): string => {
  try {
    const cachedLocation = localStorage.getItem('visitor-location-cache')
    if (cachedLocation) {
      const { ip, timestamp } = JSON.parse(cachedLocation)
      // Cache valid for 24 hours
      const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000
      if (!isExpired) {
        return ip
      }
    }
  } catch (error) {
    console.warn('Failed to read IP cache:', error)
  }
  return "pending"
}

// Utility function to cache location data
const cacheLocationData = (location: string, ip: string) => {
  try {
    const cacheData = {
      location,
      ip,
      timestamp: Date.now()
    }
    localStorage.setItem('visitor-location-cache', JSON.stringify(cacheData))
  } catch (error) {
    console.warn('Failed to cache location data:', error)
  }
}

// Global flag to prevent multiple initializations
let isGlobalInitialized = false

export const useVisitorTracking = () => {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [showConsentModal, setShowConsentModal] = useState(false)
  const [isTracking, setIsTracking] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [currentPage, setCurrentPage] = useState('')
  const [pageStartTime, setPageStartTime] = useState<number>(Date.now())
  const [isLocationFetching, setIsLocationFetching] = useState(false)
  
  const createOrUpdateVisitor = useCreateOrUpdateVisitor()
  const { locationData, fetchLocation, loading: locationLoading } = useUserLocation()

  // Initialize visitor tracking
  const initializeTracking = useCallback(async () => {
    if (isTracking || isInitialized || isGlobalInitialized) return

    try {
      setIsTracking(true)
      setIsInitialized(true)
      isGlobalInitialized = true
      
      // Get current page
      const currentPath = window.location.pathname
      setCurrentPage(currentPath)
      setPageStartTime(Date.now())

      // Check if user already has a session (using localStorage)
      const existingSessionId = localStorage.getItem('visitor-session-id')
      
      if (existingSessionId) {
        // User already has a session, use it
        setSessionId(existingSessionId)
        
        // Check if consent was already given
        const consent = localStorage.getItem('visitor-consent')
        if (consent) {
          // User already gave consent, no need to show modal
          setShowConsentModal(false)
        } else {
          // Show consent modal for existing session
          setShowConsentModal(true)
        }
        
        // Update existing session with new page visit
        const analytics: PageAnalytics[] = [{
          page_name: currentPath,
          previous_page: null,
          page_sections: [{
            name: 'page_load',
            previous_section: null,
            duration: 0
          }]
        }]

        try {
          await createOrUpdateVisitor.mutateAsync({
            session_id: existingSessionId,
            analytics: analytics
          })
        } catch {
          // If session not found, clear localStorage and create new session
          console.warn('Existing session not found, creating new session')
          localStorage.removeItem('visitor-session-id')
          localStorage.removeItem('visitor-consent')
          
          // Create new session with cached location data if available
          try {
            const cachedIP = getIPFromCache()
            const cachedLocation = getLocationFromCache()
            
            const response = await createOrUpdateVisitor.mutateAsync({
              session_details: {
                ip_address: cachedIP,
                location: cachedLocation,
                browser_type: getBrowserType(),
                device_type: getDeviceType()
              },
              analytics: analytics
            })
            
            if (response.success && response.data) {
              const newSessionId = response.data.session_id
              setSessionId(newSessionId)
              localStorage.setItem('visitor-session-id', newSessionId)
            }
          } catch (createError) {
            console.error('Failed to create new session:', createError)
          }
          
          // Always show consent modal when creating new session (regardless of API success/failure)
          setShowConsentModal(true)
        }
      } else {
        // Create new session only if none exists
        const initialAnalytics: PageAnalytics[] = [{
          page_name: currentPath,
          previous_page: null,
          page_sections: [{
            name: 'page_load',
            previous_section: null,
            duration: 0
          }]
        }]

        const initialSessionDetails: SessionDetails = {
          ip_address: getIPFromCache(),
          location: getLocationFromCache(),
          browser_type: getBrowserType(),
          device_type: getDeviceType()
        }

        try {
          const response = await createOrUpdateVisitor.mutateAsync({
            session_details: initialSessionDetails,
            analytics: initialAnalytics
          })

          if (response.success && response.data) {
            const newSessionId = response.data.session_id
            setSessionId(newSessionId)
            localStorage.setItem('visitor-session-id', newSessionId)
          }
        } catch (createError) {
          console.error('Failed to create initial session:', createError)
        }
        
        // Always show consent modal for new users (regardless of API success/failure)
        setShowConsentModal(true)
      }
    } catch (error) {
      console.error('Failed to initialize visitor tracking:', error)
      // Even if initialization fails completely, show the consent modal
      setShowConsentModal(true)
    } finally {
      setIsTracking(false)
    }
  }, [isTracking, isInitialized, createOrUpdateVisitor])

  // Update session with user consent
  const updateSessionWithConsent = useCallback(async (consent: boolean) => {
    // Always close the modal first, regardless of API success/failure
    setShowConsentModal(false)
    
    // Store consent in localStorage immediately
    localStorage.setItem('visitor-consent', consent ? 'accepted' : 'rejected')
    
    // If no session ID, we can't update the session but consent is still recorded
    if (!sessionId) {
      console.warn('No session ID available, consent recorded in localStorage only')
      return
    }

    try {
      let sessionDetails: SessionDetails

      if (consent) {
        // Check if we have cached location data first
        const cachedIP = getIPFromCache()
        const cachedLocation = getLocationFromCache()
        
        if (cachedIP !== "pending" && cachedLocation !== "pending") {
          // Use cached data
          sessionDetails = {
            ip_address: cachedIP,
            location: cachedLocation,
            browser_type: getBrowserType(),
            device_type: getDeviceType()
          }
        } else {
          // Fetch fresh location data
          setIsLocationFetching(true)
          try {
            await fetchLocation()
            
            // Wait for location data to be available
            const maxWaitTime = 10000 // 10 seconds
            const startTime = Date.now()
            
            while (!locationData && (Date.now() - startTime) < maxWaitTime) {
              await new Promise(resolve => setTimeout(resolve, 100))
            }
            
            if (locationData) {
              // Format location for visitor tracking
              const locationString = `${locationData.city}, ${locationData.country}`
              
              // Cache the location data
              cacheLocationData(locationString, locationData.ip)
              
              sessionDetails = {
                ip_address: locationData.ip,
                location: locationString,
                browser_type: getBrowserType(),
                device_type: getDeviceType()
              }
            } else {
              // Fallback to cached or pending values
              sessionDetails = {
                ip_address: cachedIP !== "pending" ? cachedIP : "unknown",
                location: cachedLocation !== "pending" ? cachedLocation : "unknown",
                browser_type: getBrowserType(),
                device_type: getDeviceType()
              }
            }
          } catch (locationError) {
            console.warn('Failed to fetch location data:', locationError)
            // Use cached or fallback data
            sessionDetails = {
              ip_address: cachedIP !== "pending" ? cachedIP : "unknown",
              location: cachedLocation !== "pending" ? cachedLocation : "unknown",
              browser_type: getBrowserType(),
              device_type: getDeviceType()
            }
          } finally {
            setIsLocationFetching(false)
          }
        }
      } else {
        // Use anonymized data
        sessionDetails = {
          ip_address: 'anonymized',
          location: 'anonymized',
          browser_type: getBrowserType(),
          device_type: getDeviceType()
        }
      }

      // Update the session with real details using the details-update API
      const response = await fetch('/api/visitors/details-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          session_details: sessionDetails
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update session details')
      }
    } catch (error) {
      console.error('Failed to update session with consent:', error)
      // Note: Modal is already closed and consent is already stored in localStorage
      // The user experience is not affected by API failures
    }
  }, [sessionId, locationData, fetchLocation])

  // Track page changes
  const trackPageChange = useCallback(async (newPage: string) => {
    if (!sessionId || !currentPage) return

    try {
      const timeSpent = Math.floor((Date.now() - pageStartTime) / 1000)
      
      const analytics: PageAnalytics[] = [{
        page_name: newPage,
        previous_page: currentPage,
        page_sections: [{
          name: 'page_view',
          previous_section: 'page_load',
          duration: timeSpent
        }]
      }]

      try {
        await createOrUpdateVisitor.mutateAsync({
          session_id: sessionId,
          analytics: analytics
        })
        setCurrentPage(newPage)
      } catch {
        console.warn('Failed to update session, clearing localStorage')
        localStorage.removeItem('visitor-session-id')
        localStorage.removeItem('visitor-consent')
        setSessionId(null)
      }
      setPageStartTime(Date.now())
    } catch (error) {
      console.error('Failed to track page change:', error)
    }
  }, [sessionId, currentPage, pageStartTime, createOrUpdateVisitor])

  // Track section changes
  const trackSectionChange = useCallback(async (sectionName: string, previousSection: string | null = null) => {
    if (!sessionId) return

    try {
      const timeSpent = Math.floor((Date.now() - pageStartTime) / 1000)
      
      const analytics: PageAnalytics[] = [{
        page_name: currentPage,
        previous_page: null,
        page_sections: [{
          name: sectionName,
          previous_section: previousSection,
          duration: timeSpent
        }]
      }]

      try {
        await createOrUpdateVisitor.mutateAsync({
          session_id: sessionId,
          analytics: analytics
        })
        setPageStartTime(Date.now())
      } catch {
        console.warn('Failed to update session, clearing localStorage')
        localStorage.removeItem('visitor-session-id')
        localStorage.removeItem('visitor-consent')
        setSessionId(null)
      }
    } catch (error) {
      console.error('Failed to track section change:', error)
    }
  }, [sessionId, currentPage, pageStartTime, createOrUpdateVisitor])

  // Initialize tracking on mount - only once
  useEffect(() => {
    // Check if user already has a session
    const existingSessionId = localStorage.getItem('visitor-session-id')
    const hasConsent = localStorage.getItem('visitor-consent')
    
    if (existingSessionId) {
      // User has existing session, set it and check consent
      setSessionId(existingSessionId)
      if (!hasConsent) {
        // Always show consent modal for existing sessions without consent
        setShowConsentModal(true)
      }
      // Still initialize tracking to update the session
      initializeTracking()
    } else if (!hasConsent) {
      // No session and no consent, show modal immediately and then initialize tracking
      setShowConsentModal(true)
      initializeTracking()
    }
  }, [initializeTracking]) // Include initializeTracking dependency

  // Track page changes
  useEffect(() => {
    const handleRouteChange = () => {
      const newPage = window.location.pathname
      if (newPage !== currentPage && sessionId) {
        trackPageChange(newPage)
      }
    }

    // Listen for route changes (for Next.js)
    window.addEventListener('popstate', handleRouteChange)
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [currentPage, sessionId, trackPageChange])

  return {
    sessionId,
    showConsentModal,
    isTracking,
    isLocationFetching,
    locationLoading,
    updateSessionWithConsent,
    trackSectionChange,
    initializeTracking
  }
}
