import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'glass'
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  const baseClasses = 'rounded-xl border transition-all duration-200'
  
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border-amber-200 dark:border-amber-700 shadow-sm hover:shadow-md dark:hover:shadow-amber-900/20',
    elevated: 'bg-white dark:bg-gray-800 border-amber-300 dark:border-amber-600 shadow-lg hover:shadow-xl dark:hover:shadow-amber-900/30',
    glass: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-amber-200/50 dark:border-amber-700/50 shadow-lg hover:shadow-xl dark:hover:shadow-amber-900/30'
  }

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`p-6 pb-0 ${className}`}>
      {children}
    </div>
  )
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  )
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  )
} 