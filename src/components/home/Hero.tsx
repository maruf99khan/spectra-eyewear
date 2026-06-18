"use client"

import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-bg-primary">
      <div className="container-main w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          <div className="py-20 lg:py-0">
            <p className="text-text-muted text-xs uppercase tracking-[0.2em] font-medium mb-5">
              Summer Collection 2026
            </p>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.95] tracking-tight text-text-primary mb-6">
              See the World
              <br />
              <span className="text-text-muted">Through New Eyes</span>
            </h1>

            <p className="text-text-secondary text-base sm:text-lg max-w-md mb-10 leading-relaxed">
              Precision-crafted eyewear for the discerning. Each frame engineered for clarity, designed for impact.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/collections/all"
                className="btn btn-primary text-sm px-8 py-3"
              >
                Shop the Collection
              </Link>
              <Link
                href="/collections/sunglasses"
                className="btn btn-secondary text-sm px-8 py-3"
              >
                View Sunglasses
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/5] w-full max-w-lg mx-auto lg:max-w-none"
          >
            <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px] bg-surface-light">
              <Image
                src="/images/hero-product.jpg"
                alt="Spectra eyewear"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
