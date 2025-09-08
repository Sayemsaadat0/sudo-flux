'use client'

import { useRef, useEffect, useCallback } from 'react'

interface SectionTrackingData {
  sessionId: string | null
  currentSection: string | null
  sectionStartTime: number
  pageName: string
}

export const useSectionTracking = (pageName: string) => {
  const trackingData = useRef<SectionTrackingData>({
    sessionId: null,
    currentSection: null,
    sectionStartTime: 0,
    pageName: pageName
  })

  // Create session when component mounts
  const createSession = useCallback(async (sectionName: string) => {
    try {
      const response = await fetch('/api/visitors/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page_name: pageName,
          section_name: sectionName
        }),
      })

      if (response.ok) {
        const data = await response.json()
        trackingData.current.sessionId = data.data.session_id
        trackingData.current.currentSection = sectionName
        trackingData.current.sectionStartTime = Date.now()
        console.log('Session created:', data.data.session_id)
      }
    } catch (error) {
      console.error('Failed to create session:', error)
    }
  }, [pageName])

  // Update section when user enters a new section
  const updateSection = useCallback(async (sectionName: string, previousSection: string | null = null) => {
    if (!trackingData.current.sessionId) {
      // Create new session if none exists
      await createSession(sectionName)
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
  }, [pageName, createSession])

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

  // Initialize session on mount
  useEffect(() => {
    // Check if session already exists in localStorage
    const existingSessionId = localStorage.getItem('visitor-session-id')
    
    if (existingSessionId) {
      trackingData.current.sessionId = existingSessionId
    } else {
      // Create session for the first section (you'll call this manually)
      // createSession('hero') // Uncomment and call this when user enters first section
    }
  }, [])

  return {
    createSectionRef,
    updateSection,
    createSession,
    sessionId: trackingData.current.sessionId
  }
}
