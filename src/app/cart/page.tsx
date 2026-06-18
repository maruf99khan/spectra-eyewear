    "use client"

import { useState, useMemo } from "react"
import Link from "next/link"

import { Trash2, ShoppingBag, ArrowLeft, Lock } from "lucide-react"
import { useCartStore } from "@/store/cart"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { QuantitySelector } from "@/components/ui/QuantitySelector"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()

  const total = useMemo(() => getTotalPrice(), [items])
  const shipping = total > 200 ? 0 : 15
  const grandTotal = total + shipping

  if (items.length === 0) {
    return (
      <div className="pt-20 md:pt-24">
        <div className="container-main">
          <Breadcrumbs crumbs={[{ label: "Cart" }]} />
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <ShoppingBag size={64} className="text-text-muted/20 mb-6" />
            <h1 className="text-2xl font-bold font-heading mb-2">Your Cart is Empty</h1>
            <p className="text-sm text-text-muted mb-8">Looks like you haven&apos;t added anything yet.</p>
            <Link href="/collections/all">
              <Button>Browse Collection</Button>
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

        <h1 className="text-2xl md:text-3xl font-bold font-heading mb-10">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.color.hex}-${item.size.value}`}
                className="flex gap-5 p-5 glass-card rounded-2xl"
              >
                <Link
                  href={`/products/${item.product.slug}`}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-xl bg-surface overflow-hidden flex-shrink-0"
                >
                  <div className="w-full h-full flex items-center justify-center text-text-muted text-xs">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="6" cy="15" r="4"/>
                      <circle cx="18" cy="15" r="4"/>
                      <path d="M14 15a2 2 0 0 0-4 0"/>
                      <path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2"/>
                      <path d="M21.5 13 19 7c-.7-1.3-1.4-2-3-2"/>
                    </svg>
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="text-sm font-medium hover:text-accent transition-colors"
                  >
                    {item.product.name}
                  </Link>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-text-muted">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color.hex }} />
                      {item.color.name}
                    </span>
                    <span>{item.size.label}</span>
                  </div>
                  <p className="text-sm text-accent font-medium mt-2">{formatPrice(item.product.price)}</p>

                  <div className="flex items-center justify-between mt-4">
                    <QuantitySelector
                      quantity={item.quantity}
                      onDecrement={() =>
                        item.quantity > 1
                          ? updateQuantity(item.product.id, item.color.hex, item.size.value, item.quantity - 1)
                          : removeItem(item.product.id, item.color.hex, item.size.value)
                      }
                      onIncrement={() =>
                        updateQuantity(item.product.id, item.color.hex, item.size.value, item.quantity + 1)
                      }
                    />
                    <button
                      onClick={() => removeItem(item.product.id, item.color.hex, item.size.value)}
                      className="text-text-muted hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="glass-strong rounded-2xl p-6 sticky top-28">
              <h3 className="text-sm font-semibold mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-[11px] text-text-muted">Free shipping on orders over $200</p>
                )}
                <div className="border-t border-border pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-accent">{formatPrice(grandTotal)}</span>
                </div>
              </div>
              <Link href="/checkout">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>
              <p className="flex items-center justify-center gap-1 text-[10px] text-text-muted mt-4">
                <Lock size={10} /> Secure checkout via Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
