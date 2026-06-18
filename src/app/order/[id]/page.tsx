import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { formatPrice } from "@/lib/utils"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export default async function OrderConfirmationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ success?: string }>
}) {
  const { id } = await params
  const { success } = await searchParams

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (!order) redirect("/account")

  return (
    <div className="pt-20 md:pt-24">
      <div className="container-main py-8">
        <div className="max-w-lg mx-auto text-center">
          {success && (
            <div className="mb-8">
              <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
              <h1 className="text-2xl md:text-3xl font-bold font-heading mb-2">Order Confirmed</h1>
              <p className="text-sm text-text-muted">Thank you for your purchase.</p>
            </div>
          )}

          <div className="bg-white border border-border p-6 text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Order ID</span>
              <span className="font-mono text-xs">{id.slice(0, 8)}…</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Status</span>
              <span className="capitalize">{order.status}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Total</span>
              <span className="font-semibold">{formatPrice(order.total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Date</span>
              <span>{new Date(order.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <Link href="/account">
              <Button>View Order History</Button>
            </Link>
            <Link href="/collections/all" className="text-xs text-text-muted hover:text-text-primary underline underline-offset-4 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
