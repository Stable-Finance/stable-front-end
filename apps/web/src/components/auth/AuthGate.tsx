"use client"

import { useWallet } from "@/hooks/useWallet"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AuthGateProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthGate({ children, fallback }: AuthGateProps) {
  const { currentAddress, isReady, connectWallet } = useWallet()

  if (!isReady) {
    return <LoadingSpinner />
  }

  if (!currentAddress) {
    return fallback || <DefaultAuthPrompt onConnect={connectWallet} />
  }

  return <>{children}</>
}

function DefaultAuthPrompt({ onConnect }: { onConnect: () => void }) {
  return (
    <Card variant="default" className="text-center">
      <CardContent className="py-12">
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-amber-600 dark:text-amber-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-100 mb-2">
              Connect Your Wallet
            </h3>
            <p className="text-amber-700/70 dark:text-amber-300/70 mb-6">
              You need to connect your wallet to access this feature
            </p>
            <Button onClick={onConnect} size="lg">
              Connect Wallet
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 