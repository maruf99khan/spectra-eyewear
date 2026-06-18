import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Search — Spectra Eyewear",
  description: "Search our collection of premium eyewear frames. Filter by category, shape, material, and price.",
}

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children
}
