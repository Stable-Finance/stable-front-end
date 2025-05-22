# 💡 Developer Prompts & Examples

> **Ready-to-use prompts and examples for common development tasks in the Stable Protocol project**

## 🤖 LLM Prompts for Common Tasks

### 1. Adding a New Component
```
I need to create a new React component for [COMPONENT_NAME] in the Stable Protocol project. 

Context:
- This is a Next.js 15 project with TypeScript
- Uses Shadcn UI components and Tailwind CSS
- Located in monorepo at apps/web/src/components/
- Follow the existing component patterns

Requirements:
- Use TypeScript with proper interfaces
- Follow the project's naming conventions
- Include proper error handling
- Use existing UI components from Shadcn
- Make it responsive for mobile/desktop

Component should: [DESCRIBE_FUNCTIONALITY]

Please create the component following the project's architecture patterns.
```

### 2. Fixing Build/TypeScript Errors
```
The Stable Protocol project has TypeScript/ESLint errors preventing build. 

Context:
- Next.js 15 with TypeScript strict mode
- Uses pnpm for package management
- Located in apps/web/ directory
- Must maintain type safety

Current errors:
[PASTE_ERROR_OUTPUT]

Please fix these errors while maintaining:
- Type safety (no 'any' types)
- Existing functionality
- Code quality standards
- Project conventions

Suggest the minimal changes needed to resolve the build issues.
```

### 3. Adding Blockchain Integration
```
I need to add blockchain functionality to the Stable Protocol project.

Context:
- Built on Monad testnet (Chain ID: 41991)
- Uses Viem + Wagmi for Web3 interactions
- Para SDK for authentication
- Contracts: NFT, USDX token, Waifu protocol

Requirements:
- Add new contract interaction for [FUNCTIONALITY]
- Handle loading/error states
- Update UI with results
- Follow existing patterns in useContracts.ts

Contract details:
- Address: [CONTRACT_ADDRESS]
- ABI: [CONTRACT_ABI_OR_STANDARD]
- Functions needed: [LIST_FUNCTIONS]

Please implement following the project's Web3 patterns.
```

### 4. Deployment Configuration
```
I need help with deployment configuration for the Stable Protocol monorepo.

Context:
- Monorepo with pnpm workspaces
- Main app in apps/web/ directory
- Target platform: [Vercel/Netlify/Docker]
- Uses environment variables for blockchain config

Requirements:
- [Specific deployment needs]
- Environment variable management
- Build optimization
- Platform-specific configuration

Please provide the deployment configuration following the project's established patterns.
```

## 📋 Quick Reference Examples

### Component Template
```typescript
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWallet } from "@/hooks/useWallet"
import { toast } from "react-hot-toast"

interface ComponentNameProps {
  // Props interface
}

export function ComponentName({ }: ComponentNameProps) {
  const [loading, setLoading] = useState(false)
  const { currentAddress } = useWallet()

  const handleAction = async () => {
    try {
      setLoading(true)
      // Implementation
      toast.success("Success message")
    } catch (error) {
      console.error("Error:", error)
      toast.error("Error message")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Component Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={handleAction}
          disabled={loading || !currentAddress}
        >
          {loading ? "Loading..." : "Action"}
        </Button>
      </CardContent>
    </Card>
  )
}
```

### Hook Template
```typescript
"use client"

import { useState, useEffect } from "react"
import { useWalletStore } from "@/lib/store"

interface HookReturn {
  data: any
  loading: boolean
  error: string | null
  refresh: () => void
}

export function useCustomHook(): HookReturn {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const store = useWalletStore()

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      // Implementation
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    loading,
    error,
    refresh: fetchData
  }
}
```

### Modal Template
```typescript
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  // Additional props
}

export function CustomModal({ isOpen, onClose }: ModalProps) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      // Implementation
      onClose()
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Modal Title</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Modal content */}
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Loading..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

## 🔧 Troubleshooting Prompts

### Build Issues
```
Debug build issues in Stable Protocol:

Current error: [ERROR_MESSAGE]

Check these common issues:
1. Environment variables in .env.local
2. TypeScript strict mode violations
3. Missing imports or exports
4. Incorrect hook usage
5. ESLint rule violations

Project uses:
- pnpm (not npm/yarn)
- TypeScript strict mode
- Next.js App Router
- Para SDK for auth

Provide step-by-step fix maintaining project standards.
```

### Environment Setup
```
Help set up development environment for Stable Protocol:

System: [macOS/Windows/Linux]
Node version: [VERSION]

Need to:
1. Install pnpm
2. Clone monorepo
3. Set up environment variables
4. Configure for Monad testnet
5. Set up Para authentication

Provide complete setup instructions following project requirements.
```

### Performance Issues
```
Optimize performance for Stable Protocol:

Current issues:
- [DESCRIBE_PERFORMANCE_ISSUES]

Project context:
- Next.js 15 with App Router
- Blockchain interactions with Viem/Wagmi
- Multiple modal dialogs
- Real-time data updates

Suggest optimizations following Next.js and React best practices.
```

## 📝 Code Review Prompts

### Review Checklist
```
Review this code for Stable Protocol project:

[CODE_TO_REVIEW]

Check for:
✅ TypeScript compliance (no 'any' types)
✅ Proper error handling
✅ Loading states for async operations
✅ Responsive design considerations
✅ Accessibility features
✅ Performance optimizations
✅ Security best practices
✅ Consistent with project patterns
✅ Proper imports and exports
✅ Environment variable usage

Provide specific feedback and suggestions.
```

### Security Review
```
Security review for DeFi application code:

[CODE_TO_REVIEW]

Focus on:
- Input validation and sanitization
- Smart contract interaction safety
- Authentication/authorization
- Environment variable security
- XSS prevention
- Data validation
- Error handling without information leakage

This is a production DeFi application handling real assets.
```

## 🚀 Deployment Prompts

### Vercel Deployment
```
Configure Vercel deployment for Stable Protocol monorepo:

Requirements:
- Deploy apps/web specifically
- Set up environment variables
- Configure build settings
- Enable preview deployments
- Set up custom domain

Provide complete Vercel configuration and deployment steps.
```

### Environment Variables
```
Set up environment variables for Stable Protocol deployment:

Required variables:
- NEXT_PUBLIC_PARA_API_KEY
- NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
- NEXT_PUBLIC_USDX_CONTRACT_ADDRESS
- NEXT_PUBLIC_WAIFU_CONTRACT_ADDRESS
- NEXT_PUBLIC_BLOCKVISION_API_KEY
- NEXT_PUBLIC_CHAIN_ID
- NEXT_PUBLIC_RPC_URL

Provide:
1. .env.example template
2. Production deployment guidance
3. Security considerations
4. Validation steps
```

## 🧪 Testing Prompts

### Component Testing
```
Create tests for Stable Protocol component:

Component: [COMPONENT_NAME]
Location: [FILE_PATH]

Test requirements:
- Render without errors
- Handle user interactions
- Manage loading states
- Handle error scenarios
- Responsive behavior
- Accessibility compliance

Use testing patterns suitable for Next.js 15 and blockchain components.
```

### Integration Testing
```
Test blockchain integration in Stable Protocol:

Feature: [FEATURE_NAME]
Contracts involved: [LIST_CONTRACTS]

Test scenarios:
- Successful transactions
- Failed transactions
- Network switching
- Wallet disconnection
- Loading states
- Error handling

Provide test strategy for Monad testnet integration.
```

---

**Use these prompts as starting points and adapt them based on your specific needs. Always include relevant context about the project's architecture and requirements.** 