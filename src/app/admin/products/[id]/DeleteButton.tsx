"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2, X } from "lucide-react"

export function DeleteButton({ id, name }: { id: string; name: string }) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" })
    if (res.ok) router.push("/admin/products")
    else setDeleting(false)
  }

  return (
    <>
      <button
        onClick={() => setConfirming(true)}
        className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 transition-colors border border-red-200 px-3 py-1.5"
      >
        <Trash2 size={12} /> Delete
      </button>

      {confirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-sm p-8 mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold">Delete Product</h2>
              <button onClick={() => setConfirming(false)} className="text-text-muted hover:text-text-primary"><X size={18} /></button>
            </div>
            <p className="text-sm text-text-muted mb-6">
              Are you sure you want to delete <strong>{name}</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="btn btn-primary text-sm !bg-red-500 !border-red-500 hover:!bg-red-600 hover:!border-red-600"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
              <button onClick={() => setConfirming(false)} className="btn btn-ghost text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
