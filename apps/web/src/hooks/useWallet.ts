"use client"

import { useParaWallet } from "./useParaWallet"

export function useWallet() {
  const paraWallet = useParaWallet()

  return {
    // State - map Para wallet to Privy-like interface for compatibility
    wallets: paraWallet.wallets,
    currentWallet: paraWallet.currentWallet,
    currentAddress: paraWallet.currentAddress,
    isReady: paraWallet.isReady,
    user: paraWallet.user,
    
    // Actions
    connectWallet: paraWallet.connectWallet,
    setCurrentWallet: paraWallet.setCurrentWallet,
    logout: paraWallet.logout,
    
    // Para specific methods
    openModal: paraWallet.openModal,
    para: paraWallet.para
  }
} 