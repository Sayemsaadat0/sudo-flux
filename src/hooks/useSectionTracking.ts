'use client'

import { useRef, useEffect, useCallback } from 'react'

interface SectionTrackingData {
  sessionId: string | null
  currentSection: string | null
  sectionStartTime: number
  pageName: string
}

export const useSectionTracking = (pageName: string, sessionId?: string | null) => {
  const trackingData = useRef<SectionTrackingData>({
    sessionId: sessionId || null,
    currentSection: null,
    sectionStartTime: 0,
    pageName: pageName
  })

  // Update sessionId when it changes from parent
  useEffect(() => {
    trackingData.current.sessionId = sessionId || null
  }, [sessionId])

  // Update section when user enters a new section
  const updateSection = useCallback(async (sectionName: string, previousSection: string | null = null) => {
    if (!trackingData.current.sessionId) {
      // No session available, skip tracking
      console.warn('No session available for section tracking')
      return
    }

    try {
      // Calculate duration for previous section
      const duration = Math.floor((Date.now() - trackingData.current.sectionStartTime) / 1000)

      // Update previous section if it exists
      if (trackingData.current.currentSection && duration > 0) {
        await fetch('/api/visitors/update-section', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            session_id: trackingData.current.sessionId,
            page_name: pageName,
            section_name: trackingData.current.currentSection,
            previous_section: previousSection,
            duration: duration
          }),
        })
      }

      // Update current section
      trackingData.current.currentSection = sectionName
      trackingData.current.sectionStartTime = Date.now()

    } catch (error) {
      console.error('Failed to update section:', error)
    }
  }, [pageName])

  // Create ref for section tracking
  const createSectionRef = useCallback((sectionName: string) => {
    return (element: HTMLElement | null) => {
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // User entered this section
              updateSection(sectionName, trackingData.current.currentSection)
            }
          })
        },
        {
          threshold: 0.5, // Trigger when 50% of section is visible
          rootMargin: '0px'
        }
      )

      observer.observe(element)

      // Cleanup function
      return () => {
        observer.disconnect()
      }
    }
  }, [updateSection])

  return {
    createSectionRef,
    updateSection,
    sessionId: trackingData.current.sessionId
  }
}
