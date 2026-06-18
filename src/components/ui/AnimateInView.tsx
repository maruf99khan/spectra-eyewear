"use client"

import { ReactNode } from "react"

interface AnimateInViewProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export function AnimateInView({ children, className = "" }: AnimateInViewProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
