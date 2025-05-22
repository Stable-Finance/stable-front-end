import * as React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', type, label, error, ...props }, ref) => {
    const inputClasses = `
      flex h-10 w-full rounded-lg border-2 border-amber-200 dark:border-amber-600 
      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm 
      ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
      placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 
      focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:border-amber-400 dark:focus-visible:border-amber-500
      disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200
      ${error ? 'border-red-400 dark:border-red-500 focus-visible:ring-red-500 dark:focus-visible:ring-red-400' : ''}
      ${className}
    `.trim().replace(/\s+/g, ' ')

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-amber-800 dark:text-amber-200">
            {label}
          </label>
        )}
        <input
          type={type}
          className={inputClasses}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export interface NumberInputProps extends Omit<InputProps, 'type' | 'onChange'> {
  value?: string
  onChange?: (value: string) => void
  min?: string
  max?: string
}

export function NumberInput({ 
  onChange, 
  value, 
  min = "0", 
  max, 
  ...props 
}: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    // Only allow numbers and decimal points
    if (/^\d*\.?\d*$/.test(newValue) || newValue === '') {
      onChange?.(newValue)
    }
  }

  return (
    <Input
      type="text"
      value={value}
      onChange={handleChange}
      min={min}
      max={max}
      {...props}
    />
  )
}

export { Input } 