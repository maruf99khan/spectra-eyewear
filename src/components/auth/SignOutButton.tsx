"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function SignOutButton() {
  const supabase = createClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-sm text-text-secondary hover:text-text-primary transition-colors"
    >
      Sign Out
    </button>
  )
}
