# 🚀 Deployment Guide

This guide covers deployment strategies for the Stable Protocol applications, with specific instructions for deploying individual apps from the monorepo.

## 📋 Pre-deployment Checklist

### Environment Setup
- [ ] All environment variables configured
- [ ] API keys validated and working
- [ ] Contract addresses verified on target network
- [ ] Domain names purchased and configured
- [ ] SSL certificates ready (handled by platforms)

### Code Quality
- [ ] All tests passing
- [ ] TypeScript compilation successful
- [ ] ESLint warnings resolved
- [ ] Build process completes without errors
- [ ] Performance optimizations applied

### Security
- [ ] Environment variables secured
- [ ] API keys rotated for production
- [ ] CORS settings configured
- [ ] Security headers implemented
- [ ] Dependencies audited for vulnerabilities

## 🏗️ Monorepo Deployment Overview

### App Structure
```
stable-frontend/
├── apps/
│   └── web/                 # Next.js web application
└── packages/
    ├── ui/                  # Shared UI components
    ├── eslint-config/       # Shared ESLint configuration
    └── typescript-config/   # Shared TypeScript configuration
```

### Deployment Options

#### Option 1: Deploy Specific App (Recommended)
Deploy only the web app from the monorepo, which is more efficient and faster.

#### Option 2: Deploy Entire Monorepo
Deploy the entire monorepo structure (useful for full-stack applications).

## 🌐 Deployment Platforms

### 1. Vercel (Recommended for Next.js)

**Advantages:**
- Zero-config Next.js deployment
- Global CDN and edge functions
- Automatic HTTPS and domains
- Git integration with preview deployments
- Environment variable management

**Setup Steps:**

#### Method 1: Deploy Web App Only (Recommended)

1. **Install Vercel CLI and pnpm**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Install pnpm if not already installed
   npm i -g pnpm
   
   # Login to Vercel
   vercel login
   ```

2. **Deploy from Web App Directory**
   ```bash
   # Navigate to web app
   cd apps/web
   
   # Deploy web app specifically
   vercel
   ```

3. **Web App Configuration (vercel.json in apps/web/)**
   ```json
   {
     "name": "stable-protocol-web",
     "buildCommand": "pnpm build",
     "outputDirectory": ".next",
     "installCommand": "pnpm install",
     "devCommand": "pnpm dev",
     "framework": "nextjs"
   }
   ```

#### Method 2: Deploy from Monorepo Root

1. **Deploy from Project Root**
   ```bash
   # Deploy from project root
   vercel
   ```

2. **Monorepo Configuration (vercel.json in root)**
   ```json
   {
     "name": "stable-protocol",
     "buildCommand": "pnpm build:web",
     "outputDirectory": "apps/web/.next",
     "installCommand": "pnpm install",
     "devCommand": "pnpm dev:web",
     "framework": "nextjs"
   }
   ```

3. **Environment Variables**
   ```bash
   # Production environment variables (same for both methods)
   vercel env add NEXT_PUBLIC_PARA_API_KEY production
   vercel env add NEXT_PUBLIC_NFT_CONTRACT_ADDRESS production
   vercel env add NEXT_PUBLIC_USDX_CONTRACT_ADDRESS production
   vercel env add NEXT_PUBLIC_WAIFU_CONTRACT_ADDRESS production
   vercel env add NEXT_PUBLIC_BLOCKVISION_API_KEY production
   vercel env add NEXT_PUBLIC_CHAIN_ID production
   vercel env add NEXT_PUBLIC_RPC_URL production
   ```

4. **Custom Domain**
   ```bash
   # Add custom domain
   vercel domains add your-domain.com
   vercel domains add www.your-domain.com
   ```

### 2. Netlify

**Advantages:**
- Great for static sites
- Form handling and serverless functions
- Split testing capabilities
- Plugin ecosystem

**Setup Steps:**

#### Method 1: Deploy Web App Only (Recommended)

1. **Netlify Configuration in apps/web/netlify.toml**
   ```toml
   # apps/web/netlify.toml
   [build]
     command = "pnpm install && pnpm build && pnpm export"
     publish = "out"
   
   [build.environment]
     NODE_VERSION = "18"
     PNPM_VERSION = "8"
   
   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-Content-Type-Options = "nosniff"
   ```

#### Method 2: Deploy from Monorepo Root

1. **Netlify Configuration in root netlify.toml**
   ```toml
   # netlify.toml (root)
   [build]
     base = "apps/web"
     command = "cd ../.. && pnpm install && pnpm build:web && cd apps/web && pnpm export"
     publish = "apps/web/out"
   
   [build.environment]
     NODE_VERSION = "18"
     PNPM_VERSION = "8"
   
   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-Content-Type-Options = "nosniff"
   ```

2. **Environment Variables**
   - Go to Site settings > Environment variables
   - Add all `NEXT_PUBLIC_*` variables
   - Set `NODE_ENV=production`

### 3. AWS Amplify

**Advantages:**
- Full AWS integration
- Auto-scaling and global CDN
- CI/CD pipelines
- Backend integration

**Setup Steps:**

#### Method 1: Deploy Web App Only

1. **Amplify Configuration for apps/web/amplify.yml**
   ```yaml
   # apps/web/amplify.yml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install -g pnpm
           - pnpm install
       build:
         commands:
           - pnpm build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

