"use client"

import { useState } from "react"
import { WalletClient } from "viem"

import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/utils"
import { PropertyDetailsModal } from "./PropertyDetailsModal"

interface PropertyCardProps {
  uri: string
  userAddress: string
  viemClient: WalletClient
}

export function PropertyCard({ uri, userAddress, viemClient }: PropertyCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Parse the NFT metadata
  const b64data = uri.split(",")[1]
  const decoded = atob(b64data)
  const jsonData = JSON.parse(decoded)
  const attrs = jsonData.attributes
  
  return (
    <>
      <Card variant="default" className="cursor-pointer hover:scale-105 transition-transform">
        <div onClick={() => setIsModalOpen(true)}>
          <img
            src={jsonData.image}
            alt={jsonData.name}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <CardContent>
            <h4 className="font-semibold text-amber-900 dark:text-amber-100">{jsonData.name}</h4>
            <p className="text-sm text-amber-700/70 dark:text-amber-300/70">
              Value: {formatCurrency(attrs[0].value)}
            </p>
          </CardContent>
        </div>
      </Card>

      <PropertyDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jsonData={jsonData}
        userAddress={userAddress}
        viemClient={viemClient}
      />
    </>
  )
} 