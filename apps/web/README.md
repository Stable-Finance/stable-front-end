# 🌐 Stable Protocol Web App

The main web application for Stable Protocol - a decentralized real estate finance platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (install globally: `npm install -g pnpm`)
- Para account ([getpara.com](https://getpara.com))

### Installation

#### Option 1: From Monorepo Root (Recommended)
```bash
# Install all dependencies
pnpm install

# Start all apps
pnpm dev

# Or start specific apps
pnpm dev:web        # DeFi app (port 3000)
pnpm dev:homepage   # Homepage (port 3001)
```

#### Option 2: Individual App Setup
1. **Navigate to web app**
   ```bash
   cd apps/web
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables**
   Create `.env.local` with your actual values:
   ```env
   # Para Authentication (Required)
   NEXT_PUBLIC_PARA_API_KEY=your_para_api_key_here
   
   # Smart Contract Addresses (Required - Monad Testnet)
   NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_USDX_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_WAIFU_CONTRACT_ADDRESS=0x...
   
   # Blockchain Configuration (Required)
   NEXT_PUBLIC_CHAIN_ID=41991
   NEXT_PUBLIC_RPC_URL=https://testnet-rpc.monad.xyz
   
   # API Keys (Required)
   NEXT_PUBLIC_BLOCKVISION_API_KEY=your_blockvision_api_key
   
   # Optional Configuration
   NODE_ENV=development
   NEXT_PUBLIC_DEBUG=false
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── auth/              # Authentication components
│   ├── marketing/         # Landing page components
│   ├── modals/            # Modal components
│   ├── nft/               # NFT-related components
│   ├── property/          # Property components
│   ├── protocol/          # Protocol dashboard
│   ├── providers/         # Context providers
│   ├── ui/                # UI components
│   └── wallet/            # Wallet components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and store
└── constants.ts           # Configuration constants
```

## 🧩 Key Components

### Authentication
- **`AuthGate`**: Controls access based on authentication state
- **`ParaProviders`**: Para SDK integration
- **`LandingPage`**: Marketing content for unauthenticated users

### Protocol Interface
- **`ProtocolDashboard`**: Main protocol dashboard
- **`PropertyMinter`**: NFT property minting interface
- **`WalletConnection`**: Wallet management
- **`ContractAddresses`**: Display contract information

### Modals
- **`BorrowModal`**: USDX borrowing interface
- **`LendModal`**: USDX lending interface
- **`PaymentModal`**: Interest payment interface

## 🔧 Development Scripts

#### From Monorepo Root
```bash
# Development
pnpm dev:web         # Start web app dev server
pnpm build:web       # Build web app for production
pnpm start:web       # Start web app production server

# Code Quality
pnpm lint:web        # Run ESLint on web app
pnpm lint:fix:web    # Fix web app linting issues
pnpm type-check:web  # TypeScript checking on web app

# Utilities
pnpm clean:web       # Clean web app build artifacts
pnpm preview:web     # Build and preview web app
```

#### From apps/web Directory
```bash
# Development
pnpm dev             # Start dev server
pnpm build           # Build for production
pnpm start           # Start production server

# Code Quality
pnpm lint            # Run ESLint
pnpm lint:fix        # Fix linting issues
pnpm type-check      # TypeScript checking

# Utilities
pnpm clean           # Clean build artifacts
pnpm preview         # Build and preview
pnpm export          # Export static site
```

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_PARA_API_KEY` | Para authentication API key | ✅ |
| `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` | Property NFT contract | ✅ |
| `NEXT_PUBLIC_USDX_CONTRACT_ADDRESS` | USDX token contract | ✅ |
| `NEXT_PUBLIC_WAIFU_CONTRACT_ADDRESS` | Waifu protocol contract | ✅ |
| `NEXT_PUBLIC_BLOCKVISION_API_KEY` | Blockchain data API | ✅ |
| `NEXT_PUBLIC_CHAIN_ID` | Network chain ID (41991) | ✅ |
| `NEXT_PUBLIC_RPC_URL` | RPC endpoint URL | ✅ |

## 🎨 Styling

### Design System
- **Shadcn UI**: Component library
- **Tailwind CSS**: Utility-first CSS
- **CSS Variables**: Theme customization
- **Dark Mode**: Automatic theme switching

### Color Palette
- **Primary**: Amber/Gold theme
- **Background**: Gradient amber to orange
- **Dark Mode**: Gray scale with amber accents

## 🔗 Web3 Integration

### Blockchain Stack
- **Viem**: Type-safe Ethereum client
- **Wagmi**: React hooks for Ethereum
- **Para SDK**: Wallet authentication
- **Zustand**: State management

### Supported Networks
- **Monad Testnet**: Primary network
- Chain ID: `41991`
- RPC: `https://testnet-rpc.monad.xyz`

## 📦 Deployment

### Vercel (Recommended)
```bash
# Build command
pnpm build

# Output directory
.next

# Environment variables
# Add all NEXT_PUBLIC_* variables
```

### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN pnpm install --prod --frozen-lockfile

COPY . .
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]
```

### Static Export
```bash
pnpm export
# Outputs to 'out' directory
```

## 🧪 Testing

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Build test
pnpm build
```

## 🚨 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear cache
pnpm clean
rm -rf node_modules .next
pnpm install
```

**Environment Variables**
- Ensure all `NEXT_PUBLIC_*` variables are set
- Check for typos in variable names
- Verify API keys are valid

**Web3 Connection**
- Verify wallet is on Monad testnet
- Check RPC endpoint connectivity
- Ensure contract addresses are correct

**Para Authentication**
- Verify Para API key is valid
- Check Para service status
- Ensure proper SDK version

## 📚 Documentation

- [Component Documentation](./docs/components.md)
- [API Reference](./docs/api.md)
- [Deployment Guide](./docs/deployment.md)

## 🤝 Contributing

1. Follow the coding standards
2. Ensure TypeScript compliance
3. Test on multiple devices
4. Add proper error handling
5. Update documentation

---

For more information, see the [main project README](../../README.md).
