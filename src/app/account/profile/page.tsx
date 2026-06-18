import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, User } from "lucide-react"
import { ProfileForm } from "./ProfileForm"

export const metadata = { title: "Profile — Spectra Eyewear" }

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  return (
    <div className="py-20 md:py-28">
      <div className="container-main">
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Back to Account
        </Link>

        <h1 className="text-2xl md:text-3xl font-heading font-bold tracking-tight mb-2">Profile</h1>
        <p className="text-sm text-text-muted mb-10">Manage your personal information</p>

        <div className="max-w-lg">
          <ProfileForm
            userId={user.id}
            fullName={profile?.full_name ?? ""}
            email={user.email ?? ""}
          />
        </div>
      </div>
    </div>
  )
}
