import * as React from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  label?: string
  className?: string
}

export function Select({ 
  value, 
  onChange, 
  options, 
  placeholder = "Select an option",
  label,
  className = ""
}: SelectProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-amber-800 dark:text-amber-200">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            flex h-10 w-full appearance-none rounded-lg border-2 border-amber-200 dark:border-amber-600
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 pr-10 text-sm ring-offset-background 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400
            focus-visible:ring-offset-2 focus-visible:border-amber-400 dark:focus-visible:border-amber-500
            disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200
            font-mono
            ${className}
          `.trim().replace(/\s+/g, ' ')}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600 pointer-events-none" />
      </div>
    </div>
  )
} 