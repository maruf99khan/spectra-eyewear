import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { collections as hardcodedCollections } from "@/data/collections"
import type { Collection } from "@/types"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")
  const limit = searchParams.get("limit")

  const supabase = await createClient()

  let query = supabase.from("collections").select("*")

  if (slug) {
    query = query.eq("slug", slug)
  }
  if (limit) {
    query = query.limit(Number(limit))
  }

  const { data: dbCollections, error } = await query

  if (error || !dbCollections || dbCollections.length === 0) {
    let result = [...hardcodedCollections]
    if (slug) result = result.filter((c) => c.slug === slug)
    if (limit) result = result.slice(0, Number(limit))
    return NextResponse.json(result)
  }

  // Merge with hardcoded data for rich fields (image, productCount)
  const result: Collection[] = dbCollections.map((dbc) => {
    const hardcoded = hardcodedCollections.find((h) => h.slug === dbc.slug)
    return {
      id: dbc.id,
      name: dbc.name,
      slug: dbc.slug,
      description: dbc.description ?? "",
      image: hardcoded?.image ?? `/images/collection-${dbc.slug}.jpg`,
      productCount: hardcoded?.productCount ?? 0,
    }
  })

  if (slug) return NextResponse.json(result[0] ?? null)

  return NextResponse.json(result)
}
