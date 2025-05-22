"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { AnimatedGradientBorder } from '@/components/ui/animated-gradient-border'

interface Token {
  name: string
  symbol: string
  price: number
  marketCap: number
  circulatingSupply: number
  annualYield: string
  status: string
  backedBy: string
  footerNote: string
}

export function TokenCard() {
  const [token, setToken] = useState<Token | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let isMounted = true
    async function fetchToken() {
      setIsLoading(true)
      setHasError(false)
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/tether')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        if (isMounted) {
          setToken({
            name: data.name,
            symbol: data.symbol.toUpperCase(),
            price: data.market_data.current_price.usd,
            marketCap: data.market_data.market_cap.usd,
            circulatingSupply: data.market_data.circulating_supply,
            annualYield: 'N/A',
            status: data.market_data.price_change_percentage_24h > 0 ? 'Up' : 'Stable',
            backedBy: 'Fiat (USD)',
            footerNote: 'Live data from CoinGecko'
          })
        }
      } catch (err) {
        if (isMounted) setHasError(true)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    fetchToken()
    const interval = setInterval(fetchToken, 10000)
    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  if (isLoading) {
    return (
      <AnimatedGradientBorder gradientClassName="from-amber-300 via-amber-500 to-amber-400" className="w-full h-full" duration={10}>
        <div className="flex items-center justify-center h-full w-full rounded-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6">
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </AnimatedGradientBorder>
    )
  }

  if (hasError || !token) {
    return (
      <AnimatedGradientBorder gradientClassName="from-amber-300 via-amber-500 to-amber-400" className="w-full h-full" duration={10}>
        <div className="flex items-center justify-center h-full w-full rounded-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6">
          <span className="text-destructive">Error loading token data</span>
        </div>
      </AnimatedGradientBorder>
    )
  }

  return (
    <AnimatedGradientBorder gradientClassName="from-amber-300 via-amber-500 to-amber-400" className="w-full h-full" duration={10}>
      <div className="relative h-full w-full rounded-lg overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">$</span>
            </div>
            <div>
              <h3 className="font-bold text-lg">{token.name}</h3>
              <p className="text-xs text-muted-foreground">Symbol: {token.symbol}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">Current Price:</span>
              <span className="font-bold">${token.price}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <Sparkles className="h-3 w-3" />
              <span>{token.status}</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between text-sm border-b border-muted pb-2">
            <span className="text-muted-foreground">Market Cap</span>
            <motion.span className="font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              ${token.marketCap.toLocaleString()}
            </motion.span>
          </div>
          <div className="flex justify-between text-sm border-b border-muted pb-2">
            <span className="text-muted-foreground">Circulating Supply</span>
            <motion.span className="font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              {token.circulatingSupply.toLocaleString()} {token.symbol}
            </motion.span>
          </div>
          <div className="flex justify-between text-sm border-b border-muted pb-2">
            <span className="text-muted-foreground">Backed By</span>
            <motion.span className="font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              {token.backedBy}
            </motion.span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Annual Yield</span>
            <motion.span className="font-medium text-green-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              {token.annualYield}
            </motion.span>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-muted">
          <div className="text-xs text-center text-muted-foreground">{token.footerNote}</div>
        </div>
      </div>
    </AnimatedGradientBorder>
  )
}
