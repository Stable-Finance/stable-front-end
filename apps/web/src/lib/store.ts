import { create } from 'zustand'

// Generic wallet interface that works with both Privy and Para
interface GenericWallet {
  address: string
  chainId?: number
  [key: string]: any // Allow additional properties
}

interface WalletStore {
  current_addr: string | null
  current_wallet: GenericWallet | null
  wallets: GenericWallet[]
  owns_property: boolean

  // Actions
  set_owns_property: () => void
  set_wallets: (wallets: GenericWallet[]) => void
  set_current_wallet: (idx: number) => void
  reset: () => void
}

export const useWalletStore = create<WalletStore>((set, get) => ({
  // State
  current_addr: null,
  current_wallet: null,
  wallets: [],
  owns_property: false,

  // Actions
  set_owns_property: () => set({ owns_property: true }),

  set_wallets: (wallets) => set({ wallets }),

  set_current_wallet: (idx) => {
    const { wallets } = get()
    if (idx < wallets.length) {
      set({
        current_addr: wallets[idx].address,
        current_wallet: wallets[idx]
      })
    }
  },

  reset: () => set({
    current_addr: null,
    current_wallet: null,
    wallets: [],
    owns_property: false
  })
})) 