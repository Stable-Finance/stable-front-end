"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { WalletConnection } from "@/components/wallet/WalletConnection"
import { ProtocolDashboard } from "@/components/protocol/ProtocolDashboard"
import { ContractAddresses } from "@/components/protocol/ContractAddresses"
import { WaifuRealtorsMint } from "@/components/nft/WaifuRealtorsMint"
import { AuthGate } from "@/components/auth/AuthGate"
import { LandingPage } from "@/components/marketing/LandingPage"
import { useWallet } from "@/hooks/useWallet"
import { ParaModal, OAuthMethod } from "@getpara/react-sdk"

export default function Home() {
  const { connectWallet } = useWallet()

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 p-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header - Always Visible */}
        <Card variant="glass" className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src="https://raw.githubusercontent.com/Stable-Finance/branding/refs/heads/main/token_icons/resized_icons/256x256_stable_coin_icon_gold.png"
                  alt="Stable Protocol"
                  className="w-12 h-12 rounded-xl"
                />
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                    USDX Protocol
                  </h1>
                  <p className="text-amber-700/70 dark:text-amber-300/70">Decentralized Real Estate Finance</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <ContractAddresses />
                <WalletConnection />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Content - Conditional Based on Auth */}
        <AuthGate fallback={<LandingPage onConnect={connectWallet} />}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Protocol Section */}
            <div className="xl:col-span-2">
              <Card variant="glass" className="h-full">
                <CardContent className="p-6">
                  <ProtocolDashboard />
                </CardContent>
              </Card>
            </div>
            
            {/* Waifu Realtors Mint Section */}
            <div>
              <WaifuRealtorsMint />
            </div>
          </div>
        </AuthGate>
        
        {/* Para Authentication Modal */}
        <ParaModal
          appName="Stable Protocol"
          logo="https://raw.githubusercontent.com/Stable-Finance/branding/refs/heads/main/token_icons/resized_icons/256x256_stable_coin_icon_gold.png"
          theme={{ 
            backgroundColor: "#fef3c7", 
            foregroundColor: "#92400e"
          }}
          oAuthMethods={[
            OAuthMethod.GOOGLE, 
            OAuthMethod.TWITTER, 
            OAuthMethod.DISCORD, 
            OAuthMethod.APPLE
          ]}
        />
      </div>
    </div>
  )
}
