"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <AnimatedGradientBorder
      gradientClassName="from-amber-300 via-amber-500 to-amber-400"
      className="w-full max-w-md mx-auto"
    >
      <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center">Join the Waitlist</CardTitle>
          <CardDescription className="text-center">Be the first to know when we launch</CardDescription>
        </CardHeader>
        {!submitted ? (
          <>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/50 dark:bg-slate-800/50"
                    required
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Join Waitlist
              </Button>
            </CardFooter>
          </>
        ) : (
          <CardContent className="py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="flex flex-col items-center gap-4 text-center"
            >
              <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-medium">You're on the list!</h3>
              <p className="text-muted-foreground">
                Thank you for joining our waitlist. We'll notify you when USDX launches.
              </p>
            </motion.div>
          </CardContent>
        )}
      </Card>
    </AnimatedGradientBorder>
  )
}
