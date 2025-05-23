# 🏠 Stable Protocol - Decentralized Real Estate Finance

> A property-backed lending protocol on Monad testnet, enabling users to collateralize real estate NFTs for USDX token borrowing with dynamic interest rates.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🌟 Features

- **🏠 NFT-based Real Estate Collateral**: Use real estate NFTs as collateral for loans
- **💰 USDX Token System**: Borrow and lend using stable USDX tokens  
- **📊 Dynamic Interest Rates**: Smart contract-managed interest calculations
- **🔐 Para Authentication**: Secure Web3 authentication via Para SDK
- **⚡ Real-time Updates**: Live blockchain state synchronization
- **📱 Responsive Design**: Modern UI built with Shadcn UI and Tailwind CSS
- **🌙 Dark Mode**: Beautiful light/dark theme support
- **🔗 Blockchain Integration**: Full Web3 integration with Viem and Wagmi

## 🏗️ Project Structure

This is a monorepo containing:

```
stable-frontend/
├── apps/
│   ├── homepage/            # Marketing website (Next.js)
│   └── web/                 # Main DeFi application (Next.js)
└── packages/
    ├── ui/                  # Shared UI components
    ├── eslint-config/       # Shared ESLint configuration
    └── typescript-config/   # Shared TypeScript configuration
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and pnpm
- **Git** for version control
- **Para Account** (sign up at [getpara.com](https://getpara.com))
- **Monad Testnet** setup for blockchain interaction

### Installation

1. **Install pnpm globally (if not already installed)**
   ```bash
   npm install -g pnpm
   ```

2. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/stable-frontend.git
   cd stable-frontend
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Environment Setup**
   ```bash
   cd apps/web
   cp .env.example .env.local
   ```

5. **Configure Environment Variables**
   
   Edit `apps/web/.env.local`:
   ```env
   # Para Authentication
   NEXT_PUBLIC_PARA_API_KEY=your_para_api_key_here
   
   # Contract Addresses (Monad Testnet)
   NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_USDX_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_WAIFU_CONTRACT_ADDRESS=0x...
   
   # API Keys
   NEXT_PUBLIC_BLOCKVISION_API_KEY=your_blockvision_api_key
   ```

6. **Start Development Server**
   ```bash
   # Start all apps in parallel
   pnpm dev
   
   # Or start specific apps
   pnpm dev:web        # DeFi application (port 3000)
   pnpm dev:homepage   # Marketing website (port 3001)
   
   # Or navigate to specific app directory
   cd apps/web && pnpm dev         # DeFi app
   cd apps/homepage && pnpm dev    # Homepage
   ```

   Open the applications:
   - **DeFi App**: [http://localhost:3000](http://localhost:3000)
   - **Homepage**: [http://localhost:3001](http://localhost:3001)

## 🔧 Development

### Available Scripts

#### Monorepo Scripts (from root)
```bash
# Development
pnpm dev             # Start all apps in parallel
pnpm dev:web         # Start DeFi app only
pnpm dev:homepage    # Start homepage only

# Build
pnpm build           # Build all apps
pnpm build:web       # Build DeFi app only
pnpm build:homepage  # Build homepage only

# Production
pnpm start:web       # Start DeFi app production server
pnpm start:homepage  # Start homepage production server

# Code Quality
pnpm lint            # Lint all apps
pnpm lint:web        # Lint DeFi app only
pnpm lint:homepage   # Lint homepage only
pnpm type-check:all  # TypeScript check all apps

