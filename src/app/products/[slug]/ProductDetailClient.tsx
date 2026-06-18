"use client"

import { useState, useMemo } from "react"
import Link from "next/link"

import { Check, Truck, Shield, RotateCcw } from "lucide-react"
import { Product } from "@/types"
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/store/cart"
import { useWishlistStore } from "@/store/wishlist"
import { useToastStore } from "@/store/toast"
import { ColorPicker } from "@/components/product/ColorPicker"
import { SizeSelector } from "@/components/product/SizeSelector"
import { ProductTabs } from "@/components/product/ProductTabs"
import { Button } from "@/components/ui/Button"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { ImageGallery } from "@/components/product/ImageGallery"
import { ProductCard } from "@/components/product/ProductCard"
import { products } from "@/data/products"

export function ProductDetailClient({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const { addItem } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()
  const { addToast } = useToastStore()

  const inWishlist = isInWishlist(product.id)

  const relatedProducts = useMemo(
    () => products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4),
    [product.category, product.id]
  )

  const tabs = [
    {
      label: "Details",
      content: (
        <div className="space-y-4">
          <p>{product.description}</p>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(product.details).map(([key, value]) => (
              <div key={key} className="glass rounded-xl px-4 py-3">
                <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p className="text-sm font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: "Features",
      content: (
        <ul className="space-y-3">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <Check size={14} className="text-accent flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: "Shipping & Returns",
      content: (
        <div className="space-y-4">
          <div className="flex gap-3">
            <Truck size={18} className="text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium mb-1">Free Shipping</p>
              <p className="text-sm text-text-muted">On all orders over $200. Estimated delivery 3-5 business days.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <RotateCcw size={18} className="text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium mb-1">30-Day Returns</p>
              <p className="text-sm text-text-muted">Not loving them? Return within 30 days for a full refund.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Shield size={18} className="text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium mb-1">2-Year Warranty</p>
              <p className="text-sm text-text-muted">Every frame comes with our comprehensive warranty coverage.</p>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="pt-20 md:pt-24">
      <div className="container-main">
          <Breadcrumbs crumbs={[
            { label: "Products", href: "/search" },
            { label: product.category, href: `/collections/${product.collection}` },
            { label: product.name },
          ]} />

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-20">
          <div>
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          <div className="flex flex-col">
            <div className="space-y-2 mb-6">
              <p className="text-xs uppercase tracking-wider text-accent font-medium">
                {product.collection}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold font-heading">{product.name}</h1>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-accent">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-text-muted line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <ColorPicker
                colors={product.colors}
                selectedColor={selectedColor}
                onSelect={setSelectedColor}
              />
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSelect={setSelectedSize}
              />
            </div>

            <div className="flex items-center gap-3 mb-8">
              <Button
                size="lg"
                className="flex-1"
                onClick={() => addItem(product, selectedColor, selectedSize)}
                disabled={product.isSoldOut}
              >
                {product.isSoldOut ? "Sold Out" : "Add to Cart"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-4"
                onClick={() => {
                  toggleItem(product)
                  addToast(inWishlist ? "Removed from wishlist" : "Added to wishlist", "info")
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </Button>
            </div>

            <div className="flex items-center gap-4 text-xs text-text-muted mb-8">
              <span className="flex items-center gap-1.5">
                <Truck size={14} /> Free Shipping
              </span>
              <span className="flex items-center gap-1.5">
                <RotateCcw size={14} /> 30-Day Returns
              </span>
              <span className="flex items-center gap-1.5">
                <Shield size={14} /> 2-Year Warranty
              </span>
            </div>

            <ProductTabs tabs={tabs} />
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="pb-20">
            <h2 className="text-xl font-bold font-heading mb-8">Complete Your Look</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
