"use client"


import { X } from "lucide-react"

interface FilterSheetProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export function FilterSheet({ open, onClose, children, title = "Filters" }: FilterSheetProps) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-50 md:hidden" onClick={onClose} />}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border rounded-t-2xl max-h-[80vh] overflow-y-auto md:hidden transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <span className="text-sm font-semibold">{title}</span>
          <button onClick={onClose} className="p-1 text-text-muted hover:text-text-primary">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-4">
          {children}
        </div>
      </div>
    </>
  )
}
