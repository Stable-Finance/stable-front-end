"use client"

import { useState } from "react"
import { Hex, WalletClient } from "viem"
import { monadTestnet } from "wagmi/chains"

import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { NumberInput } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { NFT_ADDR, USDX_ADDR, USDT_ADDR, USDC_ADDR } from "@/constants"
import { formatCurrency, ensure_tokens_approved, refresh_after_trx } from "@/utils"
import nft_abi from "@/nft_abi.json"

interface RepayModalProps {
  nftId: bigint
  jsonData: any
  viemClient: WalletClient
  userAddress: string
}

export function RepayModal({ nftId, jsonData, viemClient, userAddress }: RepayModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [repayAmount, setRepayAmount] = useState("0")
  const [token, setToken] = useState(USDX_ADDR)
  
  const debt = BigInt(jsonData.attributes[2].value)

  const tokenOptions = [
    { value: USDX_ADDR, label: "USDX" },
    { value: USDT_ADDR, label: "USDT" },
    { value: USDC_ADDR, label: "USDC" }
  ]

  const handleRepay = async () => {
    try {
      await ensure_tokens_approved(
        viemClient,
        token as Hex,
        BigInt(repayAmount) * 1_000_000n,
        () => refresh_after_trx(() => viemClient.writeContract({
          account: userAddress as Hex,
          chain: monadTestnet,
          abi: nft_abi,
          address: NFT_ADDR,
          args: [nftId, token, BigInt(repayAmount) * 1_000_000n],
          functionName: "repayBorrow"
        }))
      )
      setIsOpen(false)
    } catch (error) {
      console.error("Repayment failed:", error)
    }
  }

  return (
    <>
      <Button
        variant="destructive"
        onClick={() => setIsOpen(true)}
        className="w-full"
      >
        Repay Debt
      </Button>
      
      <Modal 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        title={`Repay Debt - ${jsonData.name}`}
      >
        <div className="space-y-6">
          <p className="text-amber-800 dark:text-amber-200">
            This property has a debt of <span className="font-mono font-semibold text-red-600 dark:text-red-400">{formatCurrency(debt)}</span>
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <NumberInput
              label="Repay Amount"
              value={repayAmount}
              onChange={setRepayAmount}
              min="0"
              max={String(debt)}
            />
            <Select
              label="Token"
              value={token}
              onChange={setToken}
              options={tokenOptions}
            />
          </div>
          
          <Button onClick={handleRepay} className="w-full">
            Confirm Repayment
          </Button>
        </div>
      </Modal>
    </>
  )
} 