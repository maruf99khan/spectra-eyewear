import { notFound } from "next/navigation"
import { products } from "@/data/products"
import { ProductDetailClient } from "./ProductDetailClient"

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
