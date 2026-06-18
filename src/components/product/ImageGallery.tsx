"use client"

import { useState, useRef } from "react"
import { ImageZoom } from "@/components/ui/ImageZoom"

interface ImageGalleryProps {
  images: string[]
  productName: string
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selected, setSelected] = useState(0)
  const thumbRowRef = useRef<HTMLDivElement>(null)

  if (images.length === 0) return null

  return (
    <div>
      <div className="aspect-[4/5] border border-border overflow-hidden bg-surface-light">
        <ImageZoom src={images[selected]} alt={`${productName} ${selected + 1}`} className="w-full h-full" />
      </div>

      {images.length > 1 && (
        <div
          ref={thumbRowRef}
          className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-thin"
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-20 h-20 flex-shrink-0 border overflow-hidden bg-surface-light transition-all ${
                selected === i ? "border-text-primary" : "border-border hover:border-text-muted"
              }`}
            >
              <img src={img} alt={`${productName} ${i + 1}`} className="w-full h-full object-cover" draggable={false} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
