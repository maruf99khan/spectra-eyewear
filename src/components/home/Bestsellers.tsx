"use client"

import { products } from "@/data/products"
import { ProductCard } from "@/components/product/ProductCard"

export function Bestsellers() {
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4)

  return (
    <section className="py-24 md:py-32 bg-surface relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.01)_0%,transparent_60%)]" />
      <div className="container-main relative z-10">
        <div className="mb-12 md:mb-16">
          <p className="section-label mb-4">Most Loved</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-text-primary text-balance">Bestsellers</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {bestsellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
