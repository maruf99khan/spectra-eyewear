"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/confirm`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-20">
        <div className="w-full max-w-sm mx-auto px-6 text-center">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Check size={24} className="text-accent" />
          </div>
          <h1 className="text-2xl font-heading font-bold tracking-tight text-text-primary mb-2">Check your email</h1>
          <p className="text-sm text-text-muted mb-8">
            We sent a password reset link to <strong className="text-text-primary">{email}</strong>
          </p>
          <Link href="/auth/login" className="text-sm text-text-primary underline underline-offset-2 hover:text-text-secondary transition-colors">
            Back to sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20">
      <div className="w-full max-w-sm mx-auto px-6">
        <Link href="/auth/login" className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors mb-8">
          <ArrowLeft size={14} /> Back to sign in
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-heading font-bold tracking-tight text-text-primary mb-2">Reset password</h1>
          <p className="text-sm text-text-muted">Enter your email and we'll send you a reset link</p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
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
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  )
}
