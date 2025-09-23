/**
 * Utility functions for device and browser detection
 */

export const getDeviceType = (): "Desktop" | "Mobile" | "Tablet" => {
  const userAgent = navigator.userAgent.toLowerCase()
  
  if (/tablet|ipad|playbook|silk/.test(userAgent)) {
    return "Tablet"
  }
  
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/.test(userAgent)) {
    return "Mobile"
  }
  
  return "Desktop"
}

export const getBrowserType = (): string => {
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
