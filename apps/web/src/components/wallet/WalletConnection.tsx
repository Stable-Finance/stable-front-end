"use client"

import { useState } from "react"
import { ClipboardDocumentCheckIcon, ClipboardIcon } from '@heroicons/react/24/outline'
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { useWallet } from "@/hooks/useWallet"
import { USDXBalance } from "./USDXBalance"

export function WalletConnection() {
  const { wallets, currentAddress, isReady, connectWallet, setCurrentWallet } = useWallet()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!isReady) {
    return (
      <div className="animate-pulse bg-amber-200 h-10 w-24 rounded-lg"></div>
    )
  }

  if (!currentAddress) {
    return (
      <Button onClick={connectWallet}>
        Login
      </Button>
    )
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(currentAddress)
    setCopied(true)
    toast.success("Copied Wallet Address")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex gap-2 items-center">
      <USDXBalance address={currentAddress} />
      
      <Modal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Wallet Management"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            {wallets.map((wallet, index) => (
              <Button
                key={index}
                variant={currentAddress === wallet.address ? "primary" : "outline"}
                onClick={() => {
                  setCurrentWallet(index)
                  setIsModalOpen(false)
                }}
                className="w-full justify-start font-mono text-sm"
              >
                {wallet.address}
              </Button>
            ))}
          </div>
          
          <Button
            variant="secondary"
            onClick={connectWallet}
            className="w-full"
          >
            Connect Another Wallet
          </Button>
        </div>
      </Modal>
      
      <Button
        variant="secondary"
        onClick={() => setIsModalOpen(true)}
        className="font-mono"
      >
        {`${currentAddress.slice(0, 6)}...${currentAddress.slice(38)}`}
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={copyAddress}
      >
        {copied ? (
          <ClipboardDocumentCheckIcon className="w-4 h-4" />
        ) : (
          <ClipboardIcon className="w-4 h-4" />
        )}
      </Button>
    </div>
  )
} 