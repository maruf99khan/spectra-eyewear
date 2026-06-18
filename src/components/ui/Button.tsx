"use client"

import { forwardRef, ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:pointer-events-none"

    const variants = {
      primary: "bg-accent text-bg-primary hover:bg-accent-light active:bg-accent-dark",
      secondary: "glass glass-hover text-text-primary",
      ghost: "text-text-secondary hover:text-text-primary hover:bg-white/5",
      outline: "border border-border text-text-primary hover:bg-white/5 hover:border-border-hover",
    }

    const sizes = {
      sm: "px-3 py-1.5 text-xs gap-1.5",
      md: "px-5 py-2.5 text-sm gap-2",
      lg: "px-8 py-3 text-base gap-2",
    }

    return (
      <button ref={ref} type="button" className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
