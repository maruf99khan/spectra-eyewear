"use client"


import { CheckCircle, XCircle, Info, X } from "lucide-react"
import { useToastStore } from "@/store/toast"

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
}

const colors = {
  success: "border-green-500/30 text-green-400",
  error: "border-red-500/30 text-red-400",
  info: "border-accent/30 text-accent",
}

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] flex flex-col gap-2 w-full max-w-sm px-4">
        {toasts.map((toast) => {
          const Icon = icons[toast.type]
          return (
            <div
              key={toast.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl glass-strong border ${colors[toast.type]}`}
            >
              <Icon size={16} className="flex-shrink-0" />
              <span className="text-sm text-text-primary flex-1">{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="text-text-muted hover:text-text-primary">
                <X size={14} />
              </button>
            </div>
          )
        })}
    </div>
  )
}
