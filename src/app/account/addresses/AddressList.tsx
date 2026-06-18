"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Plus, Pencil, Trash2, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/Button"

type Address = {
  id: string
  label: string | null
  line1: string
  line2: string | null
  city: string
  state: string | null
  zip: string
  country: string
  is_default: boolean
}

const emptyForm = { label: "", line1: "", line2: "", city: "", state: "", zip: "", country: "US" }

type FieldErrors = Partial<Record<keyof typeof emptyForm, string>>

function validate(f: typeof emptyForm): FieldErrors {
  const errs: FieldErrors = {}
  if (!f.line1.trim()) errs.line1 = "Address is required"
  if (!f.city.trim()) errs.city = "City is required"
  if (!f.zip.trim()) errs.zip = "ZIP code is required"
  else if (!/^\d{5}(-\d{4})?$/.test(f.zip.trim())) errs.zip = "Enter a valid ZIP code"
  return errs
}

export function AddressList({ userId, addresses }: { userId: string; addresses: Address[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Address | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Set<string>>(new Set())

  const openAdd = () => { setForm(emptyForm); setEditing(null); setFieldErrors({}); setTouched(new Set()); setShowForm(true) }
  const openEdit = (a: Address) => {
    setForm({ label: a.label ?? "", line1: a.line1, line2: a.line2 ?? "", city: a.city, state: a.state ?? "", zip: a.zip, country: a.country })
    setEditing(a); setFieldErrors({}); setTouched(new Set()); setShowForm(true)
  }

  const handleChange = (field: keyof typeof emptyForm, value: string) => {
    const next = { ...form, [field]: value }
    setForm(next)
    if (touched.has(field)) {
      const all = validate(next)
      setFieldErrors((prev) => ({ ...prev, [field]: all[field as keyof FieldErrors] }))
    }
  }

  const handleBlur = (field: keyof typeof emptyForm) => {
    setTouched((prev) => new Set(prev).add(field))
    const all = validate(form)
    setFieldErrors((prev) => ({ ...prev, [field]: all[field as keyof FieldErrors] }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    setFieldErrors(errs)
    setTouched(new Set(Object.keys(form)))
    if (Object.keys(errs).length > 0) return

    setSaving(true)
    const payload = { ...form, user_id: userId }
    if (editing) {
      await supabase.from("addresses").update(payload).eq("id", editing.id)
    } else {
      await supabase.from("addresses").insert(payload)
    }
    setSaving(false)
    setShowForm(false)
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    await supabase.from("addresses").delete().eq("id", id)
    router.refresh()
  }

  const setDefault = async (id: string) => {
    await supabase.from("addresses").update({ is_default: false }).eq("user_id", userId)
    await supabase.from("addresses").update({ is_default: true }).eq("id", id)
    router.refresh()
  }

  const inputClass = (field: keyof typeof emptyForm) =>
    `w-full border px-3 py-2.5 text-sm bg-white outline-none transition-colors ${
      fieldErrors[field as keyof FieldErrors] && touched.has(field)
        ? "border-red-400 focus:border-red-500"
        : "border-border focus:border-text-primary"
    }`

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs text-text-muted">{addresses.length} saved {addresses.length === 1 ? "address" : "addresses"}</p>
        <button onClick={openAdd} className="flex items-center gap-1 text-xs text-text-primary hover:text-text-secondary transition-colors">
          <Plus size={14} /> Add Address
        </button>
      </div>

      {addresses.length === 0 && (
        <div className="text-center py-20 border border-border">
          <MapPin size={48} className="mx-auto text-text-muted/30 mb-4" />
          <p className="text-sm text-text-muted mb-6">No addresses saved</p>
          <Button onClick={openAdd}>Add Address</Button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="bg-white border border-border p-6 relative group">
            {addr.is_default && (
              <span className="absolute top-3 right-3 text-[10px] uppercase tracking-widest text-text-muted border border-border px-2 py-0.5">
                Default
              </span>
            )}
            <p className="text-sm font-medium">{addr.label || "Address"}</p>
            <p className="text-sm text-text-muted mt-2">{addr.line1}</p>
            {addr.line2 && <p className="text-sm text-text-muted">{addr.line2}</p>}
            <p className="text-sm text-text-muted">{addr.city}{addr.state ? `, ${addr.state}` : ""} {addr.zip}</p>
            <p className="text-sm text-text-muted">{addr.country}</p>
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border">
              <button onClick={() => openEdit(addr)} className="text-xs text-text-muted hover:text-text-primary transition-colors flex items-center gap-1">
                <Pencil size={12} /> Edit
              </button>
              <button onClick={() => handleDelete(addr.id)} className="text-xs text-text-muted hover:text-red-500 transition-colors flex items-center gap-1">
                <Trash2 size={12} /> Delete
              </button>
              {!addr.is_default && (
                <button onClick={() => setDefault(addr.id)} className="text-xs text-text-muted hover:text-text-primary transition-colors ml-auto">
                  Set as Default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md p-8 mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold">{editing ? "Edit Address" : "Add Address"}</h2>
              <button onClick={() => setShowForm(false)} className="text-text-muted hover:text-text-primary"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4" noValidate>
              <Field label="Label (e.g. Home, Work)" error={fieldErrors.label} touched={touched.has("label")}>
                <input type="text" value={form.label} onChange={(e) => handleChange("label", e.target.value)} onBlur={() => handleBlur("label")} className={inputClass("label")} />
              </Field>
              <Field label="Address Line 1 *" error={fieldErrors.line1} touched={touched.has("line1")}>
                <input type="text" value={form.line1} onChange={(e) => handleChange("line1", e.target.value)} onBlur={() => handleBlur("line1")} className={inputClass("line1")} />
              </Field>
              <Field label="Address Line 2" error={fieldErrors.line2} touched={touched.has("line2")}>
                <input type="text" value={form.line2} onChange={(e) => handleChange("line2", e.target.value)} onBlur={() => handleBlur("line2")} className={inputClass("line2")} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="City *" error={fieldErrors.city} touched={touched.has("city")}>
                  <input type="text" value={form.city} onChange={(e) => handleChange("city", e.target.value)} onBlur={() => handleBlur("city")} className={inputClass("city")} />
                </Field>
                <Field label="State" error={fieldErrors.state} touched={touched.has("state")}>
                  <input type="text" value={form.state} onChange={(e) => handleChange("state", e.target.value)} onBlur={() => handleBlur("state")} className={inputClass("state")} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="ZIP Code *" error={fieldErrors.zip} touched={touched.has("zip")}>
                  <input type="text" value={form.zip} onChange={(e) => handleChange("zip", e.target.value)} onBlur={() => handleBlur("zip")} className={inputClass("zip")} />
                </Field>
                <Field label="Country" error={fieldErrors.country} touched={touched.has("country")}>
                  <input type="text" value={form.country} onChange={(e) => handleChange("country", e.target.value)} onBlur={() => handleBlur("country")} className={inputClass("country")} />
                </Field>
              </div>
              <Button type="submit" className="w-full" disabled={saving}>{saving ? "Saving…" : editing ? "Update Address" : "Add Address"}</Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

function Field({ label, error, touched, children }: { label: string; error?: string; touched: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-text-muted mb-1">{label}</label>
      {children}
      {error && touched && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