#### Method 2: Deploy from Monorepo Root

1. **Amplify Configuration for root amplify.yml**
   ```yaml
   # amplify.yml (root)
   version: 1
   applications:
     - appRoot: apps/web
       frontend:
         phases:
           preBuild:
             commands:
               - npm install -g pnpm
               - pnpm install
           build:
             commands:
               - pnpm build:web
         artifacts:
           baseDirectory: apps/web/.next
           files:
             - '**/*'
         cache:
           paths:
             - node_modules/**/*
             - apps/web/node_modules/**/*
   ```

### 4. Docker Deployment

**For VPS, AWS EC2, Google Cloud, etc.**

1. **Dockerfile**
   ```dockerfile
   # apps/web/Dockerfile
   FROM node:18-alpine AS base
   
   # Install dependencies only when needed
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   
   COPY package.json package-lock.json* ./
   RUN npm ci --only=production && npm cache clean --force
   
   # Rebuild the source code only when needed
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   
   RUN npm run build
   
   # Production image, copy all the files and run next
   FROM base AS runner
   WORKDIR /app
   
   ENV NODE_ENV production
   
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   
   USER nextjs
   
   EXPOSE 3000
   
   ENV PORT 3000
   
   CMD ["node", "server.js"]
   ```

2. **Docker Compose**
   ```yaml
   # docker-compose.yml
   version: '3.8'
   services:
     web:
       build:
         context: ./apps/web
         dockerfile: Dockerfile
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=production
         - NEXT_PUBLIC_PARA_API_KEY=${NEXT_PUBLIC_PARA_API_KEY}
         - NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=${NEXT_PUBLIC_NFT_CONTRACT_ADDRESS}
         - NEXT_PUBLIC_USDX_CONTRACT_ADDRESS=${NEXT_PUBLIC_USDX_CONTRACT_ADDRESS}
         - NEXT_PUBLIC_WAIFU_CONTRACT_ADDRESS=${NEXT_PUBLIC_WAIFU_CONTRACT_ADDRESS}
         - NEXT_PUBLIC_BLOCKVISION_API_KEY=${NEXT_PUBLIC_BLOCKVISION_API_KEY}
       restart: unless-stopped
   ```

3. **Deployment Commands**
   ```bash
   # Build and run
   docker-compose up -d
   
   # Update deployment
   docker-compose pull && docker-compose up -d
   ```

## 🔄 CI/CD Pipelines

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Build
        run: npm run build
        working-directory: ./apps/web

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./apps/web
```

### GitLab CI/CD

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

test:
  stage: test
  image: node:$NODE_VERSION
  cache:
    paths:
      - node_modules/
  script:
    - npm ci
    - npm run test
    - npm run lint
    - npm run type-check
  only:
    - merge_requests
    - main

build:
  stage: build
  image: node:$NODE_VERSION
  script:
    - cd apps/web
    - npm ci
    - npm run build
  artifacts:
    paths:
      - apps/web/.next/
    expire_in: 1 hour
  only:
    - main

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache curl
    - curl -X POST $DEPLOY_WEBHOOK_URL
  only:
    - main
```

