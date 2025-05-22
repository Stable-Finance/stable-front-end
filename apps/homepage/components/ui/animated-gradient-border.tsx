"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface AnimatedGradientBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientClassName?: string
  containerClassName?: string
  duration?: number
  borderWidth?: number
  children: React.ReactNode
}

export function AnimatedGradientBorder({
  gradientClassName = "from-amber-400 via-amber-200 to-amber-500",
  containerClassName,
  duration = 8,
  borderWidth = 1,
  children,
  className,
  ...props
}: AnimatedGradientBorderProps) {
  return (
    <div className={cn("relative rounded-lg p-[1px] overflow-hidden", className)} {...props}>
      <div
        className={cn("absolute inset-0 rounded-lg bg-gradient-to-r animate-gradient", gradientClassName)}
        style={{
          backgroundSize: "200% 200%",
          animationDuration: `${duration}s`,
        }}
      />
      <div className={cn("relative rounded-[calc(0.5rem-1px)] bg-background h-full", containerClassName)}>
        {children}
      </div>
    </div>
  )
}
