"use client"

import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { useCartStore } from "@/store/cart"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"

export function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore()

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 z-[60]" onClick={closeCart} />}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md z-[70] glass-strong border-l border-border/50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-text-primary" />
                  <span className="text-sm font-medium text-text-primary">Cart ({items.length})</span>
                </div>
                <button onClick={closeCart} className="p-1.5 text-text-muted hover:text-text-primary transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag size={48} className="text-text-muted/30 mb-4" />
                    <p className="text-text-muted text-sm">Your cart is empty</p>
                    <Link
                      href="/collections/all"
                      onClick={closeCart}
                      className="mt-4 text-sm text-text-primary underline underline-offset-4 hover:text-text-secondary transition-colors"
                    >
                      Browse Collection
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={`${item.product.id}-${item.color.hex}-${item.size.value}`} className="flex gap-4 p-3 border border-border">
                        <div className="w-20 h-20 bg-surface-light border border-border overflow-hidden flex-shrink-0 flex items-center justify-center">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-text-muted/50">
                            <circle cx="6" cy="15" r="4"/>
                            <circle cx="18" cy="15" r="4"/>
                            <path d="M14 15a2 2 0 0 0-4 0"/>
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.product.slug}`}
                            onClick={closeCart}
                            className="text-sm font-medium text-text-primary hover:text-text-secondary transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                            <span className="flex items-center gap-1">
                              <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: item.color.hex }} />
                              {item.color.name}
                            </span>
                            <span>{item.size.label}</span>
                          </div>
                          <p className="text-sm text-text-primary font-medium mt-1">{formatPrice(item.product.price)}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() =>
                                  item.quantity > 1
                                    ? updateQuantity(item.product.id, item.color.hex, item.size.value, item.quantity - 1)
                                    : removeItem(item.product.id, item.color.hex, item.size.value)
                                }
                                className="w-6 h-6 border border-border flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
                              >
                                {item.quantity === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                              </button>
                              <span className="w-8 text-center text-xs font-medium text-text-primary">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.color.hex, item.size.value, item.quantity + 1)
                                }
                                className="w-6 h-6 border border-border flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.product.id, item.color.hex, item.size.value)}
                              className="text-text-muted hover:text-text-primary transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-border px-6 py-5 space-y-4 bg-surface-light">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">Subtotal</span>
                    <span className="text-lg font-semibold text-text-primary">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <p className="text-xs text-text-muted">Shipping calculated at checkout</p>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="block w-full py-3 bg-accent text-white text-sm font-medium tracking-wide text-center hover:bg-accent-hover transition-colors"
                  >
                    View Cart & Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
    </>
  )
}
