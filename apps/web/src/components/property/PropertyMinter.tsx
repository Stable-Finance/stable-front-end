"use client"

import { useState } from "react"
import { Hex, WalletClient } from "viem"
import { monadTestnet } from "wagmi/chains"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NumberInput } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { NFT_ADDR } from "@/constants"
import { refresh_after_trx } from "@/utils"
import nft_abi from "@/nft_abi.json"

interface PropertyMinterProps {
  viemClient: WalletClient
  userAddress: string
  onTransaction: (hash: string) => void
}

export function PropertyMinter({ viemClient, userAddress, onTransaction }: PropertyMinterProps) {
  const [value, setValue] = useState("1000000")
  const [ltv, setLtv] = useState("800000000")
  const [lien, setLien] = useState("0")

  const ltvOptions = [
    { value: "800000000", label: "Residential - 80%" },
    { value: "650000000", label: "Agricultural - 65%" },
    { value: "600000000", label: "Commercial - 60%" },
    { value: "500000000", label: "Industrial - 50%" }
  ]

  const lienOptions = [
    { value: "0", label: "None - 0%" },
    { value: "10", label: "Low - 10%" },
    { value: "30", label: "Medium - 30%" },
    { value: "60", label: "High - 60%" }
  ]

  const handleDeposit = async () => {
    try {
      const propertyValue = BigInt(value + "000000")
      
      await refresh_after_trx(async () => {
        const hash = await viemClient.writeContract({
          abi: nft_abi,
          address: NFT_ADDR as Hex,
          functionName: "depositProperty",
          args: [
            propertyValue,
            propertyValue * BigInt(lien) / 100n,
            ltv,
            "0",
            userAddress
          ],
          account: userAddress as Hex,
          chain: monadTestnet
        })
        onTransaction(hash)
        return hash
      })
    } catch (error) {
      console.error("Property deposit failed:", error)
    }
  }

  return (
    <Card variant="default">
      <CardHeader>
        <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">Deposit Property</h3>
        <p className="text-amber-700/70 dark:text-amber-300/70">Add a new property to the protocol</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NumberInput
            label="Property Value (USD)"
            value={value}
            onChange={setValue}
            min="0"
            max="100000000"
          />
          <Select
            label="Max LTV"
            value={ltv}
            onChange={setLtv}
            options={ltvOptions}
          />
          <Select
            label="Lien"
            value={lien}
            onChange={setLien}
            options={lienOptions}
            className="md:col-span-2"
          />
        </div>
        
        <Button
          onClick={handleDeposit}
          size="lg"
          className="w-full mt-6"
        >
          Deposit Property
        </Button>
      </CardContent>
    </Card>
  )
} 