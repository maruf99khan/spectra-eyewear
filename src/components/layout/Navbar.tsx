"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingBag, Search, Heart, ChevronDown } from "lucide-react"
import { useCartStore } from "@/store/cart"
import { useUIStore } from "@/store/ui"
import { NAV_ITEMS, COLLECTION_SUBCATEGORIES } from "@/lib/constants"
import { UserMenu } from "@/components/auth/UserMenu"

export function Navbar() {
  const pathname = usePathname()
  const { getTotalItems } = useCartStore()
  const { isMenuOpen, toggleMenu, closeMenu, toggleSearch } = useUIStore()
  const [isScrolled, setIsScrolled] = useState(false)
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    closeMenu()
    setOpenMegaMenu(null)
  }, [pathname])

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-nav-solid shadow-sm" : "glass-nav"
      }`}
    >
      <div className={`absolute inset-x-0 top-0 h-[1px] transition-opacity duration-500 bg-gradient-to-r from-transparent via-black/10 to-transparent ${isScrolled ? "opacity-100" : "opacity-0"}`} />
      <nav className="container-main flex items-center justify-between h-16 md:h-18">
        <Link href="/" className="text-2xl font-heading font-bold tracking-tight text-text-primary hover:opacity-70 transition-opacity" onClick={closeMenu}>
          SPECTRA
        </Link>

        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => {
            const subcategories = COLLECTION_SUBCATEGORIES[item.label]
            const hasSubmenu = !!subcategories

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMegaMenu(item.label)}
                onMouseLeave={() => setOpenMegaMenu(null)}
                onFocus={() => setOpenMegaMenu(item.label)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) setOpenMegaMenu(null)
                }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-4 py-2 text-sm tracking-wide transition-all duration-200 rounded-sm relative
                    ${pathname === item.href ? "text-text-primary" : "text-text-secondary hover:text-text-primary"}
                  `}
                >
                  {item.label}
                  {hasSubmenu && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${openMegaMenu === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </Link>

                {hasSubmenu && openMegaMenu === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 glass-strong shadow-sm animate-fadeIn">
                    <div className="p-2">
                      {subcategories.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-white/50 transition-all duration-200 rounded-sm"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="flex items-center gap-0.5">
          <button
            onClick={toggleSearch}
            aria-label="Open search"
            className="p-2.5 text-text-secondary hover:text-text-primary transition-all duration-200 hover:bg-black/[0.03] rounded-sm"
          >
            <Search size={18} />
          </button>
          <UserMenu />
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="hidden sm:block p-2.5 text-text-secondary hover:text-text-primary transition-all duration-200 hover:bg-black/[0.03] rounded-sm"
          >
            <Heart size={18} />
          </Link>
          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="relative p-2.5 text-text-secondary hover:text-text-primary transition-all duration-200 hover:bg-black/[0.03] rounded-sm"
          >
            <ShoppingBag size={18} />
            {getTotalItems() > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse-glow">
                {getTotalItems()}
              </span>
            )}
          </Link>
          <button
            className="lg:hidden p-2.5 text-text-secondary hover:text-text-primary transition-all duration-200 hover:bg-black/[0.03] rounded-sm"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden glass-strong overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-main py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const subcategories = COLLECTION_SUBCATEGORIES[item.label]
            return (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block px-3 py-3 text-sm text-text-primary font-medium tracking-wide"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
                {subcategories?.map((sub) => (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    className="block px-6 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                    onClick={closeMenu}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </header>
  )
}
