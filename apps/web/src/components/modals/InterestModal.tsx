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

interface InterestModalProps {
  nftId: bigint
  jsonData: any
  viemClient: WalletClient
  userAddress: string
}

export function InterestModal({ nftId, jsonData, viemClient, userAddress }: InterestModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState("0")
  const [token, setToken] = useState(USDX_ADDR)
  
  const prepaidInterest = BigInt(jsonData.attributes[8].value)
  const unpaidInterest = BigInt(jsonData.attributes[9].value)

  const tokenOptions = [
    { value: USDX_ADDR, label: "USDX" },
    { value: USDT_ADDR, label: "USDT" },
    { value: USDC_ADDR, label: "USDC" }
  ]

  const handlePayment = async () => {
    try {
      await ensure_tokens_approved(
        viemClient,
        token as Hex,
        BigInt(paymentAmount) * 1_000_000n,
        () => refresh_after_trx(() => viemClient.writeContract({
          account: userAddress as Hex,
          chain: monadTestnet,
          abi: nft_abi,
          address: NFT_ADDR,
          args: [nftId, token, BigInt(paymentAmount) * 1_000_000n],
          functionName: "makePayment"
        }))
      )
      setIsOpen(false)
    } catch (error) {
      console.error("Payment failed:", error)
    }
  }

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setIsOpen(true)}
        className="w-full"
      >
        Make Payment
      </Button>
      
      <Modal 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        title={`Make Interest Payment - ${jsonData.name}`}
        size="lg"
      >
        <div className="space-y-6">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4 space-y-2">
            <p className="text-amber-900 dark:text-amber-100">
              This property has <span className="font-mono font-semibold text-red-600 dark:text-red-400">{formatCurrency(unpaidInterest)}</span> worth of unpaid interest.
            </p>
            <p className="text-amber-900 dark:text-amber-100">
              This property has <span className="font-mono font-semibold text-green-600 dark:text-green-400">{formatCurrency(prepaidInterest)}</span> worth of prepaid interest.
            </p>
          </div>
          
          <div className="text-sm text-amber-800 dark:text-amber-200 space-y-2">
            <p>In the current implementation, interest works separately from principal. It is the borrower's responsibility that sufficient interest is deposited in the prepaid interest account to cover the interest payments that are calculated at the end of the month.</p>
            <p>Interest payments are automatically deducted at the end of the month. If there is not sufficient prepaid interest, the property will be hit with a missed payment. Three missed payments results in borrowers being unable to borrow against the property.</p>
            <p>If a property already has unpaid interest, interest payments will pay that off first before it goes into the prepaid interest.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <NumberInput
              label="Payment Amount"
              value={paymentAmount}
              onChange={setPaymentAmount}
              min="0"
              max="100000000"
            />
            <Select
              label="Token"
              value={token}
              onChange={setToken}
              options={tokenOptions}
            />
          </div>
          
          <Button onClick={handlePayment} className="w-full">
            Confirm Payment
          </Button>
        </div>
      </Modal>
    </>
  )
} 