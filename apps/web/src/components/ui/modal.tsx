import * as React from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Modal({ 
  open, 
  onClose, 
  title, 
  children, 
  footer,
  size = 'md' 
}: ModalProps) {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-0"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`
        relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-amber-200 dark:border-amber-700
        ${sizeClasses[size]} w-full mx-4 max-h-[90vh] overflow-hidden
        animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-200
      `}>
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-amber-100 dark:border-amber-700">
            <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-100">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-amber-600" />
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className="border-t border-amber-100 dark:border-amber-700 p-6">
            {footer}
          </div>
        )}
        
        {/* Close button when no title */}
        {!title && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg hover:bg-amber-100 transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-amber-600" />
          </button>
        )}
      </div>
    </div>
  )
} 