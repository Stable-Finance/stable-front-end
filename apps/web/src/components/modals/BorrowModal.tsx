"use client"

import { useState } from "react"
import { Hex, WalletClient } from "viem"
import { monadTestnet } from "wagmi/chains"

import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { NumberInput } from "@/components/ui/input"
import { NFT_ADDR } from "@/constants"
import { formatCurrency, refresh_after_trx } from "@/utils"
import nft_abi from "@/nft_abi.json"

interface BorrowModalProps {
  nftId: bigint
  jsonData: any
  viemClient: WalletClient
  userAddress: string
}

export function BorrowModal({ nftId, jsonData, viemClient, userAddress }: BorrowModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const value = BigInt(jsonData.attributes[0].value)
  const liens = BigInt(jsonData.attributes[1].value)
  const debt = BigInt(jsonData.attributes[2].value)
  const maxLtv = BigInt(jsonData.attributes[3].value)

  let maxBorrow: bigint | string = 0n
  if (value > liens) {
    const borrowable = (value - liens) * maxLtv / 100n
    if (debt > borrowable) {
      maxBorrow = "There is too much debt on the property"
    } else {
      maxBorrow = borrowable - debt
    }
  } else {
    maxBorrow = "There are too many liens on the property"
  }
  
  const [borrowAmount, setBorrowAmount] = useState(typeof maxBorrow === "string" ? "0" : String(maxBorrow))

  const handleBorrow = async () => {
    try {
      await refresh_after_trx(() => viemClient.writeContract({
        account: userAddress as Hex,
        chain: monadTestnet,
        abi: nft_abi,
        address: NFT_ADDR,
        args: [nftId, BigInt(borrowAmount) * 1_000_000n],
        functionName: "borrow"
      }))
      setIsOpen(false)
    } catch (error) {
      console.error("Borrow failed:", error)
    }
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="w-full">
        Borrow USDX
      </Button>
      
      <Modal 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        title={`Borrow From ${jsonData.name}`}
      >
        {typeof maxBorrow === "bigint" ? (
          <div className="space-y-6">
            <p className="text-amber-800 dark:text-amber-200">
              You can borrow up to: <span className="font-mono font-semibold">{formatCurrency(maxBorrow)} USDX</span>
            </p>
            <NumberInput
              label="Borrow Amount (USDX)"
              value={borrowAmount}
              onChange={setBorrowAmount}
              min="0"
              max={String(maxBorrow)}
            />
            <Button onClick={handleBorrow} className="w-full">
              Confirm Borrow
            </Button>
          </div>
        ) : (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg p-4">
            <p className="text-red-700 dark:text-red-300">Unable to Borrow: {maxBorrow}</p>
          </div>
        )}
      </Modal>
    </>
  )
} 