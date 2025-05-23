"use client"

import React, { useEffect } from 'react'
import { WalletClient } from "viem"

import { useWalletStore } from "@/lib/store"
import { usePropertyBalance, usePropertyTokens, usePropertyURIs } from "@/hooks/useContracts"
import { PropertyCard } from "./PropertyCard"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"

interface PropertyListProps {
  userAddress: string
  viemClient: WalletClient
  latestHash: string
}

export function PropertyList({ userAddress, viemClient, latestHash }: PropertyListProps) {
  const { data: balance, isLoading: balanceLoading, isError: balanceError, refetch } = usePropertyBalance(userAddress)
  
  useEffect(() => {
    refetch()
  }, [latestHash, refetch])

  if (balanceLoading) {
    return <LoadingSpinner />
  }
  
  if (balanceError) {
    return <ErrorMessage message="Error loading property data" />
  }
  
  if (!balance || balance === 0n) {
    return null
  }

  return <PropertyTokensList userAddress={userAddress} viemClient={viemClient} nftCount={Number(balance)} />
}

function PropertyTokensList({ userAddress, viemClient, nftCount }: { userAddress: string, viemClient: WalletClient, nftCount: number }) {
  const store = useWalletStore()
  
  if (!store.owns_property) {
    store.set_owns_property()
  }
  
  const { data: tokenData, isLoading: tokensLoading, isError: tokensError } = usePropertyTokens(userAddress, nftCount)
  
  if (tokensLoading || !tokenData) {
    return <LoadingSpinner />
  }
  
  if (tokensError) {
    return <ErrorMessage message="Error loading NFT data" />
  }
  
  const tokenIds = tokenData.map(r => r.result as bigint)
  
  return <PropertyURIsList userAddress={userAddress} viemClient={viemClient} tokenIds={tokenIds} />
}

function PropertyURIsList({ userAddress, viemClient, tokenIds }: { userAddress: string, viemClient: WalletClient, tokenIds: bigint[] }) {
  const { data: uriData, isLoading: urisLoading, isError: urisError } = usePropertyURIs(tokenIds)
  
  if (urisLoading || !uriData) {
    return <LoadingSpinner />
  }
  
  if (urisError) {
    return <ErrorMessage message="Error loading property URIs" />
  }
  
  return (
    <div>
      <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-6">Your Properties</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {uriData.map((r, idx) => {
          const uri = r.result as string | undefined
          if (!uri) return null
          
          return (
            <PropertyCard
              key={idx}
              uri={uri}
              userAddress={userAddress}
              viemClient={viemClient}
            />
          )
        })}
      </div>
    </div>
  )
} 