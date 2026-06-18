"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { getStripe } from "@/lib/stripe/client"
import { useCartStore } from "@/store/cart"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, Lock } from "lucide-react"

function CheckoutForm({ clientSecret, orderId }: { clientSecret: string; orderId: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const total = getTotalPrice()
  const shipping = total > 200 ? 0 : 15
  const grandTotal = total + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError("")

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/order/${orderId}?success=true`,
      },
    })

    if (confirmError) {
      setError(confirmError.message ?? "Payment failed")
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <h1 className="text-2xl font-bold font-heading mb-2">Your Cart is Empty</h1>
        <p className="text-sm text-text-muted mb-8">Add some items before checking out.</p>
        <Link href="/collections/all">
          <Button>Browse Collection</Button>
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-10">
      <div className="lg:col-span-3 space-y-6">
        <h2 className="text-lg font-semibold font-heading">Shipping & Payment</h2>

        <div className="bg-white border border-border p-6">
          <label className="block text-xs font-medium text-text-muted mb-1">Full Name</label>
          <input
            type="text"
            required
            className="w-full border border-border px-3 py-2.5 text-sm bg-white outline-none focus:border-text-primary transition-colors"
          />
        </div>

        <div className="bg-white border border-border p-6">
          <label className="block text-xs font-medium text-text-muted mb-1">Address</label>
          <input
            type="text"
            required
            className="w-full border border-border px-3 py-2.5 text-sm bg-white outline-none focus:border-text-primary transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 bg-white border border-border p-6">
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">City</label>
            <input
              type="text"
              required
              className="w-full border border-border px-3 py-2.5 text-sm bg-white outline-none focus:border-text-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">ZIP Code</label>
            <input
              type="text"
              required
              className="w-full border border-border px-3 py-2.5 text-sm bg-white outline-none focus:border-text-primary transition-colors"
            />
          </div>
        </div>

        <div className="bg-white border border-border p-6">
          <label className="block text-xs font-medium text-text-muted mb-1">Phone</label>
          <input
            type="tel"
            className="w-full border border-border px-3 py-2.5 text-sm bg-white outline-none focus:border-text-primary transition-colors"
          />
        </div>

        <div className="bg-white border border-border p-6">
          <h3 className="text-xs font-medium text-text-muted mb-4">Payment</h3>
          <PaymentElement />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <div className="lg:col-span-2">
        <div className="bg-white border border-border p-6 sticky top-28 space-y-4">
          <h3 className="text-sm font-semibold font-heading">Order Summary</h3>

          {items.map((item) => (
            <div key={`${item.product.id}-${item.color.hex}-${item.size.value}`} className="flex gap-3 pb-4 border-b border-border">
              <div className="w-16 h-16 border border-border flex-shrink-0 flex items-center justify-center text-text-muted/50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <circle cx="6" cy="15" r="4"/>
                  <circle cx="18" cy="15" r="4"/>
                  <path d="M14 15a2 2 0 0 0-4 0"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">{item.product.name}</p>
                <p className="text-xs text-text-muted mt-0.5">
                  {item.color.name} / {item.size.label} / Qty {item.quantity}
                </p>
                <p className="text-sm font-medium mt-1">{formatPrice(item.product.price)}</p>
              </div>
            </div>
          ))}

          <div className="space-y-2 text-sm pt-2">
            <div className="flex justify-between text-text-muted">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between font-semibold text-text-primary pt-2 border-t border-border">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={!stripe || loading}>
            {loading ? "Processing…" : `Pay ${formatPrice(grandTotal)}`}
          </Button>

          <p className="flex items-center justify-center gap-1.5 text-[10px] text-text-muted">
            <Lock size={10} /> Secure checkout via Stripe
          </p>
        </div>
      </div>
    </form>
  )
}

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("")
  const [orderId, setOrderId] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { items } = useCartStore()

  useEffect(() => {
    if (items.length === 0) {
      setLoading(false)
      return
    }

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, shippingAddress: {} }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret)
          setOrderId(data.orderId)
        } else {
          setError(data.error || "Failed to initialize payment")
        }
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false))
  }, [items.length])

  if (loading) {
    return (
      <div className="pt-20 md:pt-24">
        <div className="container-main py-8">
          <Link href="/cart" className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors mb-6">
            <ArrowLeft size={14} /> Back to Cart
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold font-heading mb-10">Checkout</h1>
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-text-muted">Loading checkout…</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-20 md:pt-24">
        <div className="container-main py-8">
          <Link href="/cart" className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors mb-6">
            <ArrowLeft size={14} /> Back to Cart
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold font-heading mb-10">Checkout</h1>
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 md:pt-24">
      <div className="container-main py-8">
        <Link href="/cart" className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors mb-6">
          <ArrowLeft size={14} /> Back to Cart
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold font-heading mb-10">Checkout</h1>

        <Elements stripe={getStripe()} options={{ clientSecret, appearance: { theme: "stripe" } }}>
          <CheckoutForm clientSecret={clientSecret} orderId={orderId} />
        </Elements>
      </div>
    </div>
  )
}
