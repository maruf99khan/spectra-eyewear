import { requireAdmin } from "@/lib/admin"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ProductForm } from "../ProductForm"

export const metadata = { title: "Add Product — Admin — Spectra Eyewear" }

export default async function NewProductPage() {
  await requireAdmin()

  return (
    <div className="pt-20 md:pt-24">
      <div className="container-main py-8">
        <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors mb-6">
          <ArrowLeft size={14} /> Back to Products
        </Link>
        <h1 className="text-2xl font-heading font-bold tracking-tight mb-8">Add Product</h1>
        <div className="max-w-lg">
          <ProductForm />
        </div>
      </div>
    </div>
  )
}
