import { requireAdmin } from "@/lib/admin"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ProductForm } from "../../ProductForm"

export const metadata = { title: "Edit Product — Admin — Spectra Eyewear" }

export default async function EditProductPage({
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

  const meta = (product.metadata ?? {}) as Record<string, unknown>

  return (
    <div className="pt-20 md:pt-24">
      <div className="container-main py-8">
        <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors mb-6">
          <ArrowLeft size={14} /> Back to Products
        </Link>
        <h1 className="text-2xl font-heading font-bold tracking-tight mb-8">Edit {product.name}</h1>
        <div className="max-w-lg">
          <ProductForm initial={{
            id: product.id,
            name: product.name,
            slug: product.slug,
            description: product.description ?? "",
            price: String(product.price),
            original_price: product.original_price ? String(product.original_price) : "",
            category: product.category ?? "optical",
            material: product.material ?? "",
            shape: product.shape ?? "",
            is_new: product.is_new ?? false,
            is_bestseller: product.is_bestseller ?? false,
            is_sold_out: product.is_sold_out ?? false,
            colors: (meta.colors ?? []) as { name: string; hex: string }[],
            sizes: (meta.sizes ?? []) as { label: string; value: string }[],
            images: (meta.images ?? []) as string[],
            features: (meta.features ?? []) as string[],
            details: (meta.details ?? {}) as { frameWidth: string; lensHeight: string; bridgeWidth: string; templeLength: string; weight: string; material: string },
          }} />
        </div>
      </div>
    </div>
  )
}
