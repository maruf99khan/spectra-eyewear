export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  collection: string
  colors: ProductColor[]
  sizes: ProductSize[]
  material: string
  shape: string
  features: string[]
  isNew: boolean
  isBestseller: boolean
  isSoldOut?: boolean
  details: {
    frameWidth: string
    lensHeight: string
    bridgeWidth: string
    templeLength: string
    weight: string
    material: string
  }
}

export interface ProductColor {
  name: string
  hex: string
  image?: string
}

export interface ProductSize {
  label: string
  value: string
}

export interface Collection {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
}

export interface CartItem {
  product: Product
  color: ProductColor
  size: ProductSize
  quantity: number
}

export interface Store {
  id: string
  name: string
  address: string
  city: string
  country: string
  phone: string
  hours: string
  coordinates: [number, number]
}
