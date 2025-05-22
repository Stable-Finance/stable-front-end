"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function Logo() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <motion.div
      className="flex items-center justify-center h-10 w-10 relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src="/usdx_default_icon.png"
        alt="Stable Finance Logo"
        width={40}
        height={40}
        className="object-contain"
      />
    </motion.div>
  )
}
