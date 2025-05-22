"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && window.gtag) {
      const url = pathname + searchParams.toString()
      window.gtag("config", "G-XXXXXXXXXX", {
        page_path: url,
      })
    }
  }, [pathname, searchParams])

  return null
}
