import { requireAdmin } from "@/lib/admin"
import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default async function AdminProductsPage() {
  const { supabase } = await requireAdmin()

  const { data: products } = await supabase
    .from("products")
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

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-heading font-bold tracking-tight">Products</h1>
          <Link href="/admin/products/new"><Button>Add Product</Button></Link>
        </div>

        <div className="glass-strong overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-light">
                <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-text-muted font-medium">Name</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-text-muted font-medium">Slug</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-text-muted font-medium">Price</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-text-muted font-medium">Category</th>
                <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-text-muted font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {products?.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-sm text-text-muted">No products yet</td>
                </tr>
              )}
              {products?.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-surface-light transition-colors">
                  <td className="px-5 py-4">
                    <Link href={`/admin/products/${p.id}`} className="font-medium hover:text-text-secondary transition-colors">
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-text-muted font-mono text-xs">{p.slug}</td>
                  <td className="px-5 py-4">${Number(p.price).toFixed(2)}</td>
                  <td className="px-5 py-4 text-text-muted capitalize">{p.category}</td>
                  <td className="px-5 py-4">
                    {p.is_sold_out ? (
                      <span className="text-xs text-red-500">Sold Out</span>
                    ) : (
                      <span className="text-xs text-green-600">Active</span>
                    )}
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