## 🏗️ Infrastructure as Code

### Terraform (AWS)

```hcl
# infrastructure/main.tf
provider "aws" {
  region = var.aws_region
}

# S3 bucket for static assets
resource "aws_s3_bucket" "static_assets" {
  bucket = "${var.project_name}-static-assets"
}

# CloudFront distribution
resource "aws_cloudfront_distribution" "main" {
  origin {
    domain_name = aws_s3_bucket.static_assets.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.static_assets.id}"
    
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }
  
  enabled             = true
  default_root_object = "index.html"
  
  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${aws_s3_bucket.static_assets.id}"
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
    
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }
  
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  
  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
```

## 📊 Monitoring and Analytics

### Application Monitoring

1. **Sentry Integration**
   ```typescript
   // apps/web/src/lib/sentry.ts
   import * as Sentry from "@sentry/nextjs"
   
   Sentry.init({
     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
     environment: process.env.NODE_ENV,
   })
   ```

2. **Web Analytics**
   ```typescript
   // apps/web/src/lib/analytics.ts
   import { Analytics } from '@vercel/analytics/react'
   
   export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
     return (
       <>
         {children}
         <Analytics />
       </>
     )
   }
   ```

3. **Performance Monitoring**
   ```typescript
   // apps/web/src/lib/performance.ts
   export function reportWebVitals(metric: any) {
     if (process.env.NODE_ENV === 'production') {
       console.log(metric)
       // Send to analytics service
     }
   }
   ```

## 🔒 Security Configuration

### Security Headers

```typescript
// apps/web/next.config.ts
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
```

## 🚨 Troubleshooting

### Common Deployment Issues

1. **Build Failures**
   ```bash
   # Clear all caches (from root)
   pnpm clean
   rm -rf node_modules apps/web/node_modules pnpm-lock.yaml
   pnpm install
   pnpm build:web
   
   # Or from apps/web directory
   cd apps/web
   pnpm clean
   rm -rf node_modules .next
   pnpm install
   pnpm build
   ```

2. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names (case-sensitive)
   - Verify values don't contain special characters

3. **Memory Issues**
   ```bash
   # Increase Node.js memory limit
   NODE_OPTIONS="--max-old-space-size=4096" npm run build
   ```

4. **Dependency Conflicts**
   ```bash
   # Check for dependency issues (from root)
   pnpm audit
   pnpm audit --fix
   
   # Or from specific app
   cd apps/web
   pnpm audit
   pnpm audit --fix
   ```

### Platform-specific Issues

**Vercel:**
- Check function timeout limits
- Verify output directory configuration
- Review build logs in dashboard

**Netlify:**
- Check build command execution
- Verify publish directory
- Review deploy logs

**Docker:**
- Check container resource limits
- Verify port mapping
- Review container logs

## 📈 Performance Optimization

### Build Optimization

```typescript
// apps/web/next.config.ts
module.exports = {
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons'],
  },
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks.chunks = 'all'
    }
    return config
  },
}
```

### CDN Configuration

```typescript
// Static asset optimization
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  images: {
    domains: ['raw.githubusercontent.com'],
    formats: ['image/webp', 'image/avif'],
  },
})
```

## 📋 Deployment Checklist

### Pre-deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Build process successful
- [ ] Security headers implemented
- [ ] Performance optimized
- [ ] Error tracking configured

### Post-deployment
- [ ] Site accessibility verified
- [ ] SSL certificate active
- [ ] Analytics tracking working
- [ ] Error monitoring active
- [ ] Performance metrics baseline established
- [ ] Backup strategy implemented

### Maintenance
- [ ] Regular dependency updates
- [ ] Security patch monitoring
- [ ] Performance monitoring
- [ ] Error log review
- [ ] Analytics review
- [ ] User feedback collection

---

For additional help, consult the platform-specific documentation or reach out to the development team. 