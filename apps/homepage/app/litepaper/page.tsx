import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function LitepaperPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-amber-500/10 text-amber-600">
                <span>USDX Litepaper</span>
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  USDX: The Real Estate Stablecoin
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  A comprehensive overview of the USDX platform and tokenomics
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="gap-2 bg-amber-500 hover:bg-amber-600 text-white">
                  <FileText className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-8 text-left">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">1. Introduction</h2>
                <p className="text-muted-foreground">
                  USDX is a stablecoin backed by real estate assets, designed to bridge the gap between traditional real
                  estate investment and the digital economy. By tokenizing real estate equity, USDX provides liquidity
                  to property owners while offering investors exposure to the stability of real estate markets with the
                  flexibility of digital assets.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">2. Market Problem</h2>
                <p className="text-muted-foreground">
                  Real estate, while a historically stable asset class, suffers from illiquidity, high barriers to
                  entry, and complex management requirements. Meanwhile, the cryptocurrency market offers liquidity and
                  accessibility but is plagued by volatility and often lacks intrinsic value backing.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">3. The USDX Solution</h2>
                <p className="text-muted-foreground">
                  USDX addresses these challenges by creating a stablecoin that is:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Backed 1:1 by real estate equity</li>
                  <li>Fully transparent and auditable</li>
                  <li>Liquid and easily transferable</li>
                  <li>Accessible to investors of all sizes</li>
                  <li>Governed by clear protocols and smart contracts</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">4. Technical Architecture</h2>
                <p className="text-muted-foreground">
                  The USDX platform is built on a secure blockchain infrastructure that ensures transparency,
                  immutability, and efficiency. Smart contracts govern the issuance, redemption, and transfer of USDX
                  tokens, while a robust oracle system provides real-time valuation of the underlying real estate
                  assets.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">5. Tokenomics</h2>
                <p className="text-muted-foreground">
                  USDX maintains a stable value through a combination of real estate backing and algorithmic mechanisms.
                  The token supply expands and contracts based on market demand, with new tokens minted only when backed
                  by additional real estate equity. Yield generated from the underlying properties is distributed to
                  token holders proportionally.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">6. Governance</h2>
                <p className="text-muted-foreground">
                  The USDX platform employs a decentralized governance model that allows stakeholders to participate in
                  key decisions regarding protocol upgrades, asset management, and fee structures. This ensures the
                  platform remains responsive to user needs while maintaining stability and security.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">7. Roadmap</h2>
                <p className="text-muted-foreground">
                  The USDX development roadmap outlines our path from initial concept to full-scale implementation,
                  including key milestones such as testnet launch, mainnet deployment, exchange listings, and expansion
                  into additional real estate markets.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">8. Team</h2>
                <p className="text-muted-foreground">
                  USDX is developed by Stable, a team of experienced professionals with backgrounds in real estate,
                  finance, blockchain technology, and software development. Our combined expertise enables us to
                  navigate the complex intersection of traditional finance and emerging digital asset ecosystems.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">9. Conclusion</h2>
                <p className="text-muted-foreground">
                  USDX represents a significant innovation in both the real estate and cryptocurrency sectors, offering
                  a stable, asset-backed digital currency that provides benefits to property owners and investors alike.
                  Through our platform, we aim to unlock the value of real estate assets and make them accessible to a
                  global audience.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <Link href="/">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
