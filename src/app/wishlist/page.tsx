"use client"

import Link from "next/link"
import { Heart, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { useWishlistStore } from "@/store/wishlist"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/Button"

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()

  if (items.length === 0) {
    return (
      <div className="pt-20 md:pt-24">
        <div className="container-main">
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Heart size={64} className="text-text-muted/20 mb-6" />
            <h1 className="text-2xl font-bold font-heading mb-2">Your Wishlist is Empty</h1>
            <p className="text-sm text-text-muted mb-8">Save your favorite frames here.</p>
            <Link href="/collections/all">
              <Button>Explore Collection</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 md:pt-24">
      <div className="container-main py-8">
        <Link
          href="/collections/all"
          className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Continue Shopping
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold font-heading mb-10">
          Wishlist ({items.length})
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((product) => (
            <div key={product.id} className="group">
              <Link href={`/products/${product.slug}`} className="block">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface mb-3">
                  <div className="w-full h-full flex items-center justify-center text-text-muted">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <circle cx="6" cy="15" r="4"/>
                      <circle cx="18" cy="15" r="4"/>
                      <path d="M14 15a2 2 0 0 0-4 0"/>
                    </svg>
                  </div>
                </div>
              </Link>
              <div className="space-y-1.5 px-1">
                <Link href={`/products/${product.slug}`} className="block text-sm font-medium hover:text-accent transition-colors">
                  {product.name}
                </Link>
                <p className="text-sm text-accent font-semibold">{formatPrice(product.price)}</p>
                <div className="flex items-center gap-2 pt-1">
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg glass glass-hover text-text-secondary hover:text-accent transition-colors text-center"
                  >
                    <ShoppingBag size={13} className="inline mr-1" /> Add to Cart
                  </Link>
                  <button
                    onClick={() => {
                      removeItem(product.id)
                    }}
                    className="p-1.5 rounded-lg glass text-text-muted hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
