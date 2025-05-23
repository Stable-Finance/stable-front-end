"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Logo } from "@/components/logo"

export function SiteFooter() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <footer className="border-t py-12 md:py-16 bg-gradient-to-b from-transparent to-muted/30">
      <motion.div
        className="container grid grid-cols-2 gap-8 md:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="flex flex-col gap-2" variants={itemVariants}>
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-bold">STABLE</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Erasing the line between assets and liquidity.</p>
          <div className="flex gap-4 mt-4">
            <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-twitter"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://discord.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-message-circle"
              >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
              <span className="sr-only">Discord</span>
            </Link>
          </div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h3 className="font-medium mb-3">Product</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/usdx" className="text-muted-foreground hover:text-foreground transition-colors">
                USDX
              </Link>
            </li>
            <li>
              <Link href="/testnet" className="text-muted-foreground hover:text-foreground transition-colors">
                Testnet
              </Link>
            </li>
            <li>
              <Link href="/litepaper" className="text-muted-foreground hover:text-foreground transition-colors">
                Litepaper
              </Link>
            </li>
            <li>
              <Link href="/roadmap" className="text-muted-foreground hover:text-foreground transition-colors">
                Roadmap
              </Link>
            </li>
          </ul>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h3 className="font-medium mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/team" className="text-muted-foreground hover:text-foreground transition-colors">
                Team
              </Link>
            </li>
            <li>
              <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h3 className="font-medium mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </motion.div>
      </motion.div>
      <motion.div
        className="container mt-8 pt-8 border-t"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Stable Finance. All rights reserved.
        </p>
      <p className="text-center text-sm text-muted-foreground mt-2">
        Developed By Ayaan Kaifullah, <a href="https://github.com/ayaan2907" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">github.com/ayaan2907</a>
      </p>
      </motion.div>
    </footer>
  )
}
