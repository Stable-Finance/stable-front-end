"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Modal } from '../ui/modal'
import { NumberInput } from '../ui/input'
import { formatCurrency } from '@/utils'

interface Property {
  id: number
  name: string
  image: string
  value: number
  tokenAddress: string
}

interface BorrowModalProps {
  isOpen: boolean
  onClose: () => void
  property: Property | null
  onBorrow: (propertyId: number, amount: number) => void
}

export function BorrowModal({ isOpen, onClose, property, onBorrow }: BorrowModalProps) {
  const [borrowAmount, setBorrowAmount] = useState("0")

  const handleBorrow = async () => {
    try {
      if (property) {
        await onBorrow(property.id, Number(borrowAmount))
      }
      onClose()
    } catch (error) {
      console.error("Borrow failed:", error)
    }
  }

  return (
    <>
      <Button onClick={onClose} className="w-full">
        Borrow USDX
      </Button>
      
      <Modal 
        open={isOpen} 
        onClose={onClose}
        title={`Borrow From ${property?.name}`}
      >
        <div className="space-y-6">
          <p className="text-amber-800 dark:text-amber-200">
            You can borrow up to: <span className="font-mono font-semibold">{formatCurrency(property?.value)} USDX</span>
          </p>
          <NumberInput
            label="Borrow Amount (USDX)"
            value={borrowAmount}
            onChange={setBorrowAmount}
            min="0"
            max={String(property?.value)}
          />
          <Button onClick={handleBorrow} className="w-full">
            Confirm Borrow
          </Button>
        </div>
      </Modal>
    </>
  )
} 