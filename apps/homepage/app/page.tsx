import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"
import { HowItWorks } from "@/components/how-it-works"
import { TokenCard } from "@/components/token-card"
import { WaitlistForm } from "@/components/waitlist-form"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
        <HowItWorks />

        <section className="py-20 bg-gradient-to-b from-amber-50/50 to-white dark:from-slate-900/50 dark:to-slate-900">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="space-y-4">
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-amber-500/10 text-amber-600 mb-4">
                    USDX TOKEN
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-500">
                    The USDX Advantage
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Our real estate stablecoin offers unique benefits for both investors and property owners.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-green-500/10 p-1 text-green-500 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-check"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Asset-Backed Stability</h3>
                        <p className="text-sm text-muted-foreground">
                          Unlike volatile cryptocurrencies, USDX is backed by real-world real estate assets.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-green-500/10 p-1 text-green-500 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-check"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Fractional Ownership</h3>
                        <p className="text-sm text-muted-foreground">
                          Invest in real estate with lower capital requirements through tokenization.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-green-500/10 p-1 text-green-500 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-check"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Transparent Governance</h3>
                        <p className="text-sm text-muted-foreground">
                          Clear rules and protocols ensure fair and transparent operations.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative h-[400px] w-full rounded-lg overflow-hidden flex items-center justify-center">
                  <TokenCard />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30" id="waitlist">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-amber-500/10 text-amber-600 mb-4">
                EARLY ACCESS
              </div>
              <h2 className="text-3xl font-bold tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-500">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground max-w-[700px] mx-auto">
                Join the waitlist to be among the first to access USDX and the Stable platform
              </p>
            </div>
            <WaitlistForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
