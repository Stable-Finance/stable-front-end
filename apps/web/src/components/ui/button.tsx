import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'default' | 'lg' | 'icon'
}

function Button({
  className = '',
  variant = 'primary',
  size = 'default',
  children,
  ...props
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white shadow-lg hover:from-amber-600 hover:to-orange-600 dark:hover:from-amber-700 dark:hover:to-orange-700 hover:shadow-xl active:scale-95",
    secondary: "bg-white dark:bg-gray-800 text-amber-700 dark:text-amber-300 border-2 border-amber-200 dark:border-amber-600 shadow-md hover:bg-amber-50 dark:hover:bg-gray-700 hover:border-amber-300 dark:hover:border-amber-500 active:scale-95",
    destructive: "bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white shadow-lg hover:from-red-600 hover:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 hover:shadow-xl active:scale-95",
    outline: "border-2 border-amber-300 dark:border-amber-600 bg-transparent text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/20 active:scale-95",
    ghost: "text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/20 hover:text-amber-800 dark:hover:text-amber-200 active:scale-95",
    link: "text-amber-600 dark:text-amber-400 underline-offset-4 hover:underline hover:text-amber-700 dark:hover:text-amber-300"
  }
  
  const sizeClasses = {
    sm: "h-8 px-3 text-xs",
    default: "h-10 px-6 py-2",
    lg: "h-12 px-8 text-base",
    icon: "h-10 w-10"
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  )
}

export { Button }
