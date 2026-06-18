"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/auth/login?check_email=true")
    router.refresh()
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20">
      <div className="w-full max-w-sm mx-auto px-6">
        <div className="glass-strong p-8 md:p-10">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-heading font-bold tracking-tight text-text-primary">
            SPECTRA
          </Link>
          <h1 className="text-2xl font-heading font-bold tracking-tight text-text-primary mt-6 mb-2">Create account</h1>
          <p className="text-sm text-text-muted">Join the Spectra community</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
              className="w-full px-4 py-2.5 border border-border bg-white text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-text-primary transition-colors"
            />
          </div>

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

          <div>
            <label htmlFor="password" className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5">
              Password
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
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-text-muted">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-text-primary underline underline-offset-2 hover:text-text-secondary transition-colors">
            Sign in
          </Link>
        </p>
        </div>
      </div>
    </div>
  )
}
