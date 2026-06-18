import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/auth/", "/account/", "/checkout", "/order/"],
    },
    sitemap: "https://spectra-eyewear.vercel.app/sitemap.xml",
  }
}
