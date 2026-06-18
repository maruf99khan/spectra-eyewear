"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { User } from "lucide-react"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export function UserMenu() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  if (loading) {
    return (
      <div className="p-2.5 text-text-muted">
        <User size={18} />
      </div>
    )
  }

  if (user) {
    return (
      <Link
        href="/account"
        aria-label="Account"
        className="p-2.5 text-text-secondary hover:text-text-primary transition-colors"
      >
        <User size={18} />
      </Link>
    )
  }

  return (
    <Link
      href="/auth/login"
      aria-label="Sign in"
      className="p-2.5 text-text-secondary hover:text-text-primary transition-colors"
    >
      <User size={18} />
    </Link>
  )
}
