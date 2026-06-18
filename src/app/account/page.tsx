import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { SignOutButton } from "@/components/auth/SignOutButton"
import { User, Package, MapPin } from "lucide-react"
import Link from "next/link"

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?next=/account")
  }

  const fullName = user.user_metadata?.full_name ?? "Account"
  const email = user.email ?? ""

  return (
    <div className="py-20 md:py-28">
      <div className="container-main">
        <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-text-primary mb-2">
          {fullName}
        </h1>
        <p className="text-sm text-text-muted mb-12">{email}</p>

        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/account/orders" className="block glass-card p-6 group">
            <Package size={24} className="text-text-primary mb-4" />
            <h2 className="text-base font-medium text-text-primary mb-1">Order History</h2>
            <p className="text-xs text-text-muted group-hover:text-text-secondary transition-colors">View your past orders</p>
          </Link>

          <Link href="/account/addresses" className="block glass-card p-6 group">
            <MapPin size={24} className="text-text-primary mb-4" />
            <h2 className="text-base font-medium text-text-primary mb-1">Addresses</h2>
            <p className="text-xs text-text-muted group-hover:text-text-secondary transition-colors">Manage shipping addresses</p>
          </Link>

          <Link href="/account/profile" className="block glass-card p-6 group">
            <User size={24} className="text-text-primary mb-4" />
            <h2 className="text-base font-medium text-text-primary mb-1">Profile</h2>
            <p className="text-xs text-text-muted group-hover:text-text-secondary transition-colors">Update your details</p>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <SignOutButton />
        </div>
      </div>
    </div>
  )
}
