export const NAV_ITEMS = [
  { label: "Sunglasses", href: "/collections/sunglasses" },
  { label: "Eyeglasses", href: "/collections/eyeglasses" },
  { label: "Collections", href: "/collections/all" },
  { label: "About", href: "/about" },
  { label: "Stores", href: "/stores" },
] as const

export const COLLECTION_SUBCATEGORIES: Record<string, { label: string; href: string }[]> = {
  Sunglasses: [
    { label: "All Sunglasses", href: "/collections/sunglasses" },
    { label: "Aviator", href: "/collections/sunglasses?shape=aviator" },
    { label: "Wayfarer", href: "/collections/sunglasses?shape=wayfarer" },
    { label: "Round", href: "/collections/sunglasses?shape=round" },
    { label: "Cat Eye", href: "/collections/sunglasses?shape=cateye" },
  ],
  Eyeglasses: [
    { label: "All Eyeglasses", href: "/collections/eyeglasses" },
    { label: "Blue Light", href: "/collections/eyeglasses?feature=blue-light" },
    { label: "Prescription", href: "/collections/eyeglasses?feature=prescription" },
    { label: "Reading", href: "/collections/eyeglasses?feature=reading" },
  ],
  Collections: [
    { label: "New Arrivals", href: "/collections/new-arrivals" },
    { label: "Bestsellers", href: "/collections/bestsellers" },
    { label: "Signature", href: "/collections/signature" },
    { label: "Limited Edition", href: "/collections/limited-edition" },
  ],
}

export const SHAPE_OPTIONS = ["All", "Aviator", "Wayfarer", "Round", "Cat Eye", "Square", "Rectangle"]
export const COLOR_OPTIONS = ["All", "Black", "Gold", "Silver", "Brown", "Tortoise", "Blue", "Green", "Red"]
export const MATERIAL_OPTIONS = ["All", "Acetate", "Metal", "Titanium", "Stainless Steel", "Wood"]
export const PRICE_RANGES = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under $150", min: 0, max: 150 },
  { label: "$150 - $300", min: 150, max: 300 },
  { label: "$300 - $500", min: 300, max: 500 },
  { label: "Over $500", min: 500, max: Infinity },
]

export const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Sellers", value: "bestsellers" },
] as const
