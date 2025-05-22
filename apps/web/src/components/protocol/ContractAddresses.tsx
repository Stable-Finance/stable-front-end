"use client"

import { useState } from "react"
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { NFT_ADDR, USDX_ADDR } from "@/constants"

export function ContractAddresses() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        aria-label="View contract addresses"
      >
        <QuestionMarkCircleIcon className="h-5 w-5" />
      </Button>
      
      <Modal 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Contract Addresses"
      >
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-[1fr_2fr] gap-4 items-center">
            <span className="font-semibold text-amber-800 dark:text-amber-200">USDX:</span>
            <a 
              href={`https://testnet.monadexplorer.com/token/${USDX_ADDR}`} 
              className="font-mono text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 break-all transition-colors" 
              target="_blank"
              rel="noopener noreferrer"
            >
              {USDX_ADDR}
            </a>
          </div>
          <div className="grid grid-cols-[1fr_2fr] gap-4 items-center">
            <span className="font-semibold text-amber-800 dark:text-amber-200">Property NFT:</span>
            <a 
              href={`https://testnet.monadexplorer.com/token/${NFT_ADDR}`} 
              className="font-mono text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 break-all transition-colors" 
              target="_blank"
              rel="noopener noreferrer"
            >
              {NFT_ADDR}
            </a>
          </div>
        </div>
      </Modal>
    </>
  )
} 