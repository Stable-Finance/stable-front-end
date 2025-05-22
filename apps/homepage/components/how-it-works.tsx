"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Building2, Coins, Home, Shield, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function HowItWorks() {
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
    <section ref={ref} className="py-20 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(253,224,71,0.1),transparent_70%)]" />
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-amber-500/10 text-amber-600 mb-4"
          >
            SIMPLE PROCESS
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-500"
          >
            How It Works
          </motion.h2>
          <motion.p variants={itemVariants} className="text-muted-foreground max-w-[700px] mx-auto">
            USDX combines the stability of real estate with the flexibility of digital assets
          </motion.p>
        </motion.div>
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <Tabs defaultValue="investors" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8 p-1 rounded-xl bg-muted/80">
              <TabsTrigger
                value="investors"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-amber-600 data-[state=active]:shadow-sm transition-all duration-300"
              >
                For Investors
              </TabsTrigger>
              <TabsTrigger
                value="owners"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-amber-600 data-[state=active]:shadow-sm transition-all duration-300"
              >
                For Property Owners
              </TabsTrigger>
            </TabsList>
            <TabsContent value="investors" className="space-y-6">
              <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={containerVariants}>
                <motion.div variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-amber-50/50 dark:from-slate-900 dark:to-slate-800/50">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
                    <CardHeader>
                      <div className="rounded-xl bg-amber-500/10 p-3 text-amber-500 w-fit mb-2">
                        <Coins className="h-5 w-5" />
                      </div>
                      <CardTitle>Purchase USDX</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Buy USDX tokens backed by real estate assets through our platform.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-amber-50/50 dark:from-slate-900 dark:to-slate-800/50">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
                    <CardHeader>
                      <div className="rounded-xl bg-amber-500/10 p-3 text-amber-500 w-fit mb-2">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <CardTitle>Earn Yield</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Receive regular returns based on the performance of the underlying real estate.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-amber-50/50 dark:from-slate-900 dark:to-slate-800/50">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
                    <CardHeader>
                      <div className="rounded-xl bg-amber-500/10 p-3 text-amber-500 w-fit mb-2">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                      <CardTitle>Trade or Hold</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Freely trade your USDX or hold for long-term appreciation and yield.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex justify-center mt-8">
                <button
                  type='button'
                  onClick={() => {
                    const el = document.getElementById('waitlist')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className='bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-md px-4 py-2 text-sm font-medium'
                >
                  Join Waitlist
                </button>
              </motion.div>
            </TabsContent>
            <TabsContent value="owners" className="space-y-6">
              <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={containerVariants}>
                <motion.div variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-amber-50/50 dark:from-slate-900 dark:to-slate-800/50">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
                    <CardHeader>
                      <div className="rounded-xl bg-amber-500/10 p-3 text-amber-500 w-fit mb-2">
                        <Home className="h-5 w-5" />
                      </div>
                      <CardTitle>List Your Property</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Submit your property for evaluation and tokenization on our platform.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-amber-50/50 dark:from-slate-900 dark:to-slate-800/50">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
                    <CardHeader>
                      <div className="rounded-xl bg-amber-500/10 p-3 text-amber-500 w-fit mb-2">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <CardTitle>Unlock Equity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Convert your property equity into liquid USDX tokens without selling.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-amber-50/50 dark:from-slate-900 dark:to-slate-800/50">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
                    <CardHeader>
                      <div className="rounded-xl bg-amber-500/10 p-3 text-amber-500 w-fit mb-2">
                        <Shield className="h-5 w-5" />
                      </div>
                      <CardTitle>Maintain Ownership</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Keep control of your property while accessing its value in a new way.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex justify-center mt-8">
                <Link href="/apply">
                  <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300">
                    Apply Now
                  </Button>
                </Link>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
