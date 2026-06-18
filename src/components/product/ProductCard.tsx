"use client"

import Link from "next/link"
import { Product } from "@/types"
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/store/cart"
import { useWishlistStore } from "@/store/wishlist"
import { useToastStore } from "@/store/toast"
import { ShoppingBag, Heart } from "lucide-react"

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()
  const { addToast } = useToastStore()

  const inWishlist = isInWishlist(product.id)

  return (
    <div className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] bg-surface-light border border-border/50 overflow-hidden mb-3 card-shadow">
          <div className="absolute inset-0 bg-gradient-to-t from-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />

          {product.isNew && (
            <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-accent text-white text-[10px] font-semibold uppercase tracking-wider">
              New
            </span>
          )}

          {product.isSoldOut && (
            <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-text-primary text-white text-[10px] font-semibold uppercase tracking-wider">
              Sold Out
            </span>
          )}

          {product.originalPrice && (
            <span className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-accent text-white text-[10px] font-semibold uppercase tracking-wider">
              Sale
            </span>
          )}

          <img
            src={product.images[0] ?? "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            loading="lazy"
          />

          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <button
              onClick={(e) => {
                e.preventDefault()
                addItem(product, product.colors[0], product.sizes[0])
                addToast(`${product.name} added to cart`)
              }}
              disabled={product.isSoldOut}
              className="w-full py-2.5 bg-accent/90 backdrop-blur-sm text-white text-xs font-medium uppercase tracking-wider hover:bg-accent transition-all duration-200 disabled:opacity-50 relative overflow-hidden"
            >
              <span className="relative z-10">Quick Add</span>
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>

          {product.colors.length > 0 && (
            <div className="absolute bottom-3 left-3 flex gap-1.5 transition-all duration-300 group-hover:translate-y-[-52px]">
              {product.colors.slice(0, 4).map((color) => (
                <span
                  key={color.hex}
                  className="w-3.5 h-3.5 rounded-full border border-white/50 ring-1 ring-border/50 transition-transform duration-200 hover:scale-125"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="w-3.5 h-3.5 rounded-full border border-white/50 bg-white/60 backdrop-blur-sm flex items-center justify-center text-[8px] text-text-muted">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>

      <div className="space-y-1.5 px-0.5">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="text-sm text-text-primary hover:text-text-secondary transition-colors leading-snug"
          >
            {product.name}
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault()
              const wasInWishlist = isInWishlist(product.id)
              toggleItem(product)
              addToast(wasInWishlist ? "Removed from wishlist" : "Added to wishlist", "info")
            }}
            className={`shrink-0 p-1 transition-all duration-200 ${
              inWishlist ? "text-accent scale-110" : "text-text-muted hover:text-accent hover:scale-110"
            }`}
          >
            <Heart size={14} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-text-primary">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-text-muted line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  )
}
