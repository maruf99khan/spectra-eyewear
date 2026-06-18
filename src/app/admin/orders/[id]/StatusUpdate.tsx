"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const statuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"]

const statusColors: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  confirmed: "border-green-200 text-green-700 bg-green-50",
  shipped: "border-blue-200 text-blue-700 bg-blue-50",
  delivered: "border-emerald-200 text-emerald-700 bg-emerald-50",
  cancelled: "border-red-200 text-red-700 bg-red-50",
}

export function StatusUpdate({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const router = useRouter()
  const [status, setStatus] = useState(currentStatus)
  const [updating, setUpdating] = useState(false)

  const handleUpdate = async (newStatus: string) => {
    setUpdating(true)
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
    if (res.ok) {
      setStatus(newStatus)
      router.refresh()
    }
    setUpdating(false)
  }

  return (
    <div>
      <p className="text-xs text-text-muted uppercase tracking-widest mb-2">Status</p>
      <div className="flex items-center gap-3">
        <span className={`inline-block text-xs capitalize px-2 py-0.5 border ${statusColors[status] || "border-border text-text-muted"}`}>
          {status}
        </span>
        <select
          value={status}
          onChange={(e) => handleUpdate(e.target.value)}
          disabled={updating}
          className="text-xs border border-border bg-white px-2 py-1.5 text-text-primary focus:outline-none focus:border-accent disabled:opacity-50"
        >
          {statuses.map((s) => (
            <option key={s} value={s} className="capitalize">{s}</option>
          ))}
        </select>
        {updating && <span className="text-xs text-text-muted">Updating…</span>}
      </div>
    </div>
  )
}
