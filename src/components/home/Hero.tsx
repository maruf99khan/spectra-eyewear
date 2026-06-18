"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,0,0,0.02)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,0,0,0.015)_0%,transparent_60%)]" />
      <div className="absolute top-20 right-1/4 w-64 h-64 bg-black/[0.015] rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-black/[0.01] rounded-full blur-3xl" />

      <div className="container-main w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          <div className={`py-20 lg:py-0 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="section-label mb-6">
              Summer Collection 2026
            </p>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.92] tracking-tight text-text-primary mb-6 text-balance">
              See the World
              <br />
              <span className="text-text-muted italic">Through New Eyes</span>
            </h1>

            <p className="text-text-secondary text-base sm:text-lg max-w-md mb-10 leading-relaxed">
              Precision-crafted eyewear for the discerning. Each frame engineered for clarity, designed for impact.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/collections/all"
                className="btn btn-primary text-sm px-10 py-3.5"
              >
                Shop the Collection
              </Link>
              <Link
                href="/collections/sunglasses"
                className="btn btn-secondary text-sm px-10 py-3.5"
              >
                View Sunglasses
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-border/50">
              <div>
                <p className="text-2xl font-heading font-bold text-text-primary">25+</p>
                <p className="text-xs text-text-muted tracking-wide">Years Crafting</p>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-text-primary">10K+</p>
                <p className="text-xs text-text-muted tracking-wide">Frames Designed</p>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-text-primary">50K+</p>
                <p className="text-xs text-text-muted tracking-wide">Happy Customers</p>
              </div>
            </div>
          </div>

          <div className={`relative aspect-[4/5] w-full max-w-lg mx-auto lg:max-w-none transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px]">
              <div className="absolute -inset-4 bg-gradient-to-br from-black/[0.02] to-transparent rounded-lg" />
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/hero-product.jpg"
                  alt="Spectra eyewear"
                  fill
                  className="object-cover transition-transform duration-[800ms] hover:scale-[1.02]"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
