import { loadStripe } from "@stripe/stripe-js"

let stripePromise: Promise<import("@stripe/stripe-js").Stripe | null> | null = null

export function getStripe() {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  if (!key) return Promise.resolve(null)
  if (!stripePromise) {
    stripePromise = loadStripe(key)
  }
  return stripePromise
}
