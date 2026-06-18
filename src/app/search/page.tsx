"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react"
import { products } from "@/data/products"
import { SHAPE_OPTIONS, MATERIAL_OPTIONS, PRICE_RANGES, SORT_OPTIONS } from "@/lib/constants"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { FilterSheet } from "@/components/ui/FilterSheet"
import { FilterSidebar } from "@/components/ui/FilterSidebar"
import { formatPrice } from "@/lib/utils"
import { ProductCardSkeleton } from "@/components/ui/ProductCardSkeleton"


export default function SearchPage() {
  const [isLoading, setIsLoading] = useState(false)
  const loadingTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)
  const searchParams = useSearchParams()
  const router = useRouter()
  const q = searchParams.get("q") ?? ""
  const cat = searchParams.get("category") ?? ""
  const shape = searchParams.get("shape") ?? ""
  const mat = searchParams.get("material") ?? ""
  const price = searchParams.get("price") ?? ""
  const sort = searchParams.get("sort") ?? "newest"

  const [localQuery, setLocalQuery] = useState(q)
  const [showFilters, setShowFilters] = useState(false)

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category))
    return ["All", ...Array.from(set)]
  }, [])

  const filtered = useMemo(() => {
    let result = [...products]

    if (q) {
      const query = q.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.collection.toLowerCase().includes(query) ||
          p.material.toLowerCase().includes(query) ||
          p.shape.toLowerCase().includes(query)
      )
    }

    if (cat && cat !== "All") result = result.filter((p) => p.category === cat)
    if (shape) result = result.filter((p) => p.shape === shape)
    if (mat) result = result.filter((p) => p.material === mat)

    if (price) {
      const range = PRICE_RANGES.find((r) => r.label === price)
      if (range) result = result.filter((p) => p.price >= range.min && p.price <= range.max)
    }

    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break
      case "price-desc": result.sort((a, b) => b.price - a.price); break
      case "bestsellers": result.sort((a, b) => (a.isBestseller === b.isBestseller ? 0 : a.isBestseller ? -1 : 1)); break
      default: result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1)); break
    }

    return result
  }, [q, cat, shape, mat, price, sort])

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "All") params.set(key, value)
    else params.delete(key)
    router.push(`/search?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateParam("q", localQuery)
  }

  useEffect(() => {
    if (loadingTimeout.current) clearTimeout(loadingTimeout.current)
    setIsLoading(true)
    loadingTimeout.current = setTimeout(() => setIsLoading(false), 300)
    return () => { if (loadingTimeout.current) clearTimeout(loadingTimeout.current) }
  }, [q, cat, shape, mat, price, sort])

  const hasActiveFilters = !!(cat || shape || mat || price)

  return (
    <div className="pt-20 md:pt-24">
      <div className="container-main py-8 md:py-12">
        <Breadcrumbs crumbs={[
          { label: "Search" },
          ...(q ? [{ label: `&ldquo;${q}&rdquo;` }] : []),
        ]} />
        <form onSubmit={handleSearch} className="relative mb-8 group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-text-primary transition-colors" />
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search frames, collections, styles..."
            className="w-full border border-border pl-12 pr-12 py-3.5 text-sm bg-white outline-none focus:border-text-primary transition-all duration-200"
          />
          {localQuery && (
            <button
              type="button"
              onClick={() => { setLocalQuery(""); router.push("/search") }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-all duration-200 hover:scale-110"
            >
              <X size={16} />
            </button>
          )}
        </form>

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
          <p className="text-xs text-text-muted">
            <span className="font-medium text-text-primary">{filtered.length}</span> {filtered.length === 1 ? "result" : "results"}
            {q && <> for &ldquo;{q}&rdquo;</>}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 text-xs transition-all duration-200 px-3 py-2 rounded-sm ${
                showFilters
                  ? "bg-accent text-white"
                  : "bg-surface hover:bg-surface-hover text-text-secondary"
              }`}
            >
              <SlidersHorizontal size={14} />
              Filters
              {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
            </button>
            <select
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="text-xs border border-border bg-surface px-3 py-2 outline-none focus:border-text-primary transition-all duration-200 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {showFilters && (
            <div className="hidden lg:block lg:col-span-1">
              <FilterSidebar categories={categories} cat={cat} shape={shape} mat={mat} price={price} hasActiveFilters={hasActiveFilters} updateParam={updateParam} clearFilters={clearFilters} />
            </div>
          )}

          <FilterSheet open={showFilters} onClose={() => setShowFilters(false)} title="Filters">
            <FilterSidebar categories={categories} cat={cat} shape={shape} mat={mat} price={price} hasActiveFilters={hasActiveFilters} updateParam={updateParam} clearFilters={clearFilters} />
          </FilterSheet>

          <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24 max-w-sm mx-auto">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-surface-light border border-border/50 flex items-center justify-center">
                  <Search size={24} className="text-text-muted/40" />
                </div>
                <p className="text-base font-medium text-text-primary mb-1">No results found</p>
                <p className="text-sm text-text-muted mb-8 leading-relaxed">Try adjusting your search or filters to find what you&apos;re looking for</p>
                <button
                  onClick={clearFilters}
                  className="btn btn-primary text-sm px-6 py-2.5"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {filtered.map((product) => (
                    <div key={product.id} className="group">
                      <Link href={`/products/${product.slug}`} className="block">
                        <div className="aspect-[4/5] bg-surface-light border border-border/50 mb-3 flex items-center justify-center text-text-muted/30 overflow-hidden card-shadow">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="group-hover:scale-110 transition-transform duration-500">
                            <circle cx="6" cy="15" r="4"/>
                            <circle cx="18" cy="15" r="4"/>
                            <path d="M14 15a2 2 0 0 0-4 0"/>
                            <path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2"/>
                            <path d="M21.5 13 19 7c-.7-1.3-1.4-2-3-2"/>
                          </svg>
                        </div>
                        <h3 className="text-sm font-medium text-text-primary group-hover:text-text-secondary transition-colors">{product.name}</h3>
                        <p className="text-xs text-text-muted mt-0.5">{product.category}</p>
                        <p className="text-sm font-medium mt-1.5">{formatPrice(product.price)}</p>
                      </Link>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
