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
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`} data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:text-sm focus:font-medium focus:radius-sm">
          Skip to main content
        </a>
        <AnnouncementBar />
        <Navbar />
        <main id="main-content" className="flex-1 outline-none" tabIndex={-1}>{children}</main>
        <Footer />
        <ClientLayout />
      </body>
    </html>
  )
}
