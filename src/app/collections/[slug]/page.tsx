"use client"

import { useState, useMemo } from "react"

import { useParams, useSearchParams } from "next/navigation"
import { products } from "@/data/products"
import { collections } from "@/data/collections"
import { ProductCard } from "@/components/product/ProductCard"
import { SHAPE_OPTIONS, MATERIAL_OPTIONS, SORT_OPTIONS } from "@/lib/constants"
import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { FilterSheet } from "@/components/ui/FilterSheet"

export default function CollectionPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string

  const collection = collections.find((c) => c.slug === slug)
  const initialShape = searchParams.get("shape") || "All"
  const initialFeature = searchParams.get("feature") || ""
  const [activeShape, setActiveShape] = useState(
    SHAPE_OPTIONS.includes(initialShape) ? initialShape : "All"
  )
  const [activeMaterial, setActiveMaterial] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = [...products]

    if (slug && slug !== "all") {
      result = result.filter(
        (p) => p.collection === slug || p.category === slug
      )
    }

    if (initialFeature) {
      result = result.filter((p) => p.features.some((f) => f.toLowerCase().includes(initialFeature)))
    }

    if (activeShape !== "All") {
      result = result.filter((p) => p.shape.toLowerCase() === activeShape.toLowerCase())
    }

    if (activeMaterial !== "All") {
      result = result.filter((p) => p.material.toLowerCase() === activeMaterial.toLowerCase())
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "bestsellers":
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0))
        break
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    }

    return result
  }, [slug, activeShape, activeMaterial, sortBy])

  return (
    <div className="pt-20 md:pt-24">
      <div className="container-main">
        <Breadcrumbs crumbs={[
          { label: "Collections", href: "/collections/all" },
          { label: collection?.name || slug },
        ]} />

        <div className="mb-10">
          <p className="text-accent text-xs uppercase tracking-[0.25em] font-medium mb-2">
            {collection ? collection.productCount : products.length} Styles
          </p>
          <h1 className="text-3xl md:text-4xl font-bold font-heading">
            {collection?.name || "All Collections"}
          </h1>
          {collection && (
            <p className="text-sm text-text-muted mt-2 max-w-lg">{collection.description}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          {SHAPE_OPTIONS.map((shape) => (
            <button
              key={shape}
              onClick={() => setActiveShape(shape)}
              className={`px-4 py-2 text-xs rounded-full transition-all ${
                activeShape === shape
                  ? "bg-accent text-bg-primary"
                  : "glass glass-hover text-text-secondary"
              }`}
            >
              {shape}
            </button>
          ))}

          <div className="hidden md:flex items-center gap-3 ml-auto">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value)}
                className={`text-xs transition-colors ${
                  sortBy === opt.value ? "text-accent" : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden p-2.5 rounded-lg glass text-text-muted"
          >
            <SlidersHorizontal size={16} />
          </button>
        </div>

        <FilterSheet open={showFilters} onClose={() => setShowFilters(false)} title="Filters & Sort">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">Material</p>
              <div className="flex flex-wrap gap-2">
                {MATERIAL_OPTIONS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setActiveMaterial(m)}
                    className={`px-3 py-1.5 text-xs border transition-colors ${
                      activeMaterial === m
                        ? "bg-accent text-white border-accent"
                        : "border-border text-text-secondary hover:border-text-muted"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">Sort By</p>
              <div className="flex flex-wrap gap-2">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSortBy(opt.value)}
                    className={`px-3 py-1.5 text-xs border transition-colors ${
                      sortBy === opt.value
                        ? "bg-accent text-white border-accent"
                        : "border-border text-text-secondary hover:border-text-muted"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FilterSheet>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-20">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-muted">No products match your filters.</p>
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => {
                setActiveShape("All")
                setActiveMaterial("All")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
