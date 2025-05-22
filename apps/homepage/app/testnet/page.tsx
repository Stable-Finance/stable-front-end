import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"

export default function TestnetPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-amber-500/10 text-amber-600">
                <span>BETA ACCESS</span>
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">USDX Testnet</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Experience the future of real estate stablecoins in our test environment
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl">
              <AnimatedGradientBorder gradientClassName="from-amber-300 via-amber-500 to-amber-400" className="w-full">
                <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Testnet Access</CardTitle>
                    <CardDescription>
                      Our testnet provides a safe environment to explore USDX functionality
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">What you can do on the testnet:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-amber-500/10 p-1 text-amber-500 mt-0.5">
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
                          <span>Create a test wallet and receive test USDX tokens</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-amber-500/10 p-1 text-amber-500 mt-0.5">
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
                          <span>Explore simulated real estate investments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-amber-500/10 p-1 text-amber-500 mt-0.5">
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
                          <span>Test token transfers and yield distribution</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-amber-500/10 p-1 text-amber-500 mt-0.5">
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
                          <span>Provide feedback to help us improve the platform</span>
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>Note:</strong> The testnet uses test tokens with no real-world value. All transactions
                        are simulated and do not involve real assets or currency.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 gap-2">
                      Launch Testnet
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </AnimatedGradientBorder>
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-bold">Testnet Documentation</h3>
                <p className="text-muted-foreground">
                  To help you get started with the USDX testnet, we've prepared comprehensive documentation covering all
                  aspects of the platform.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Getting Started Guide</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Learn how to set up your wallet and receive test tokens
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Read Guide
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">API Documentation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Technical documentation for developers integrating with USDX
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        View Docs
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
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
