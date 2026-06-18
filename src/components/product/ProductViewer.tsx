"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { useCustomizerStore } from "@/store/customizer"
import { RotateCw, Maximize2 } from "lucide-react"

const Scene = dynamic(() => import("@/components/threed/Scene").then((m) => ({ default: m.Scene })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border border-accent/30 rounded-full shimmer" />
    </div>
  ),
})

interface ProductViewerProps {
  colors: { name: string; hex: string }[]
  selectedColor: string
  onColorChange: (color: string) => void
}

export function ProductViewer({ colors, selectedColor, onColorChange }: ProductViewerProps) {
  const { autoRotate, toggleAutoRotate } = useCustomizerStore()
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <div className={`relative ${isFullscreen ? "fixed inset-0 z-50" : "aspect-[4/5] w-full rounded-2xl overflow-hidden"}`}>
      <div className="absolute inset-0 bg-bg-primary">
        <Scene
          className="w-full h-full"
          cameraPosition={[0, 0, 3]}
          floatSpeed={0}
          accentColor={selectedColor}
        />
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          {colors.map((color) => (
            <button
              key={color.hex}
              onClick={() => onColorChange(color.hex)}
              className={`w-7 h-7 rounded-full transition-all duration-200 ${
                selectedColor === color.hex
                  ? "ring-2 ring-accent ring-offset-2 ring-offset-bg-primary scale-110"
                  : "ring-1 ring-white/20 hover:ring-white/40"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAutoRotate}
            className={`p-2 rounded-lg glass transition-colors ${
              autoRotate ? "text-accent" : "text-text-muted"
            }`}
            title={autoRotate ? "Stop rotation" : "Auto rotate"}
          >
            <RotateCw size={16} />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg glass text-text-muted hover:text-text-primary transition-colors"
            title="Fullscreen"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
