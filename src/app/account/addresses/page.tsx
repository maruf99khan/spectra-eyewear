import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"
import { AddressList } from "./AddressList"

export const metadata = { title: "Addresses — Spectra Eyewear" }

export default async function AddressesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: addresses } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="py-20 md:py-28">
      <div className="container-main">
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Back to Account
        </Link>

        <h1 className="text-2xl md:text-3xl font-heading font-bold tracking-tight mb-8">Addresses</h1>

        <AddressList userId={user.id} addresses={addresses ?? []} />
      </div>
    </div>
  )
}
