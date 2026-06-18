"use client"

import { useRef, useState } from "react"

interface ImageZoomProps {
  src: string
  alt: string
  className?: string
}

export function ImageZoom({ src, alt, className = "" }: ImageZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [bgPos, setBgPos] = useState("50% 50%")
  const [showZoom, setShowZoom] = useState(false)

  const handleMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setBgPos(`${x}% ${y}%`)
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-crosshair ${className}`}
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      onMouseMove={handleMove}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" draggable={false} />
      {showZoom && (
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "200%",
            backgroundPosition: bgPos,
            backgroundRepeat: "no-repeat",
            pointerEvents: "none" as const,
          }}
        />
      )}
    </div>
  )
}
