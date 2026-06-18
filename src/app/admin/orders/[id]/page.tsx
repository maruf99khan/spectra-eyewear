import { requireAdmin } from "@/lib/admin"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { StatusUpdate } from "./StatusUpdate"

export const metadata = { title: "Order Detail — Admin — Spectra Eyewear" }

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { supabase } = await requireAdmin()

  const { data: order } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", id)
    .single()

  if (!order) notFound()

  return (
    <div className="pt-20 md:pt-24">
      <div className="container-main py-8">
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Back to Orders
        </Link>

        <h1 className="text-2xl font-heading font-bold tracking-tight mb-8">Order Detail</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Order ID</p>
              <p className="text-sm font-mono">{order.id}</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Customer Email</p>
              <p className="text-sm">{order.shipping_address?.email || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Date</p>
              <p className="text-sm">{new Date(order.created_at).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Total</p>
              <p className="text-lg font-semibold">{formatPrice(order.total)}</p>
            </div>
            <StatusUpdate orderId={order.id} currentStatus={order.status} />
          </div>
        </div>

        <h2 className="text-lg font-heading font-semibold mb-4">Items</h2>
        <div className="bg-white border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-light">
                <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-text-muted font-medium">Product</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-text-muted font-medium">Qty</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-text-muted font-medium">Price</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-text-muted font-medium">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.order_items?.map((item: any) => (
                <tr key={item.id} className="border-b border-border last:border-0 hover:bg-surface-light transition-colors">
                  <td className="px-5 py-4 font-mono text-xs">{item.product_id}</td>
                  <td className="px-5 py-4">{item.quantity}</td>
                  <td className="px-5 py-4">{formatPrice(item.price)}</td>
                  <td className="px-5 py-4 font-medium">{formatPrice(item.price * item.quantity)}</td>
                </tr>
              ))}
              {(!order.order_items || order.order_items.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-sm text-text-muted">No items</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
