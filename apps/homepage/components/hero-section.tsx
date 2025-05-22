"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spotlight } from "@/components/ui/spotlight"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(253,224,71,0.15),transparent_70%)]" />
      <Spotlight className="absolute inset-0 -z-10" fill="#f59e0b" />
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-amber-500/10 text-amber-600 mb-4"
          >
            <span>ERASING THE LINE BETWEEN ASSETS AND LIQUIDITY</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          >
            <span className="text-amber-500">STABLE</span> IS THE TEAM BEHIND{" "}
            <span className="text-amber-500">USDX</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-[700px]"
          >
            The real estate stablecoin.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <Link href="/testnet">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300">
                Testnet <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/litepaper">
              <Button variant="ghost" className="group">
                Litepaper <FileText className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
