"use client"

import { create } from "zustand"
import { Product } from "@/types"

interface WishlistState {
  items: Product[]
  toggleItem: (product: Product) => void
  isInWishlist: (productId: string) => boolean
  removeItem: (productId: string) => void
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  toggleItem: (product) => {
    const exists = get().items.find((p) => p.id === product.id)
    if (exists) {
      set({ items: get().items.filter((p) => p.id !== product.id) })
    } else {
      set({ items: [...get().items, product] })
    }
  },
  isInWishlist: (productId) => get().items.some((p) => p.id === productId),
  removeItem: (productId) => set({ items: get().items.filter((p) => p.id !== productId) }),
  clearWishlist: () => set({ items: [] }),
}))
