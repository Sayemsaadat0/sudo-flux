'use client'

import { useVisitorTracking } from '@/hooks/useVisitorTracking'
import VisitorConsentBox from './VisitorConsentModal'

interface VisitorTrackingProviderProps {
  children: React.ReactNode
}

export default function VisitorTrackingProvider({ children }: VisitorTrackingProviderProps) {
  const { 
    showConsentModal, 
    updateSessionWithConsent 
  } = useVisitorTracking()

  return (
    <>
      {children}
      
      {/* Visitor Consent Box */}
      <VisitorConsentBox
        isOpen={showConsentModal}
        onAccept={() => updateSessionWithConsent(true)}
        onReject={() => updateSessionWithConsent(false)}
      />
    </>
  )
}
