interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6', 
    lg: 'h-8 w-8'
  }

  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 border-amber-600 dark:border-amber-400 ${sizeClasses[size]}`}></div>
    </div>
  )
} 