# Utilities
pnpm install         # Install all dependencies
pnpm clean           # Clean all build files
```

#### Individual App Scripts (from app directories)
```bash
# From apps/web/ or apps/homepage/
pnpm dev             # Start development server
pnpm build           # Build for production
pnpm start           # Start production server
pnpm lint            # Run ESLint
pnpm lint:fix        # Fix ESLint errors
pnpm type-check      # TypeScript type checking
pnpm clean           # Clean build files
```

### Project Architecture

#### Authentication Flow
- **Para SDK Integration**: Secure Web3 authentication
- **AuthGate Component**: Conditional rendering based on auth state
- **Landing Page**: Marketing content for unauthenticated users

#### Key Components
- **`ProtocolDashboard`**: Main protocol interface
- **`PropertyMinter`**: NFT minting functionality  
- **`WalletConnection`**: Wallet management
- **`ContractAddresses`**: Contract information display

#### State Management
- **Zustand**: Global state management
- **Custom Hooks**: Modular blockchain interactions
- **React Query**: Data fetching and caching

## 🌐 Deployment

### Vercel (Recommended)

#### Deploy Individual Apps
1. **Connect Repository**
   - Import project to Vercel
   - For web app: Select `apps/web` as root directory
   - For homepage: Select `apps/homepage` as root directory

2. **Environment Variables**
   ```env
   NEXT_PUBLIC_PARA_API_KEY=your_production_api_key
   NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_USDX_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_WAIFU_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_BLOCKVISION_API_KEY=your_api_key
   NEXT_PUBLIC_CHAIN_ID=41991
   NEXT_PUBLIC_RPC_URL=https://testnet-rpc.monad.xyz
   ```

3. **Deploy Commands**
   ```bash
   # Deploy web app
   cd apps/web && vercel

   # Deploy homepage
   cd apps/homepage && vercel
   ```

### Docker Deployment

```dockerfile
# apps/web/Dockerfile
FROM node:18-alpine AS base
WORKDIR /app

# Dependencies
COPY package*.json ./
RUN pnpm install --prod --frozen-lockfile

# Build
COPY . .
RUN pnpm build

# Production
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./package.json

EXPOSE 3000
CMD ["pnpm", "start"]
```

## 🔗 Blockchain Integration

### Supported Networks
- **Monad Testnet** (Primary)
- Chain ID: `41991`
- RPC: `https://testnet-rpc.monad.xyz`

### Smart Contracts
- **NFT Contract**: Property tokenization
- **USDX Contract**: Stable token for lending
- **Waifu Contract**: Protocol governance

### Web3 Stack
- **Viem**: Ethereum interactions
- **Wagmi**: React hooks for Web3
- **Para SDK**: Authentication and wallet management

## 🎨 UI/UX

### Design System
- **Shadcn UI**: Component library
- **Tailwind CSS**: Utility-first styling
- **Radix UI**: Accessibility primitives
- **Lucide Icons**: Icon library

### Features
- Responsive design (mobile-first)
- Dark/light mode support
- Accessible components
- Modern animations

## 🧪 Testing

```bash
# Run tests (when implemented)
pnpm test

# Type checking
pnpm type-check

# Linting
pnpm lint
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_PARA_API_KEY` | Para authentication API key | ✅ |
| `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` | NFT contract address | ✅ |
| `NEXT_PUBLIC_USDX_CONTRACT_ADDRESS` | USDX token contract address | ✅ |
| `NEXT_PUBLIC_WAIFU_CONTRACT_ADDRESS` | Waifu contract address | ✅ |
| `NEXT_PUBLIC_BLOCKVISION_API_KEY` | BlockVision API key | ✅ |
| `NEXT_PUBLIC_CHAIN_ID` | Blockchain network ID | ✅ |
| `NEXT_PUBLIC_RPC_URL` | RPC endpoint URL | ✅ |

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Ensure responsive design
- Add proper error handling
- Write clear documentation

## 📚 Documentation

- **[LLM Context Guide](./LLM_CONTEXT.md)**: Comprehensive context for AI assistants
- **[Developer Prompts](./DEV_PROMPTS.md)**: Ready-to-use prompts for common tasks
- **[Deployment Guide](./DEPLOYMENT.md)**: Detailed deployment instructions
- **[Web App README](./apps/web/README.md)**: Specific documentation for the web application

## 🔧 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear cache and reinstall
pnpm clean
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Environment Variables**
- Ensure all required variables are set
- Check for typos in variable names
- Verify API keys are valid

**Web3 Connection**
- Ensure wallet is connected to Monad testnet
- Check RPC endpoint availability
- Verify contract addresses

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Monad** for blockchain infrastructure
- **Para** for authentication services
- **Shadcn** for the amazing UI components
- **Next.js** team for the incredible framework

## 📞 Support

- **GitHub Issues**: [Create an issue](https://github.com/your-username/stable-frontend/issues)
- **Documentation**: [Full docs](./docs/)
- **Community**: [Discord/Telegram link]

---

Built with ❤️ by the Stable Protocol Team
