"use client"

import { ProductSize } from "@/types"

interface SizeSelectorProps {
  sizes: ProductSize[]
  selectedSize: ProductSize
  onSelect: (size: ProductSize) => void
}

export function SizeSelector({ sizes, selectedSize, onSelect }: SizeSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wider text-text-muted font-medium">Size</span>
        <span className="text-xs text-text-secondary">{selectedSize.label}</span>
      </div>
      <div className="flex gap-2">
        {sizes.map((size) => (
          <button
            key={size.value}
            onClick={() => onSelect(size)}
            className={`px-5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
              selectedSize.value === size.value
                ? "bg-accent text-bg-primary"
                : "glass glass-hover text-text-secondary"
            }`}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  )
}
