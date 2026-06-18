"use client"

import { SHAPE_OPTIONS, MATERIAL_OPTIONS, PRICE_RANGES } from "@/lib/constants"

interface FilterSidebarProps {
  categories: string[]
  cat: string
  shape: string
  mat: string
  price: string
  hasActiveFilters: boolean
  updateParam: (key: string, value: string) => void
  clearFilters: () => void
}

export function FilterSidebar({ categories, cat, shape, mat, price, hasActiveFilters, updateParam, clearFilters }: FilterSidebarProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">Category</h3>
        <div className="space-y-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => updateParam("category", c)}
              className={`block text-sm w-full text-left py-1 transition-colors ${
                (c === "All" && !cat) || cat === c
                  ? "text-text-primary font-medium"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">Shape</h3>
        <div className="space-y-1.5">
          {SHAPE_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => updateParam("shape", s === "All" ? "" : s)}
              className={`block text-sm w-full text-left py-1 transition-colors ${
                (!shape && s === "All") || shape === s
                  ? "text-text-primary font-medium"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">Material</h3>
        <div className="space-y-1.5">
          {MATERIAL_OPTIONS.map((m) => (
            <button
              key={m}
              onClick={() => updateParam("material", m === "All" ? "" : m)}
              className={`block text-sm w-full text-left py-1 transition-colors ${
                (!mat && m === "All") || mat === m
                  ? "text-text-primary font-medium"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">Price Range</h3>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((r) => (
            <button
              key={r.label}
              onClick={() => updateParam("price", r.label === "All" ? "" : r.label)}
              className={`block text-sm w-full text-left py-1 transition-colors ${
                (!price && r.label === "All") || price === r.label
                  ? "text-text-primary font-medium"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-xs text-text-muted underline underline-offset-4 hover:text-text-primary transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}
