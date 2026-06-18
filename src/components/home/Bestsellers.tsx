"use client"

import { products } from "@/data/products"
import { ProductCard } from "@/components/product/ProductCard"

export function Bestsellers() {
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4)

  return (
    <section className="py-24 md:py-32 bg-surface/50">
      <div className="container-main">
        <div className="mb-12">
          <p className="text-text-muted text-xs uppercase tracking-[0.2em] font-medium mb-3">Most Loved</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-text-primary">Bestsellers</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {bestsellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
