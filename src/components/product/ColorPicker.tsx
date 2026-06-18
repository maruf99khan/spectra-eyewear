"use client"

import { ProductColor } from "@/types"

interface ColorPickerProps {
  colors: ProductColor[]
  selectedColor: ProductColor
  onSelect: (color: ProductColor) => void
}

export function ColorPicker({ colors, selectedColor, onSelect }: ColorPickerProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wider text-text-muted font-medium">Color</span>
        <span className="text-xs text-text-secondary">{selectedColor.name}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.hex}
            onClick={() => onSelect(color)}
            className={`w-8 h-8 rounded-full transition-all duration-200 ${
              selectedColor.hex === color.hex
                ? "ring-2 ring-accent ring-offset-2 ring-offset-bg-primary scale-110"
                : "ring-1 ring-white/10 hover:ring-white/30"
            }`}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  )
}
