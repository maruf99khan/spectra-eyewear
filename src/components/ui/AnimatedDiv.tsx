"use client"

import type { ReactNode } from "react"

interface AnimatedDivProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedDiv({ children, className }: AnimatedDivProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
