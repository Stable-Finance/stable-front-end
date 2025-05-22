# 🤖 LLM Context & Project Guide

> **This file provides comprehensive context for AI assistants working on the Stable Protocol project. Use this as your primary reference for understanding the codebase, architecture, and development patterns.**

## 📖 Project Overview

### What is Stable Protocol?
Stable Protocol is a **decentralized real estate finance platform** built on Monad testnet that enables:
- **NFT-based real estate collateralization** - Users can use real estate NFTs as collateral
- **USDX token borrowing/lending** - Stable token system for loans
- **Dynamic interest rates** - Smart contract-managed interest calculations
- **Web3 authentication** via Para SDK
- **Real-time blockchain integration** with modern UI

### Core Business Logic
1. **Property Tokenization**: Real estate is represented as NFTs (ERC-721)
2. **Collateral System**: NFTs can be locked as collateral for loans
3. **Lending Pool**: USDX tokens available for borrowing
4. **Interest Management**: Dynamic rates based on utilization
5. **Liquidation**: Automatic liquidation when collateral value drops

## 🏗️ Architecture Overview

### Monorepo Structure
```
stable-frontend/
├── apps/
│   ├── homepage/            # Marketing website (Next.js)
│   └── web/                 # Main DeFi application (Next.js - PRIMARY FOCUS)
├── packages/                # Shared packages (currently minimal)
│   ├── ui/                  # Shared UI components
│   ├── eslint-config/       # ESLint configuration
│   └── typescript-config/   # TypeScript configuration
├── package.json             # Root package.json with monorepo scripts
├── pnpm-workspace.yaml      # pnpm workspace configuration
└── LLM_CONTEXT.md          # This file
```

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + Shadcn UI components
- **State Management**: Zustand for global state
- **Web3**: Viem + Wagmi for blockchain interactions
- **Authentication**: Para SDK (replacing Privy)
- **Package Manager**: pnpm (monorepo with workspaces)
- **Deployment**: Vercel (primary), Netlify (alternative)

## 🎯 Key Components & Architecture

### Authentication Flow
```typescript
// Current authentication architecture
ParaProviders -> AuthGate -> (LandingPage | ProtocolDashboard)

// File locations:
// - src/components/providers/ParaProviders.tsx
// - src/components/auth/AuthGate.tsx
// - src/components/marketing/LandingPage.tsx
```

### State Management Pattern
```typescript
// Zustand store pattern (src/lib/store.ts)
interface WalletStore {
  current_wallet_index: number
  set_current_wallet: (index: number) => void
  reset: () => void
}

// Usage in components:
const store = useWalletStore()
const { currentAddress } = useWallet() // Custom hook wrapper
```

### Component Organization
```
src/components/
├── auth/              # Authentication components
├── marketing/         # Landing page components
├── modals/           # All modal dialogs
├── nft/              # NFT-related components
├── property/         # Property management
├── protocol/         # Core protocol interface
├── providers/        # Context providers
├── ui/               # Reusable UI components (Shadcn)
└── wallet/           # Wallet connection components
```

### Hook Architecture
```typescript
// Custom hooks pattern (src/hooks/)
useWallet()     -> Para SDK wrapper + state management
useContracts()  -> Smart contract interactions
useParaWallet() -> Para-specific wallet operations

// Each hook follows the pattern:
// 1. State management with Zustand
// 2. Error handling with try/catch
// 3. Loading states
// 4. Type safety with TypeScript
```

## 🔧 Development Patterns & Guidelines

