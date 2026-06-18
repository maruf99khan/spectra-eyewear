"use client"

import { Minus, Plus, Trash2 } from "lucide-react"

interface QuantitySelectorProps {
  quantity: number
  onDecrement: () => void
  onIncrement: () => void
  onRemove?: () => void
  size?: "sm" | "md"
}

export function QuantitySelector({ quantity, onDecrement, onIncrement, onRemove, size = "md" }: QuantitySelectorProps) {
  const btnClass = size === "sm"
    ? "w-6 h-6 text-[10px]"
    : "w-8 h-8 text-xs"

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={onDecrement}
        className={`${btnClass} border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-text-muted transition-colors`}
        aria-label="Decrease quantity"
      >
        {quantity === 1 && onRemove ? <Trash2 size={size === "sm" ? 10 : 12} /> : <Minus size={size === "sm" ? 10 : 12} />}
      </button>
      <div className={`${size === "sm" ? "w-7" : "w-10"} text-center relative`}>
        <span className={`block font-medium ${size === "sm" ? "text-xs" : "text-sm"}`}>
          {quantity}
        </span>
      </div>
      <button
        onClick={onIncrement}
        className={`${btnClass} border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-text-muted transition-colors`}
        aria-label="Increase quantity"
      >
        <Plus size={size === "sm" ? 10 : 12} />
      </button>
    </div>
  )
}
