import { requireAdmin } from "@/lib/admin"
import Link from "next/link"
import { LayoutDashboard, Package, ShoppingBag, ArrowLeft } from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
]

export default async function AdminDashboardPage() {
  const { supabase } = await requireAdmin()

  const [{ count: productCount }, { count: orderCount }, { data: orders }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("total").eq("status", "confirmed"),
  ])

  const revenue = orders?.reduce((sum, o) => sum + Number(o.total), 0) ?? 0

  return (
    <div className="pt-20 md:pt-24">
      <div className="container-main py-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">Admin</h1>
            <p className="text-sm text-text-muted mt-1">Manage your store</p>
          </div>
          <Link href="/" className="flex items-center gap-1 text-xs text-text-muted hover:text-text-primary transition-colors">
            <ArrowLeft size={14} /> Back to store
          </Link>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="glass-card p-6"
            >
              <item.icon size={24} className="text-text-primary mb-4" />
              <p className="text-sm font-medium">{item.label}</p>
            </Link>
          ))}
        </div>

        <h2 className="text-lg font-heading font-semibold mb-6">Overview</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-card p-6">
            <p className="text-xs text-text-muted uppercase tracking-widest">Products</p>
            <p className="text-3xl font-bold font-heading mt-2">{productCount ?? 0}</p>
          </div>
          <div className="glass-card p-6">
            <p className="text-xs text-text-muted uppercase tracking-widest">Orders</p>
            <p className="text-3xl font-bold font-heading mt-2">{orderCount ?? 0}</p>
          </div>
          <div className="glass-card p-6">
            <p className="text-xs text-text-muted uppercase tracking-widest">Revenue</p>
            <p className="text-3xl font-bold font-heading mt-2">
              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(revenue)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
