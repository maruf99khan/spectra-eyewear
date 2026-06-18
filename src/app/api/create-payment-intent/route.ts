import { NextResponse } from "next/server"
import { getStripeServer } from "@/lib/stripe/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { items, shippingAddress } = await request.json()
    const amount = items.reduce(
      (sum: number, item: any) => sum + Math.round(item.product.price * 100) * item.quantity,
      0,
    )

    const stripe = getStripeServer()
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: { user_id: user.id },
    })

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        status: "pending",
        total: amount / 100,
        shipping_address: shippingAddress || {},
      })
      .select()
      .single()

    if (error) throw error

    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
    }))

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)
    if (itemsError) throw itemsError

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
    })
  } catch (err: any) {
    console.error("Payment intent error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
