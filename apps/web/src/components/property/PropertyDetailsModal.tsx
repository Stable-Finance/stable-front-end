"use client"

import { WalletClient } from "viem"
import Image from 'next/image'

import { Modal } from "@/components/ui/modal"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/utils"
import { BorrowModal } from "@/components/modals/BorrowModal"
import { InterestModal } from "@/components/modals/InterestModal"
import { RepayModal } from "@/components/modals/RepayModal"

interface PropertyData {
  id: number
  name: string
  image: string
  attributes: Array<{ value: string | number }>
}

interface PropertyDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  property: PropertyData | null
  userAddress: string
  viemClient: WalletClient
}

export function PropertyDetailsModal({ 
  isOpen, 
  onClose, 
  property, 
  userAddress, 
  viemClient 
}: PropertyDetailsModalProps) {
  const attrs = property?.attributes
  const nftId = BigInt(property?.name.split("#")[1])

  return (
    <Modal 
      open={isOpen} 
      onClose={onClose}
      title={property?.name}
      size="lg"
    >
      <div className="space-y-6">
        <Image 
          src={property?.image || ''} 
          alt={property?.name || ''} 
          width={400}
          height={300}
          className="w-full rounded-lg" 
        />
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property Details</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-amber-800 dark:text-amber-200">Property Value</TableCell>
              <TableCell className="font-mono text-green-600 dark:text-green-400">{formatCurrency(attrs?.[0].value)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-amber-800 dark:text-amber-200">Outstanding Debt</TableCell>
              <TableCell className="font-mono text-red-600 dark:text-red-400">{formatCurrency(attrs?.[2].value)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-amber-800 dark:text-amber-200">Deposited</TableCell>
              <TableCell className="font-mono text-gray-700 dark:text-gray-300">{new Date(attrs?.[7].value).toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-amber-800 dark:text-amber-200">Prepaid Interest</TableCell>
              <TableCell className="font-mono text-green-600 dark:text-green-400">{formatCurrency(attrs?.[8].value)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-amber-800 dark:text-amber-200">Unpaid Interest</TableCell>
              <TableCell className="font-mono text-red-600 dark:text-red-400">{formatCurrency(attrs?.[9].value)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-amber-800 dark:text-amber-200">Missed Payments</TableCell>
              <TableCell className="font-mono text-orange-600 dark:text-orange-400">{formatCurrency(attrs?.[10].value)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BorrowModal 
            nftId={nftId} 
            jsonData={property} 
            viemClient={viemClient} 
            userAddress={userAddress} 
          />
          <InterestModal 
            nftId={nftId} 
            jsonData={property} 
            viemClient={viemClient} 
            userAddress={userAddress} 
          />
          <RepayModal 
            nftId={nftId} 
            jsonData={property} 
            viemClient={viemClient} 
            userAddress={userAddress} 
          />
        </div>
      </div>
    </Modal>
  )
} 