import { requireAdmin } from "@/lib/admin"
import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Pencil, Trash2 } from "lucide-react"
import { DeleteButton } from "./DeleteButton"

export const metadata = { title: "Product Detail — Admin — Spectra Eyewear" }

export default async function AdminProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { supabase } = await requireAdmin()

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single()

  if (!product) notFound()

  return (
    <div className="pt-20 md:pt-24">
      <div className="container-main py-8">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Back to Products
        </Link>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-heading font-bold tracking-tight">{product.name}</h1>
          <div className="flex items-center gap-3">
            <Link
              href={`/admin/products/${product.id}/edit`}
              className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors border border-border px-3 py-1.5"
            >
              <Pencil size={12} /> Edit
            </Link>
            <DeleteButton id={product.id} name={product.name} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Slug</p>
              <p className="text-sm font-mono">{product.slug}</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Description</p>
              <p className="text-sm">{product.description || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Price</p>
              <p className="text-sm font-medium">${Number(product.price).toFixed(2)}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Category</p>
              <p className="text-sm capitalize">{product.category}</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Material</p>
              <p className="text-sm capitalize">{product.material || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Status</p>
              <p className="text-sm">{product.is_sold_out ? "Sold Out" : "Active"}</p>
            </div>
            <div className="flex gap-2 text-xs text-text-muted">
              {product.is_new && <span className="border border-border px-2 py-0.5">New</span>}
              {product.is_bestseller && <span className="border border-border px-2 py-0.5">Bestseller</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
