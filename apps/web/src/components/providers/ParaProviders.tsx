"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Environment, ParaProvider } from "@getpara/react-sdk"
import "@getpara/react-sdk/styles.css"
import { PARA_API_KEY } from "@/constants"

const queryClient = new QueryClient()

export function ParaProviders({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ParaProvider
        paraClientConfig={{
          apiKey: PARA_API_KEY,
          env: Environment.BETA, // Use BETA for testing, PROD for production
        }}
      >
        {children}
      </ParaProvider>
    </QueryClientProvider>
  )
} 