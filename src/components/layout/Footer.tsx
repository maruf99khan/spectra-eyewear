import Link from "next/link"
import { Globe, AtSign, Video } from "lucide-react"

export function Footer() {
  const footerLinks = {
    Shop: [
      { label: "Sunglasses", href: "/collections/sunglasses" },
      { label: "Eyeglasses", href: "/collections/eyeglasses" },
      { label: "New Arrivals", href: "/collections/new-arrivals" },
      { label: "Bestsellers", href: "/collections/bestsellers" },
      { label: "Limited Edition", href: "/collections/limited-edition" },
    ],
    Support: [
      { label: "Size Guide", href: "#" },
      { label: "Shipping & Returns", href: "#" },
      { label: "Warranty", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Stores", href: "/stores" },
      { label: "Sustainability", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  }

  return (
    <footer className="border-t border-border/50 glass-section">
      <div className="container-main py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-2xl font-heading font-bold tracking-tight text-text-primary hover:opacity-70 transition-opacity">
              SPECTRA
            </Link>
            <p className="mt-4 text-sm text-text-muted leading-relaxed max-w-xs">
              Redefining vision through precision craftsmanship and timeless design. Every frame tells a story.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Globe, AtSign, Video].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-text-primary transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-all duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border/50">
        <div className="container-main flex flex-col md:flex-row items-center justify-between py-6 gap-4">
          <p className="text-xs text-text-muted">© {new Date().getFullYear()} Spectra Eyewear. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
