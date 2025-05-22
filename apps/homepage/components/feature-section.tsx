"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ChevronRight, Coins, Shield, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FeatureSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section ref={ref} className="py-20 bg-muted/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent" />
      <div className="container px-4 md:px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="space-y-6" variants={itemVariants}>
            <h2 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-500">
              Earn yield on real estate equity
            </h2>
            <p className="text-lg text-muted-foreground">
              Pay off the mortgage faster, or invest the returns and compound your wealth over time.
            </p>
            <div className="flex flex-col gap-4">
              <motion.div className="flex items-start gap-4 group" variants={itemVariants} whileHover={{ x: 5 }}>
                <div className="rounded-xl bg-amber-500/10 p-3 text-amber-500 transition-colors duration-300 group-hover:bg-amber-500/20">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Stable Returns</h3>
                  <p className="text-sm text-muted-foreground">Backed by real estate assets for consistent yield</p>
                </div>
              </motion.div>
              <motion.div className="flex items-start gap-4 group" variants={itemVariants} whileHover={{ x: 5 }}>
                <div className="rounded-xl bg-amber-500/10 p-3 text-amber-500 transition-colors duration-300 group-hover:bg-amber-500/20">
                  <Coins className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Liquidity</h3>
                  <p className="text-sm text-muted-foreground">Convert your real estate equity into liquid assets</p>
                </div>
              </motion.div>
              <motion.div className="flex items-start gap-4 group" variants={itemVariants} whileHover={{ x: 5 }}>
                <div className="rounded-xl bg-amber-500/10 p-3 text-amber-500 transition-colors duration-300 group-hover:bg-amber-500/20">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Security</h3>
                  <p className="text-sm text-muted-foreground">Built on secure blockchain technology</p>
                </div>
              </motion.div>
            </div>
            {/* <Link href="/how-it-works">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 group mt-8">
                Learn More{' '}
                <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link> */}
          </motion.div>
          <motion.div className="relative flex items-center justify-center w-full md:h-[400px] h-64 rounded-lg overflow-hidden" variants={itemVariants}>
          <Image
              src="/download.jpeg"
              alt="Real Estate Investment"
              width={550}
              height={550}
              className="object-contain rounded-lg"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
