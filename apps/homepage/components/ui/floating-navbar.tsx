"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"

interface FloatingNavbarProps {
  routes: {
    href: string
    label: string
    active: boolean
  }[]
}

export function FloatingNavbar({ routes }: FloatingNavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-4 z-50 mx-auto w-full max-w-screen-xl px-4 transition-all duration-300",
        scrolled ? "translate-y-0" : "translate-y-2",
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center justify-between rounded-full border px-4 backdrop-blur transition-all duration-300",
          scrolled ? "border-border/40 bg-background/70 shadow-lg" : "border-transparent bg-background/50",
        )}
      >
        <div className="flex items-center gap-6">
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Logo />
            <span className="hidden font-bold sm:inline-block">STABLE</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  route.active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <MobileNav routes={routes} />
          <div className="hidden md:flex items-center gap-2">
            <Link href="/testnet">
              <Button variant="outline" size="sm">
                Testnet
              </Button>
            </Link>
            <button
              type='button'
              onClick={() => {
                const el = document.getElementById('waitlist')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className='bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 rounded-md px-4 py-2 text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300'
            >
              Join Waitlist
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
