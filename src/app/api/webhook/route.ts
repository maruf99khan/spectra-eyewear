import { NextResponse } from "next/server"
import { getStripeServer } from "@/lib/stripe/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature")!
  const body = await request.text()

  let event
  try {
    const stripe = getStripeServer()
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object
    const supabase = await createClient()

    await supabase
      .from("orders")
      .update({ status: "confirmed" })
      .eq("stripe_payment_intent_id", paymentIntent.id)
  }

  return NextResponse.json({ received: true })
}
