'use client'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function TestnetPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader />
      <main className='flex-1 flex items-center justify-center'>
        <Button
          className='bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 gap-2 px-8 py-4 text-lg font-semibold rounded-lg'
          onClick={() => window.location.href = 'https://app.trystable.co'}
        >
          Launch Testnet
        </Button>
      </main>
      <SiteFooter />
    </div>
  )
}
