"use client"

import { useEffect, useState } from "react"
import { createPublicClient, createWalletClient, custom, Hex, WalletClient, Abi } from "viem"
import { monadTestnet } from "wagmi/chains"
import { useReadContract, useReadContracts } from "wagmi"

import { NFT_ADDR, USDX_ADDR, WAIFU_ADDR } from "@/constants"
import nft_abi from "@/nft_abi.json"
import usdx_abi from "@/usdx_abi.json"
import waifu_abi from "@/waifu_abi.json"

// Generic wallet interface that works with both Privy and Para
interface GenericWallet {
  address: string
  chainId?: number
  switchChain?: (chainId: number) => Promise<void>
  getEthereumProvider?: () => Promise<any>
  walletClient?: WalletClient
}

export function useViemClient(wallet: GenericWallet | null) {
  const [viemClient, setViemClient] = useState<WalletClient | null>(null)

  useEffect(() => {
    if (!wallet) return

    const setupClient = async () => {
      // Check if wallet already has a client (Para case)
      if (wallet.walletClient) {
        setViemClient(wallet.walletClient)
        return
      }

      // Legacy setup for wallets without pre-built client
      if (wallet.switchChain) {
        await wallet.switchChain(monadTestnet.id)
      }
      
      if (wallet.getEthereumProvider) {
        const provider = await wallet.getEthereumProvider()
        
        const client = createWalletClient({
          account: wallet.address as Hex,
          chain: monadTestnet,
          transport: custom(provider)
        })
        
        setViemClient(client)
      }
    }

    setupClient()
  }, [wallet])

  return viemClient
}

export function usePropertyBalance(userAddress: string | null) {
  return useReadContract({
    abi: nft_abi,
    address: NFT_ADDR,
    functionName: "balanceOf",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress
    }
  })
}

export function usePropertyTokens(userAddress: string | null, nftCount: number) {
  return useReadContracts({
    contracts: Array.from({ length: nftCount }).map((_, i) => ({
      abi: nft_abi as Abi,
      address: NFT_ADDR,
      functionName: "tokenOfOwnerByIndex",
      args: [userAddress, BigInt(i)]
    })),
    query: {
      enabled: !!userAddress && nftCount > 0
    }
  })
}

export function usePropertyURIs(tokenIds: bigint[]) {
  return useReadContracts({
    contracts: tokenIds.map((nftId) => ({
      abi: nft_abi as Abi,
      address: NFT_ADDR,
      functionName: "tokenURI",
      args: [nftId],
    })),
    query: {
      enabled: tokenIds.length > 0
    }
  })
}

export function useUSDXBalance(userAddress: string | null) {
  return useReadContract({
    abi: usdx_abi,
    address: USDX_ADDR,
    functionName: "balanceOf",
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress
    }
  })
}

export function useWaifuBalance(userAddress: string | null) {
  const [waifuIds, setWaifuIds] = useState<bigint[]>([])

  useEffect(() => {
    if (!userAddress) return

    const fetchWaifuBalance = async () => {
      try {
        const provider = window.ethereum
        if (!provider) return

        const publicClient = createPublicClient({
          chain: monadTestnet,
          transport: custom(provider)
        })

        const balance = await publicClient.readContract({
          abi: waifu_abi,
          address: WAIFU_ADDR,
          functionName: "balanceOf",
          args: [userAddress]
        }) as bigint

        const ids: bigint[] = await Promise.all(
          Array.from({ length: Number(balance) }).map(async (_, i) => {
            return await publicClient.readContract({
              abi: waifu_abi,
              address: WAIFU_ADDR,
              functionName: "tokenOfOwnerByIndex",
              args: [userAddress, BigInt(i)]
            }) as bigint
          })
        )

        setWaifuIds(ids)
      } catch (error) {
        console.error("Error fetching waifu balance:", error)
        setWaifuIds([])
      }
    }

    fetchWaifuBalance()
  }, [userAddress])

  return waifuIds
} 