### File Naming Conventions
- **Components**: PascalCase (e.g., `PropertyCard.tsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useWallet.ts`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Directories**: kebab-case (e.g., `property-management/`)

### Component Structure
```typescript
// Standard component pattern
"use client" // When needed for client-side features

import { useState, useEffect } from "react"
import { ComponentProps } from "@/types" // Local types
import { useWallet } from "@/hooks/useWallet" // Custom hooks
import { Button } from "@/components/ui/button" // UI components

interface Props {
  // Props interface
}

export function ComponentName({ prop }: Props) {
  // 1. Hooks
  const [state, setState] = useState()
  const { data } = useWallet()
  
  // 2. Effects
  useEffect(() => {
    // Side effects
  }, [])
  
  // 3. Handlers
  const handleAction = () => {
    // Event handlers
  }
  
  // 4. Render
  return (
    <div className="tailwind-classes">
      {/* JSX */}
    </div>
  )
}
```

### Environment Variables Pattern
```typescript
// All environment variables are prefixed with NEXT_PUBLIC_
// Defined in: src/constants.ts

export const CONTRACT_ADDRESSES = {
  NFT: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!,
  USDX: process.env.NEXT_PUBLIC_USDX_CONTRACT_ADDRESS!,
  WAIFU: process.env.NEXT_PUBLIC_WAIFU_CONTRACT_ADDRESS!,
} as const

// Required environment variables:
// - NEXT_PUBLIC_PARA_API_KEY
// - NEXT_PUBLIC_NFT_CONTRACT_ADDRESS  
// - NEXT_PUBLIC_USDX_CONTRACT_ADDRESS
// - NEXT_PUBLIC_WAIFU_CONTRACT_ADDRESS
// - NEXT_PUBLIC_BLOCKVISION_API_KEY
// - NEXT_PUBLIC_CHAIN_ID
// - NEXT_PUBLIC_RPC_URL
```

## 🚨 Current Issues & Context

### Para SDK Integration Status
```typescript
// CURRENT STATE: Para SDK integration is partially complete
// ISSUE: Some Para SDK hooks are not correctly imported
// LOCATION: src/hooks/useParaWallet.ts

// The Para SDK integration needs:
// 1. Correct hook imports from @getpara/react-sdk
// 2. Proper authentication flow
// 3. Wallet connection handling
// 4. Error boundary implementation
```

### Build Issues
```bash
# Current build errors to be aware of:
# 1. TypeScript strict mode violations
# 2. ESLint unused variable warnings
# 3. Missing Next.js Image optimization
# 4. Any type usage (should be avoided)

# Quick fix patterns:
# - Remove unused imports
# - Use Next.js Image component instead of <img>
# - Replace 'any' with proper types
# - Add underscore prefix for unused variables
```

## 🎨 UI/UX Patterns

### Design System
```typescript
// Shadcn UI + Tailwind CSS pattern
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// Standard color scheme:
// - Primary: Amber/Gold (#f59e0b, #fef3c7)
// - Background: Gradient amber to orange
// - Dark mode: Gray scale with amber accents
// - Glass effect: backdrop-blur with opacity
```

### Modal Pattern
```typescript
// All modals follow this pattern:
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  // Specific props
}

// Modal locations: src/components/modals/
// - BorrowModal.tsx
// - LendModal.tsx  
// - RepayModal.tsx
// - InterestModal.tsx
// - PropertyDetailsModal.tsx
```

## 🔗 Blockchain Integration

### Network Configuration
```typescript
// Target network: Monad Testnet
// Chain ID: 41991
// RPC: https://testnet-rpc.monad.xyz

// Contract interaction pattern:
const { contracts } = useContracts()
const result = await contracts.nftContract.read.balanceOf([address])
```

### Smart Contract ABIs
```typescript
// Contract ABIs are imported from wagmi/abi
// Standard ERC-721 and ERC-20 patterns
// Custom protocol functions for lending/borrowing
```

## 📦 Package Management & Scripts

### pnpm Workspace Commands
```bash
# From root directory:
pnpm dev              # Start all apps in parallel
pnpm dev:web          # Start DeFi app only
pnpm dev:homepage     # Start homepage only
pnpm build            # Build all apps
pnpm build:web        # Build DeFi app only
pnpm build:homepage   # Build homepage only
pnpm lint             # Lint all apps
pnpm type-check:all   # TypeScript check all apps

# From individual app directories:
cd apps/web && pnpm dev          # Start DeFi development
cd apps/homepage && pnpm dev     # Start homepage development
pnpm build            # Build specific app
pnpm lint             # Lint specific app
```

## 🚀 Deployment Context

### Deployment Options
1. **Vercel (Recommended)**
   - Use `apps/web/vercel.json` for app-specific deployment
   - Use root `vercel.json` for monorepo deployment
   
2. **Netlify**
   - Use `apps/web/netlify.toml` for app-specific deployment
   - Use root `netlify.toml` for monorepo deployment

### Build Configuration
```json
// Vercel app-specific (apps/web/vercel.json)
{
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "installCommand": "pnpm install"
}

// Vercel monorepo (root vercel.json)
{
  "buildCommand": "pnpm build:web",
  "outputDirectory": "apps/web/.next",
  "installCommand": "pnpm install"
}
```

## 🤝 Development Workflow

### When Working on This Project
1. **Always use pnpm** - This is a pnpm workspace project
2. **Follow TypeScript strict mode** - No `any` types
3. **Use Shadcn UI components** - Don't create custom UI from scratch
4. **Implement proper error handling** - Try/catch for async operations
5. **Test on Monad testnet** - Ensure blockchain integration works
6. **Check environment variables** - Ensure all required vars are set

### Adding New Features
1. **Create component in appropriate directory** (`src/components/`)
2. **Add custom hook if needed** (`src/hooks/`)
3. **Update Zustand store if state needed** (`src/lib/store.ts`)
4. **Add proper TypeScript types** 
5. **Implement error boundaries**
6. **Test responsive design**

### Common Tasks
```typescript
// Adding a new modal:
// 1. Create in src/components/modals/
// 2. Follow existing modal pattern
// 3. Add to parent component
// 4. Handle open/close state

// Adding blockchain interaction:
// 1. Add to src/hooks/useContracts.ts
// 2. Handle loading/error states
// 3. Update UI with results
// 4. Add proper TypeScript types

// Adding new page:
// 1. Create in src/app/ (App Router)
// 2. Use layout.tsx for common elements
// 3. Implement responsive design
// 4. Add proper metadata
```

## ⚠️ Important Notes for LLMs

### What to Always Remember
1. **This is a monorepo** - Multiple apps/packages structure
2. **pnpm is required** - Don't suggest npm or yarn commands
3. **Para SDK is the auth provider** - Not Privy anymore
4. **Monad testnet** - Specific blockchain network
5. **TypeScript strict mode** - Type safety is critical
6. **Shadcn UI** - Use existing components, don't reinvent

### What to Avoid
1. **Don't use `any` type** - Always provide proper types
2. **Don't suggest npm/yarn** - This project uses pnpm
3. **Don't ignore environment variables** - They're critical for blockchain
4. **Don't break the monorepo structure** - Respect the workspace setup
5. **Don't suggest Privy** - The project migrated to Para SDK

### Quick Reference Commands
```bash
# Install dependencies
pnpm install

# Start development (from root)
pnpm dev              # All apps
pnpm dev:web          # DeFi app only
pnpm dev:homepage     # Homepage only

# Build for production
pnpm build            # All apps
pnpm build:web        # DeFi app only
pnpm build:homepage   # Homepage only

# Fix common issues
pnpm lint:fix:web
pnpm lint:fix:homepage
pnpm type-check:all

# Clean and rebuild
pnpm clean && pnpm build
```

---

**Remember**: This project is a production DeFi application with real smart contracts. Always prioritize security, type safety, and proper error handling in any modifications or additions. 