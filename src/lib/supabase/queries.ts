import { createClient } from "@/lib/supabase/server"
import type { Product, Collection } from "@/types"

function enrichProduct(data: Record<string, unknown>): Product {
  const meta = (data.metadata || {}) as Record<string, unknown>
  return {
    ...data,
    colors: meta.colors || [],
    sizes: meta.sizes || [],
    images: meta.images || [],
    features: meta.features || [],
    details: meta.details || {},
  } as unknown as Product
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false })
  return (data ?? []).map(enrichProduct)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient()
  const { data } = await supabase.from("products").select("*").eq("slug", slug).single()
  if (!data) return null
  return enrichProduct(data as Record<string, unknown>)
}

export async function getCollections(): Promise<Collection[]> {
  const supabase = await createClient()
  const { data } = await supabase.from("collections").select("*")
  return (data ?? []) as unknown as Collection[]
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  const supabase = await createClient()
  const { data } = await supabase.from("collections").select("*").eq("slug", slug).single()
  return data as unknown as Collection | null
}

export async function getProductsByCollectionSlug(slug: string): Promise<Product[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("products")
    .select("*, product_collections!inner(collection_id), collections!inner(*)")
    .eq("collections.slug", slug)
  return (data ?? []).map(enrichProduct)
}

export async function getBestsellers(): Promise<Product[]> {
  const supabase = await createClient()
  const { data } = await supabase.from("products").select("*").eq("is_bestseller", true).limit(4)
  return (data ?? []).map(enrichProduct)
}

export async function getFeaturedCollections(): Promise<Collection[]> {
  const supabase = await createClient()
  const { data } = await supabase.from("collections").select("*").limit(3)
  return (data ?? []) as unknown as Collection[]
}
