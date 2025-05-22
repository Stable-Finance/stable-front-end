"use client"
// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WagmiProvider } from 'wagmi'
import { config } from "@/config";
import { Toaster } from "react-hot-toast";
import { ParaProviders } from "@/components/providers/ParaProviders";

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
    <html lang="en">
      <head>
        <title>Stable Protocol - Decentralized Real Estate Finance</title>
        <meta name="description" content="Property-backed lending protocol on Monad" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300`}>
        <WagmiProvider config={config}>
          <ParaProviders>
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                style: {
                  background: '#fef3c7',
                  color: '#92400e',
                  border: '1px solid #f59e0b',
                },
              }}
            />
            {children}
          </ParaProviders>
        </WagmiProvider>
      </body>
    </html>
  );
}
