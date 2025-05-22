"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { Button } from "./button"

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  React.useEffect(() => {
    const root = window.document.documentElement
    const initialTheme = root.classList.contains('dark') ? 'dark' : 'light'
    setTheme(initialTheme)
  }, [])

  const toggleTheme = () => {
    const root = window.document.documentElement
    const newTheme = theme === 'light' ? 'dark' : 'light'
    
    root.classList.remove('light', 'dark')
    root.classList.add(newTheme)
    setTheme(newTheme)
    
    // Store preference
    localStorage.setItem('theme', newTheme)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/20 hover:bg-amber-200 dark:hover:bg-amber-800/30 transition-all duration-200"
    >
      <SunIcon className={`h-5 w-5 text-amber-600 transition-all duration-300 ${
        theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
      }`} />
      <MoonIcon className={`absolute h-5 w-5 text-amber-400 transition-all duration-300 ${
        theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
      }`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 