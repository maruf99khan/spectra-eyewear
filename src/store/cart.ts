"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { CartItem, Product, ProductColor, ProductSize } from "@/types"

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, color: ProductColor, size: ProductSize, quantity?: number) => void
  removeItem: (productId: string, colorHex: string, sizeValue: string) => void
  updateQuantity: (productId: string, colorHex: string, sizeValue: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, color, size, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.color.hex === color.hex &&
              item.size.value === size.value
          )

          if (existingIndex > -1) {
            const newItems = [...state.items]
            newItems[existingIndex].quantity += quantity
            return { items: newItems, isOpen: true }
          }

          return {
            items: [...state.items, { product, color, size, quantity }],
            isOpen: true,
          }
        })
      },

      removeItem: (productId, colorHex, sizeValue) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(item.product.id === productId && item.color.hex === colorHex && item.size.value === sizeValue)
          ),
        }))
      },

      updateQuantity: (productId, colorHex, sizeValue, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.color.hex === colorHex && item.size.value === sizeValue
              ? { ...item, quantity }
              : item
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      getTotalPrice: () => get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    }),
    { name: "spectra-cart" }
  )
)
