"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AuthConfirmPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        // User is ready to reset
      }
    })
  }, [])

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
    setTimeout(() => router.push("/account"), 2000)
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-20">
        <div className="w-full max-w-sm mx-auto px-6 text-center">
          <h1 className="text-2xl font-heading font-bold tracking-tight text-text-primary mb-2">Password updated</h1>
          <p className="text-sm text-text-muted">Redirecting to your account...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20">
      <div className="w-full max-w-sm mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-heading font-bold tracking-tight text-text-primary mb-2">Set new password</h1>
          <p className="text-sm text-text-muted">Enter your new password below</p>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5">
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="At least 6 characters"
              className="w-full px-4 py-2.5 border border-border bg-white text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-text-primary transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-accent text-white text-sm font-medium tracking-wide hover:bg-accent-hover transition-colors disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  )
}
