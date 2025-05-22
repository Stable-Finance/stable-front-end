"use client"

import { useState } from "react"

import { useWallet } from "@/hooks/useWallet"
import { useViemClient } from "@/hooks/useContracts"
import { PropertyList } from "@/components/property/PropertyList"
import { PropertyMinter } from "@/components/property/PropertyMinter"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export function ProtocolDashboard() {
  const { currentWallet, currentAddress, isReady } = useWallet()
  
  if (!isReady) {
    return <LoadingSpinner />
  }

  // At this point, we know user is authenticated due to AuthGate
  if (!currentWallet || !currentAddress) {
    return <LoadingSpinner />
  }

  return <ProtocolInterface wallet={currentWallet} userAddress={currentAddress} />
}

function ProtocolInterface({ wallet, userAddress }: { wallet: any, userAddress: string }) {
  const [latestHash, setLatestHash] = useState("")
  const viemClient = useViemClient(wallet)

  if (!viemClient) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-8">
      <PropertyMinter 
        viemClient={viemClient} 
        userAddress={userAddress} 
        onTransaction={setLatestHash} 
      />
      <PropertyList 
        userAddress={userAddress} 
        viemClient={viemClient} 
        latestHash={latestHash} 
      />
    </div>
  )
} 