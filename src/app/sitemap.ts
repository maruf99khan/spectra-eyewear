import type { MetadataRoute } from "next"
import { products } from "@/data/products"
import { collections } from "@/data/collections"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: "https://spectra-eyewear.vercel.app", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1.0 },
    { url: "https://spectra-eyewear.vercel.app/about", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: "https://spectra-eyewear.vercel.app/cart", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: "https://spectra-eyewear.vercel.app/checkout", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: "https://spectra-eyewear.vercel.app/stores", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: "https://spectra-eyewear.vercel.app/wishlist", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: "https://spectra-eyewear.vercel.app/search", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
  ]

  const productRoutes = products.map((p) => ({
    url: `https://spectra-eyewear.vercel.app/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const collectionRoutes = collections.map((c) => ({
    url: `https://spectra-eyewear.vercel.app/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes, ...collectionRoutes]
}
