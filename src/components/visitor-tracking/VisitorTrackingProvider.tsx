'use client'

import { useEffect, useState } from 'react'
import { useVisitorTracking } from '@/hooks/useVisitorTracking'
import VisitorConsentBox from './VisitorConsentModal'
import { generateVisitorCode } from '@/lib/utils'

interface VisitorTrackingProviderProps {
  children: React.ReactNode
}

export default function VisitorTrackingProvider({ children }: VisitorTrackingProviderProps) {
  const [providerSessionId, setProviderSessionId] = useState<string | null>(null)
  const { 
    showConsentModal, 
    sessionId,
    updateSessionWithConsent
  } = useVisitorTracking()

  // Generate 12-digit session ID when user lands on website
  useEffect(() => {
    console.log('🚀 VisitorTrackingProvider - Component mounted, generating session ID')
    
    // Check if session ID already exists in localStorage
    const existingSessionId = localStorage.getItem('visitor-session-id')
    
    if (existingSessionId) {
      console.log('📋 Using existing session ID from localStorage:', existingSessionId)
      setProviderSessionId(existingSessionId)
    } else {
      // Generate new 12-digit session ID
      const newSessionId = generateVisitorCode()
      console.log('🆕 Generated new 12-digit session ID:', newSessionId)
      
      // Store in localStorage
      localStorage.setItem('visitor-session-id', newSessionId)
      console.log('💾 Session ID stored in localStorage')
      
      setProviderSessionId(newSessionId)
    }
  }, [])

  console.log('🔍 VisitorTrackingProvider - State:', {
    showConsentModal,
    sessionId,
    hasSessionId: !!sessionId,
    providerSessionId,
    hasProviderSessionId: !!providerSessionId
  })

  // Handle accept - let the modal handle the API call, we just close the modal
  const handleAccept = () => {
    console.log('✅ VisitorTrackingProvider - Accept clicked, closing modal')
    updateSessionWithConsent(true) // This will close the modal
  }

  // Handle reject - let the modal handle the API call, we just close the modal  
  const handleReject = () => {
    console.log('❌ VisitorTrackingProvider - Reject clicked, closing modal')
    updateSessionWithConsent(false) // This will close the modal
  }

  return (
    <>
      {children}
      
      {/* Visitor Consent Box */}
      <VisitorConsentBox
        isOpen={showConsentModal}
        onAccept={handleAccept}
        onReject={handleReject}
        visitorCode={providerSessionId}
        onClose={handleReject}
      />
    </>
  )
}
