"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

export interface Crumb {
  label: string
  href?: string
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-text-muted mb-6">
      <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={12} className="text-text-muted/50" />
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-text-primary transition-colors">{crumb.label}</Link>
          ) : (
            <span className="text-text-primary">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
