"use client"

import { createPublicClient, createWalletClient, custom, Hex } from "viem"
import { monadTestnet } from "wagmi/chains"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWalletStore } from "@/lib/store"
import { useWallet } from "@/hooks/useWallet"
import { useWaifuBalance } from "@/hooks/useContracts"
import { WAIFU_ADDR, USDX_ADDR } from "@/constants"
import { ensure_tokens_approved, refresh_after_trx } from "@/utils"
import waifu_abi from "@/waifu_abi.json"

export function WaifuRealtorsMint() {
  const store = useWalletStore()
  const { currentWallet, currentAddress } = useWallet()
  const waifuIds = useWaifuBalance(currentAddress)

  const handleMint = async () => {
    if (!currentWallet) return
    
    try {
      // Use pre-built wallet client if available (Para case)
      let viemClient = currentWallet.walletClient
      
      if (!viemClient) {
        // Legacy wallet setup
        if (currentWallet.switchChain) {
          await currentWallet.switchChain(monadTestnet.id)
        }
        const provider = await currentWallet.getEthereumProvider?.()
        
        if (provider) {
          viemClient = createWalletClient({
            account: currentWallet.address as Hex,
            chain: monadTestnet,
            transport: custom(provider)
          })
        }
      }
      
      if (!viemClient) return
      
      const provider = await currentWallet.getEthereumProvider?.()
      if (!provider) return
      
      const publicClient = createPublicClient({
        chain: monadTestnet,
        transport: custom(provider)
      })
      
      await refresh_after_trx(async () => {
        const isWhitelisted = await publicClient.readContract({
          abi: waifu_abi,
          address: WAIFU_ADDR,
          functionName: "isWhitelisted",
          args: [currentWallet.address],
        })
        
        const whitelistVal = 1_000_000_000_000_000_000n / 10n
        const regularVal = 3n * 1_000_000_000_000_000_000n / 10n
        
        return viemClient.writeContract({
          abi: waifu_abi,
          address: WAIFU_ADDR,
          account: currentWallet.address as Hex,
          functionName: "mint",
          value: isWhitelisted ? whitelistVal : regularVal,
          args: []
        })
      })
    } catch (error) {
      console.error("Mint failed:", error)
    }
  }

  const handleUnblur = async (id: bigint) => {
    if (!currentWallet) return
    
    try {
      // Use pre-built wallet client if available (Para case)
      let viemClient = currentWallet.walletClient
      
      if (!viemClient) {
        // Legacy wallet setup
        if (currentWallet.switchChain) {
          await currentWallet.switchChain(monadTestnet.id)
        }
        const provider = await currentWallet.getEthereumProvider?.()
        
        if (provider) {
          viemClient = createWalletClient({
            account: currentWallet.address as Hex,
            chain: monadTestnet,
            transport: custom(provider)
          })
        }
      }
      
      if (!viemClient) return
      
      await ensure_tokens_approved(
        viemClient,
        USDX_ADDR,
        1_000_000n,
        async () => {
          await viemClient.writeContract({
            abi: waifu_abi,
            address: WAIFU_ADDR,
            functionName: "unblur",
            args: [id]
          })
        }
      )
    } catch (error) {
      console.error("Unblur failed:", error)
    }
  }

  return (
    <Card variant="elevated" className="h-fit">
      <CardHeader>
        <h2 className="text-xl font-bold text-center text-amber-900 dark:text-amber-100">
          Waifu Realtors Mint
        </h2>
        <a
          className="text-blue-600 dark:text-blue-400 underline text-center text-sm hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          href={`https://magiceden.us/collections/monad-testnet/${WAIFU_ADDR}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Magic Eden
        </a>
      </CardHeader>
      <CardContent>
        {store.owns_property ? (
          <Button
            onClick={handleMint}
            size="lg"
            className="w-full"
          >
            Mint Waifu Realtor
          </Button>
        ) : (
          <div className="space-y-4">
            <p className="text-amber-800 dark:text-amber-200 text-center text-sm">
              Deposit a Property to Access the Mint
            </p>
            <div className="space-y-2">
              {waifuIds.map(id => (
                <Button
                  key={Number(id)}
                  variant="secondary"
                  size="sm"
                  onClick={() => handleUnblur(id)}
                  className="w-full"
                >
                  Unblur #{Number(id)}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 