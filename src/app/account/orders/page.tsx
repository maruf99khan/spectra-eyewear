import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft, Package } from "lucide-react"

export default async function AccountOrdersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="py-20 md:py-28">
      <div className="container-main">
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Back to Account
        </Link>

        <h1 className="text-2xl md:text-3xl font-heading font-bold tracking-tight text-text-primary mb-10">
          Order History
        </h1>

        {(!orders || orders.length === 0) && (
          <div className="text-center py-20 border border-border">
            <Package size={48} className="mx-auto text-text-muted/30 mb-4" />
            <p className="text-sm text-text-muted">No orders yet</p>
          </div>
        )}

        <div className="space-y-4">
          {orders?.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-border p-6 flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-text-muted font-mono">{order.id.slice(0, 8)}…</p>
                <p className="text-sm font-medium mt-1 capitalize">{order.status}</p>
                <p className="text-xs text-text-muted mt-1">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-base font-semibold">{formatPrice(order.total)}</p>
                <Link
                  href={`/order/${order.id}`}
                  className="text-xs text-text-primary underline underline-offset-4 hover:text-text-secondary transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
