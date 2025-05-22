import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Stable Finance | Real Estate Stablecoin",
  description:
    "Stable is the team behind USDX, the real estate stablecoin. Erasing the line between assets and liquidity.",
  keywords: ["stable", "finance", "stablecoin", "USDX", "real estate", "cryptocurrency", "blockchain"],
  authors: [{ name: "Stable Finance Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.trystable.co/",
    title: "Stable Finance | Real Estate Stablecoin",
    description:
      "Stable is the team behind USDX, the real estate stablecoin. Erasing the line between assets and liquidity.",
    siteName: "Stable Finance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stable Finance | Real Estate Stablecoin",
    description:
      "Stable is the team behind USDX, the real estate stablecoin. Erasing the line between assets and liquidity.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Suspense>
            {children}
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
