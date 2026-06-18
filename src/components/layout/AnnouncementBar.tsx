"use client"

import { X } from "lucide-react"
import { useState } from "react"

const announcements = [
  "300,000+ WEAR SPECTRA",
  "BUY 2, GET 1 FREE",
  "FREE SHIPPING ON ORDERS $50+",
]

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative z-[60] bg-accent text-white text-[11px] tracking-[0.15em] uppercase">
      <div className="container-main flex items-center justify-center h-9">
        <div className="flex items-center gap-8 overflow-hidden">
          {announcements.map((text, i) => (
            <span key={i} className="hidden sm:block">
              {text}
            </span>
          ))}
          <span className="sm:hidden">{announcements[0]}</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 text-white/70 hover:text-white transition-colors"
          aria-label="Dismiss announcement"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
