import { requireAdmin } from "@/lib/admin"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { formatPrice } from "@/lib/utils"

export default async function AdminOrdersPage() {
  const { supabase } = await requireAdmin()

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="pt-20 md:pt-24">
      <div className="container-main py-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>

        <h1 className="text-2xl font-heading font-bold tracking-tight mb-8">Orders</h1>

        <div className="bg-white border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-light">
                <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-text-muted font-medium">Order ID</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-text-muted font-medium">Date</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-text-muted font-medium">Total</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-text-muted font-medium">Status</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-text-muted font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders?.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-sm text-text-muted">No orders yet</td>
                </tr>
              )}
              {orders?.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-surface-light transition-colors">
                  <td className="px-5 py-4 font-mono text-xs">{order.id.slice(0, 12)}…</td>
                  <td className="px-5 py-4 text-text-muted">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-4 font-medium">{formatPrice(order.total)}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block text-xs capitalize px-2 py-0.5 border ${
                      order.status === "confirmed" ? "border-green-200 text-green-700 bg-green-50" :
                      order.status === "pending" ? "border-yellow-200 text-yellow-700 bg-yellow-50" :
                      order.status === "shipped" ? "border-blue-200 text-blue-700 bg-blue-50" :
                      order.status === "delivered" ? "border-emerald-200 text-emerald-700 bg-emerald-50" :
                      order.status === "cancelled" ? "border-red-200 text-red-700 bg-red-50" :
                      "border-border text-text-muted"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-xs text-text-primary underline underline-offset-4 hover:text-text-secondary transition-colors"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
