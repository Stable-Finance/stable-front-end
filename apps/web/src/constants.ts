import { Hex } from 'viem'

// Contract Addresses from environment variables
export const USDX_ADDR: Hex = (process.env.NEXT_PUBLIC_USDX_ADDRESS || "0xd875ba8e2cad3c0f7e2973277c360c8d2f92b510") as Hex
export const NFT_ADDR: Hex = (process.env.NEXT_PUBLIC_NFT_ADDRESS || "0x9d380F07463900767A8cB26A238CEf047A174D62") as Hex
export const USDC_ADDR: Hex = (process.env.NEXT_PUBLIC_USDC_ADDRESS || "0xf817257fed379853cDe0fa4F97AB987181B1E5Ea") as Hex
export const USDT_ADDR: Hex = (process.env.NEXT_PUBLIC_USDT_ADDRESS || "0x88b8E2161DEDC77EF4ab7585569D2415a1C1055D") as Hex
export const WAIFU_ADDR: Hex = (process.env.NEXT_PUBLIC_WAIFU_ADDRESS || "0x1C679234f23e1ae9Fc19AdC4Bb299E82C515C78a") as Hex

// API Configuration
export const PARA_API_KEY = process.env.NEXT_PUBLIC_PARA_API_KEY || "your_para_api_key_here"
export const BLOCKVISION_API_KEY = process.env.BLOCKVISION_API_KEY || "2uDur6i5hwYl57Eu5tFLWwIQzc7"

// Chain Configuration
export const CHAIN_CONFIG = {
  id: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "4104132"),
  name: process.env.NEXT_PUBLIC_CHAIN_NAME || "Monad Testnet",
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || "https://testnet.monad.xyz"
} as const