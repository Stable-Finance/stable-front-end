"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {PrivyProvider} from '@privy-io/react-auth';
import { monadTestnet } from "wagmi/chains";
import { WagmiProvider } from 'wagmi'
import { config } from "@/config";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient()


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider
          appId="cm855xmfe00z0148t5ygglc1q"
          config={{
            appearance: {
              theme: 'light',
              accentColor: '#c89116',
              logo: 'https://raw.githubusercontent.com/Stable-Finance/branding/refs/heads/main/token_icons/resized_icons/256x256_stable_coin_icon_gold.png',
            },
            // Create embedded wallets for users who don't have a wallet
            embeddedWallets: {
              createOnLogin: 'users-without-wallets',
            },
            defaultChain: monadTestnet,
            supportedChains: [monadTestnet]
          }}
        >
          <html lang="en">
            <head>
              <title>Stable Protocol</title>
            </head>
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
              <Toaster
                position="top-center"
                reverseOrder={false}
              />
              {children}
            </body>
          </html>
        </PrivyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
