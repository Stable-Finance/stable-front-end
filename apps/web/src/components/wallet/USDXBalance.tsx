"use client"

import { formatCurrency } from "@/utils"
import { useUSDXBalance } from "@/hooks/useContracts"

interface USDXBalanceProps {
  address: string
}

export function USDXBalance({ address }: USDXBalanceProps) {
  const { data, isError, isLoading } = useUSDXBalance(address)

  if (isError || isLoading || !data) {
    return (
      <div className="bg-amber-100 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-600 rounded-lg px-3 py-2">
        <span className="text-amber-800 dark:text-amber-200 font-semibold">USDX:</span>
        <span className="font-mono text-amber-900 dark:text-amber-100 ml-1">$0</span>
      </div>
    )
  }

  return (
    <div className="bg-amber-100 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-600 rounded-lg px-3 py-2">
      <span className="text-amber-800 dark:text-amber-200 font-semibold">USDX:</span>
      <span className="font-mono text-amber-900 dark:text-amber-100 ml-1">
        {formatCurrency((data as bigint) / 1000000n)}
      </span>
    </div>
  )
} 