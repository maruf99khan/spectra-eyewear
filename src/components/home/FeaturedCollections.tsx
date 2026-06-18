"use client"

import Link from "next/link"
import Image from "next/image"
import { collections } from "@/data/collections"
import { ArrowRight } from "lucide-react"

const featured = collections.slice(0, 3)

export function FeaturedCollections() {
  return (
    <section className="py-24 md:py-32 bg-bg-primary">
      <div className="container-main">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label mb-4">Curated</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-text-primary text-balance">Featured Collections</h2>
          </div>
          <Link
            href="/collections/all"
            className="hidden sm:flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-all duration-200 group"
          >
            View All <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((collection, i) => (
            <div key={collection.id} className="group">
              <Link href={`/collections/${collection.slug}`} className="block">
                <div className="relative aspect-[4/5] bg-surface-light overflow-hidden border border-border/50 card-shadow">
                  <div className="absolute inset-0 flex items-center justify-center text-text-muted group-hover:scale-105 transition-transform duration-700">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-500">
                      <circle cx="6" cy="15" r="4"/>
                      <circle cx="18" cy="15" r="4"/>
                      <path d="M14 15a2 2 0 0 0-4 0"/>
                      <path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2"/>
                      <path d="M21.5 13 19 7c-.7-1.3-1.4-2-3-2"/>
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-white via-white/80 to-transparent">
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-text-primary mb-1.5">{collection.name}</h3>
                    <p className="text-sm text-text-secondary mb-4">{collection.productCount} styles</p>
                    <span className="inline-flex items-center gap-1.5 text-xs text-text-primary font-medium uppercase tracking-wider link-underline">
                      Shop Now
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            View All Collections <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
