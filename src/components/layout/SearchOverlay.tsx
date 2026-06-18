"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, ArrowRight } from "lucide-react"
import { products } from "@/data/products"
import { useUIStore } from "@/store/ui"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"

export function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUIStore()
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery("")
    }
  }, [isSearchOpen])

  const results = query.length > 0
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.collection.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <>
      {isSearchOpen && <div className="fixed inset-0 bg-black/40 z-[70]" onClick={closeSearch} />}
      {isSearchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
          className="fixed top-0 left-0 right-0 z-[80] glass-strong border-b border-border/50"
        >
            <div className="container-main py-4">
              <div className="flex items-center gap-3 bg-surface-light border border-border px-5 py-3 focus-within:border-text-primary transition-colors">
                <Search size={18} className="text-text-muted flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search frames, collections, styles..."
                  aria-label="Search products"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-muted focus:outline-none"
                />
                <button onClick={closeSearch} aria-label="Close search" className="p-1 text-text-muted hover:text-text-primary">
                  <X size={18} />
                </button>
              </div>

              {query && (
                  <div className="overflow-hidden">
                    <div className="pt-4 space-y-1">
                      {results.length === 0 ? (
                        <p className="text-sm text-text-muted py-6 text-center">
                          No results for &ldquo;{query}&rdquo;
                        </p>
                      ) : (
                        <>
                          {results.slice(0, 5).map((product) => (
                            <Link
                              key={product.id}
                              href={`/products/${product.slug}`}
                              onClick={closeSearch}
                              className="flex items-center gap-4 px-3 py-3 hover:bg-surface-light transition-colors group"
                            >
                              <div className="w-12 h-12 border border-border bg-surface-light flex items-center justify-center flex-shrink-0">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-text-muted">
                                  <circle cx="6" cy="15" r="4"/>
                                  <circle cx="18" cy="15" r="4"/>
                                  <path d="M14 15a2 2 0 0 0-4 0"/>
                                </svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate group-hover:text-text-primary transition-colors">{product.name}</p>
                                <p className="text-xs text-text-muted">{product.collection} · {product.category}</p>
                              </div>
                              <span className="text-sm text-text-primary font-medium">{formatPrice(product.price)}</span>
                              <ArrowRight size={14} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          ))}
                          <Link
                            href={`/search?q=${encodeURIComponent(query)}`}
                            onClick={closeSearch}
                            className="block text-center text-xs text-text-muted hover:text-text-primary py-3 border-t border-border mt-1 transition-colors"
                          >
                            View all {results.length} results →
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
      )}
    </>
  )
}
