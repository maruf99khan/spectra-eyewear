import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { products as hardcodedProducts } from "@/data/products"
import type { Product } from "@/types"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")
  const collection = searchParams.get("collection")
  const bestseller = searchParams.get("bestseller")
  const limit = searchParams.get("limit")
  const search = searchParams.get("search")

  const supabase = await createClient()

  let query = supabase.from("products").select("*")

  if (slug) query = query.eq("slug", slug)
  if (collection) query = query.eq("category", collection)
  if (bestseller === "true") query = query.eq("is_bestseller", true)
  if (limit) query = query.limit(Number(limit))

  const { data: dbProducts, error } = await query

  if (error || !dbProducts || dbProducts.length === 0) {
    let result = [...hardcodedProducts]
    if (slug) result = result.filter((p) => p.slug === slug)
    if (collection) result = result.filter((p) => p.collection === collection)
    if (bestseller === "true") result = result.filter((p) => p.isBestseller)
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    }
    if (limit) result = result.slice(0, Number(limit))
    return NextResponse.json(result)
  }

  const result: Product[] = dbProducts.map((dbp) => {
    const hardcoded = hardcodedProducts.find((h) => h.slug === dbp.slug)
    return {
      id: dbp.id,
      name: dbp.name,
      slug: dbp.slug,
      description: dbp.description ?? "",
      price: Number(dbp.price),
      originalPrice: dbp.original_price ? Number(dbp.original_price) : undefined,
      images: hardcoded?.images ?? [`/images/product-${dbp.slug}.jpg`],
      category: dbp.category ?? "",
      collection: hardcoded?.collection ?? "",
      colors: hardcoded?.colors ?? [],
      sizes: hardcoded?.sizes ?? [],
      material: dbp.material ?? "",
      shape: dbp.shape ?? "",
      features: hardcoded?.features ?? [],
      isNew: dbp.is_new ?? false,
      isBestseller: dbp.is_bestseller ?? false,
      isSoldOut: dbp.is_sold_out ?? false,
      details: hardcoded?.details ?? {
        frameWidth: "", lensHeight: "", bridgeWidth: "",
        templeLength: "", weight: "", material: dbp.material ?? "",
      },
    } as Product
  })

  if (search) {
    const q = search.toLowerCase()
    return NextResponse.json(
      result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    )
  }

  if (slug) return NextResponse.json(result[0] ?? null)
  return NextResponse.json(result)
}

export async function POST(request: Request) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data: profile } = await supabase
    .from("profiles").select("is_admin").eq("id", user.id).single()
  if (!profile?.is_admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const body = await request.json()
  const { metadata, ...flatFields } = body
  const { data, error } = await supabase.from("products").insert({
    ...flatFields,
    metadata: metadata ?? {},
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data, { status: 201 })
}
