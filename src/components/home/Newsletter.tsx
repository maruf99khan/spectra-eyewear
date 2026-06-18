"use client"

import { useState } from "react"
import { useToastStore } from "@/store/toast"
import { ArrowRight, Check } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const { addToast } = useToastStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      addToast("Please enter a valid email address", "error")
      return
    }

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    if (res.ok) {
      setSubscribed(true)
      addToast("Thanks for subscribing!", "success")
      setEmail("")
    } else {
      addToast("Something went wrong. Try again.", "error")
    }
  }

  return (
    <section className="py-24 md:py-32 bg-bg-primary relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.015)_0%,transparent_60%)]" />
      <div className="container-main relative z-10">
        <div className="bg-white border border-border/50 p-10 md:p-16 text-center max-w-3xl mx-auto elevation-sm relative overflow-hidden">
          <p className="section-label justify-center mb-4">Stay Connected</p>
          <h2 className="font-heading font-bold tracking-tight text-text-primary text-[clamp(1.5rem,2.5vw+0.5rem,2.5rem)] mb-4">Join the Spectra Community</h2>
          <p className="text-sm text-text-muted max-w-md mx-auto mb-8 leading-relaxed">
            Be the first to know about new collections, exclusive drops, and limited editions.
          </p>
          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-text-primary">
              <Check size={20} />
              <span className="text-sm font-medium">You&apos;re subscribed!</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 w-full px-5 py-3 bg-white border border-border text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-text-primary transition-all duration-200"
              />
              <button type="submit" className="btn btn-primary text-sm whitespace-nowrap w-full sm:w-auto">
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
