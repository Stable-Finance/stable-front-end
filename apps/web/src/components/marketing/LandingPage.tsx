"use client"

import React from 'react'
import { Button } from '../ui/button'

interface LandingPageProps {
  onConnect: () => void
}

export function LandingPage({ onConnect }: LandingPageProps) {

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-amber-900 dark:text-amber-100">
            Real Estate Finance Platform
          </h2>
          <p className="text-xl text-amber-700 dark:text-amber-300 max-w-3xl mx-auto">
            A platform for real estate-backed lending and borrowing.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onConnect} size="lg" className="min-w-[200px]">
            Connect Wallet
          </Button>
        </div>
      </div>

      {/* CTA Section */}
      {/* <Card variant="elevated" className="text-center">
        <CardContent className="py-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              Get Started
            </h3>
            <p className="text-amber-700 dark:text-amber-300">
              Connect your wallet to begin using the platform
            </p>
            <Button onClick={onConnect} size="lg">
              Connect Wallet
            </Button>
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
} 