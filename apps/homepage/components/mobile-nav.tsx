"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"

interface MobileNavProps {
  routes: {
    href: string
    label: string
    active: boolean
  }[]
}

export function MobileNav({ routes }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Logo />
            <span className="font-bold">STABLE</span>
          </Link>
        </div>
        <nav className="flex flex-col gap-4 px-7 mt-10">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                route.active ? "text-foreground" : "text-muted-foreground"
              }`}
              onClick={() => setOpen(false)}
            >
              {route.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-4">
            <Link href="/testnet" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full justify-start">
                Testnet
              </Button>
            </Link>
            <button
              type='button'
              onClick={() => {
                setOpen(false)
                const el = document.getElementById('waitlist')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className='w-full justify-start bg-amber-500 hover:bg-amber-600 text-white rounded-md px-4 py-2 text-sm font-medium'
            >
              Join Waitlist
            </button>
          </div>
          <div className="mt-4 flex justify-start">
            <ThemeToggle />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
