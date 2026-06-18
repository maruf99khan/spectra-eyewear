"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { createClient } from "@/lib/supabase/client"

export function ProfileForm({ userId, fullName, email }: { userId: string; fullName: string; email: string }) {
  const router = useRouter()
  const supabase = createClient()
  const [name, setName] = useState(fullName)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage("")

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: name })
      .eq("id", userId)

    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Profile updated")
      router.refresh()
    }
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-xs font-medium text-text-muted mb-1.5">Email</label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full border border-border px-3 py-2.5 text-sm bg-surface-light text-text-muted outline-none"
        />
        <p className="text-[10px] text-text-muted mt-1">Email cannot be changed</p>
      </div>

      <div>
        <label className="block text-xs font-medium text-text-muted mb-1.5">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-border px-3 py-2.5 text-sm bg-white outline-none focus:border-text-primary transition-colors"
        />
      </div>

      {message && (
        <p className={`text-xs ${message === "Profile updated" ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}

      <Button type="submit" disabled={saving || name === fullName}>
        {saving ? "Saving…" : "Save Changes"}
      </Button>
    </form>
  )
}
