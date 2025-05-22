"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/utils"

interface LandingPageProps {
  onConnect: () => void
}

export function LandingPage({ onConnect }: LandingPageProps) {
  const features = [
    {
      title: "Property-Backed Lending",
      description: "Use real estate as collateral for USDX loans",
      icon: "🏠"
    },
    {
      title: "Flexible LTV Ratios",
      description: "Up to 80% LTV based on property type",
      icon: "📊"
    },
    {
      title: "Interest Management",
      description: "Prepaid interest system with automated deductions",
      icon: "💰"
    },
    {
      title: "NFT-Based Ownership",
      description: "Properties represented as dynamic NFTs",
      icon: "🎨"
    }
  ]

  const stats = [
    { label: "Total Value Locked", value: formatCurrency(50000000) },
    { label: "Active Properties", value: "1,234" },
    { label: "USDX Borrowed", value: formatCurrency(25000000) },
    { label: "Users", value: "856" }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-amber-900 dark:text-amber-100">
            Decentralized Real Estate Finance
          </h2>
          <p className="text-xl text-amber-700 dark:text-amber-300 max-w-3xl mx-auto">
            Transform your real estate into productive DeFi collateral. Borrow USDX against property values with competitive rates and flexible terms.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onConnect} size="lg" className="min-w-[200px]">
            Connect Wallet to Start
          </Button>
          <Button variant="outline" size="lg" className="min-w-[200px]">
            Learn More
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} variant="default">
            <CardContent className="text-center py-6">
              <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                {stat.value}
              </div>
              <div className="text-sm text-amber-700 dark:text-amber-300">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Section */}
      <div>
        <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100 text-center mb-8">
          Protocol Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} variant="default">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <h4 className="text-lg font-semibold text-amber-900 dark:text-amber-100">
                    {feature.title}
                  </h4>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 dark:text-amber-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <Card variant="elevated" className="text-center">
        <CardContent className="py-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              Ready to Get Started?
            </h3>
            <p className="text-amber-700 dark:text-amber-300">
              Connect your wallet to deposit properties and start borrowing USDX
            </p>
            <Button onClick={onConnect} size="lg">
              Connect Wallet Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 