'use client'

import { useState } from 'react'
import { X, Shield, Check, X as XIcon } from 'lucide-react'

interface VisitorConsentBoxProps {
  isOpen: boolean
  onAccept: () => void
  onReject: () => void
}

export default function VisitorConsentBox({ isOpen, onAccept, onReject }: VisitorConsentBoxProps) {
  const [isClosing, setIsClosing] = useState(false)

  const handleAccept = () => {
    localStorage.setItem('visitor-consent', 'accepted')
    onAccept()
  }

  const handleReject = () => {
    localStorage.setItem('visitor-consent', 'rejected')
    onReject()
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
          <p className="text-sudo-neutral-5 text-xs leading-relaxed mb-3">
            We use analytics to improve your experience. We may collect your location, device type, browser info, and page analytics.
          </p>
          
          <div className="mb-4 p-2 bg-sudo-blue-1 rounded text-xs text-sudo-blue-6">
            <strong>Note:</strong> We never collect personal information. All data is anonymized.
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleReject}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-sudo-white-3 rounded text-sudo-neutral-5 hover:bg-sudo-white-1 transition-colors text-xs font-medium"
            >
              <XIcon size={12} />
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 text-white rounded hover:shadow-lg transition-all duration-200 text-xs font-medium"
            >
              <Check size={12} />
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
