"use client"

import { usePathname } from "next/navigation"
import { FloatingNavbar } from "@/components/ui/floating-navbar"

export function SiteHeader() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    // {
    //   href: "/about",
    //   label: "About",
    //   active: pathname === "/about",
    // },
    // {
    //   href: "/how-it-works",
    //   label: "How It Works",
    //   active: pathname === "/how-it-works",
    // },
    {
      href: "/litepaper",
      label: "Litepaper",
      active: pathname === "/litepaper",
    },
  ]

  return <FloatingNavbar routes={routes} />
}
