"use client"

import dynamic from "next/dynamic"

const CartSidebar = dynamic(() => import("@/components/layout/CartSidebar").then((m) => ({ default: m.CartSidebar })), { ssr: false })
const ToastContainer = dynamic(() => import("@/components/ui/ToastContainer").then((m) => ({ default: m.ToastContainer })), { ssr: false })
const SearchOverlay = dynamic(() => import("@/components/layout/SearchOverlay").then((m) => ({ default: m.SearchOverlay })), { ssr: false })

export function ClientLayout() {
  return (
    <>
      <CartSidebar />
      <ToastContainer />
      <SearchOverlay />
    </>
  )
}
