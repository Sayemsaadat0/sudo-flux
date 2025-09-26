"use client"

import * as React from "react"
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export interface CustomToastProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type?: 'success' | 'error' | 'info' | 'warning'
  title: string
  message: string
  autoClose?: boolean
  autoCloseDelay?: number
}

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
}

const toastStyles = {
  success: {
    container: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200",
    icon: "text-green-600",
    title: "text-green-800",
    message: "text-green-700",
    accent: "bg-green-500",
  },
  error: {
    container: "bg-gradient-to-r from-red-50 to-rose-50 border-red-200",
    icon: "text-red-600",
    title: "text-red-800",
    message: "text-red-700",
    accent: "bg-red-500",
  },
  info: {
    container: "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200",
    icon: "text-blue-600",
    title: "text-blue-800",
    message: "text-blue-700",
    accent: "bg-blue-500",
  },
  warning: {
    container: "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200",
    icon: "text-yellow-600",
    title: "text-yellow-800",
    message: "text-yellow-700",
    accent: "bg-yellow-500",
  },
}

export function CustomToast({
  open,
  onOpenChange,
  type = 'success',
  title,
  message,
  autoClose = true,
  autoCloseDelay = 5000,
}: CustomToastProps) {
  const Icon = toastIcons[type]
  const styles = toastStyles[type]

  React.useEffect(() => {
    if (open && autoClose) {
      const timer = setTimeout(() => {
        onOpenChange(false)
      }, autoCloseDelay)

      return () => clearTimeout(timer)
    }
  }, [open, autoClose, autoCloseDelay, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/20 backdrop-blur-sm" />
        <DialogContent 
          className={cn(
            "fixed top-1/2 left-1/2 z-[100] w-full max-w-md p-0 border-0 shadow-2xl",
            "transform -translate-x-1/2 -translate-y-1/2",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-top-full data-[state=open]:slide-in-from-top-full",
            styles.container
          )}
          showCloseButton={false}
        >
          {/* Visually hidden title for accessibility */}
          <DialogTitle className="sr-only">
            {title}
          </DialogTitle>
          
          <div className="relative overflow-hidden rounded-lg">
            {/* Animated accent bar */}
            <div className={cn("absolute top-0 left-0 h-1 w-full", styles.accent)} />
            
            {/* Content */}
            <div className="p-6">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={cn("flex-shrink-0", styles.icon)}>
                  <Icon className="h-6 w-6" />
                </div>
                
                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <h3 className={cn("text-lg font-semibold mb-1", styles.title)}>
                    {title}
                  </h3>
                  <p className={cn("text-sm leading-relaxed", styles.message)}>
                    {message}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress bar for auto-close */}
            {autoClose && (
              <div className="absolute bottom-0 left-0 h-1 bg-black/10 w-full">
                <div 
                  className={cn("h-full transition-all ease-linear", styles.accent)}
                  style={{
                    animation: `shrink ${autoCloseDelay}ms linear forwards`
                  }}
                />
              </div>
            )}
          </div>

          {/* Custom styles for animations */}
          <style jsx>{`
            @keyframes shrink {
              from { width: 100%; }
              to { width: 0%; }
            }
          `}</style>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

// Specialized components for common use cases
export function SuccessToast(props: Omit<CustomToastProps, 'type'>) {
  return <CustomToast {...props} type="success" />
}

export function ErrorToast(props: Omit<CustomToastProps, 'type'>) {
  return <CustomToast {...props} type="error" />
}

export function InfoToast(props: Omit<CustomToastProps, 'type'>) {
  return <CustomToast {...props} type="info" />
}

export function WarningToast(props: Omit<CustomToastProps, 'type'>) {
  return <CustomToast {...props} type="warning" />
}
