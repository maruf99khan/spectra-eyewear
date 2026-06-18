import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { AnnouncementBar } from "@/components/layout/AnnouncementBar"
import { Footer } from "@/components/layout/Footer"
import { ClientLayout } from "./ClientLayout"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "SPECTRA — Premium Eyewear",
  description: "Redefining vision through precision craftsmanship and timeless design. Discover our collection of premium sunglasses and eyeglasses.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary antialiased">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ClientLayout />
      </body>
    </html>
  )
}
