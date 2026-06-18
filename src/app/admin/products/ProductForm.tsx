"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type FlatFormData = {
  name: string
  slug: string
  description: string
  price: string
  original_price: string
  category: string
  material: string
  shape: string
  is_new: boolean
  is_bestseller: boolean
  is_sold_out: boolean
}

type ColorItem = { name: string; hex: string }
type SizeItem = { label: string; value: string }
type DetailsData = {
  frameWidth: string
  lensHeight: string
  bridgeWidth: string
  templeLength: string
  weight: string
  material: string
}

type InitialData = FlatFormData & { id: string } & {
  colors?: ColorItem[]
  sizes?: SizeItem[]
  images?: string[]
  features?: string[]
  details?: DetailsData
}

const emptyFlat: FlatFormData = {
  name: "", slug: "", description: "", price: "", original_price: "",
  category: "optical", material: "", shape: "",
  is_new: false, is_bestseller: false, is_sold_out: false,
}

function emptyDetails(): DetailsData {
  return { frameWidth: "", lensHeight: "", bridgeWidth: "", templeLength: "", weight: "", material: "" }
}

export function ProductForm({ initial }: { initial?: InitialData }) {
  const router = useRouter()
  const [form, setForm] = useState<FlatFormData>(initial ?? emptyFlat)
  const [colors, setColors] = useState<ColorItem[]>(initial?.colors ?? [])
  const [sizes, setSizes] = useState<SizeItem[]>(initial?.sizes ?? [])
  const [images, setImages] = useState<string[]>(initial?.images ?? [])
  const [features, setFeatures] = useState<string[]>(initial?.features ?? [])
  const [details, setDetails] = useState<DetailsData>(initial?.details ?? emptyDetails())
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (field: keyof FlatFormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")

    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      price: form.price ? Number(form.price) : 0,
      original_price: form.original_price ? Number(form.original_price) : null,
      category: form.category,
      material: form.material,
      shape: form.shape,
      is_new: form.is_new,
      is_bestseller: form.is_bestseller,
      is_sold_out: form.is_sold_out,
      metadata: {
        colors,
        sizes,
        images,
        features,
        details,
      },
    }

    const url = initial
      ? `/api/products/${initial.id}`
      : "/api/products"
    const method = initial ? "PATCH" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? "Failed to save product")
      setSaving(false)
      return
    }

    router.push("/admin/products")
    router.refresh()
  }

  const categories = ["optical", "sunglasses", "blue-light", "sport"]
  const materials = ["acetate", "titanium", "stainless steel", "aluminum", "wood", "combination"]
  const shapes = ["round", "square", "cat-eye", "rectangle", "aviator", "wayfarer", "geometric"]

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div>
        <label className="block text-xs font-medium text-text-muted mb-1">Name *</label>
        <input
          type="text" required value={form.name}
          onChange={(e) => { handleChange("name", e.target.value); if (!initial) handleChange("slug", e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")) }}
          className="w-full border border-border px-3 py-2.5 text-sm bg-white outline-none focus:border-text-primary transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-text-muted mb-1">Slug *</label>
        <input
          type="text" required value={form.slug}
          onChange={(e) => handleChange("slug", e.target.value)}
          className="w-full border border-border px-3 py-2.5 text-sm bg-white outline-none focus:border-text-primary transition-colors font-mono"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-text-muted mb-1">Description</label>
        <textarea
          rows={4} value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full border border-border px-3 py-2.5 text-sm bg-white outline-none focus:border-text-primary transition-colors resize-vertical"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1">Price *</label>
          <input
            type="number" step="0.01" min="0" required value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            className="w-full border border-border px-3 py-2.5 text-sm bg-white outline-none focus:border-text-primary transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1">Original Price</label>
          <input
            type="number" step="0.01" min="0" value={form.original_price}
            onChange={(e) => handleChange("original_price", e.target.value)}
            className="w-full border border-border px-3 py-2.5 text-sm bg-white outline-none focus:border-text-primary transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1">Category *</label>
          <select
            required value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full border border-border px-3 py-2.5 text-sm bg-white outline-none focus:border-text-primary transition-colors"
          >
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1">Material</label>
          <select
            value={form.material}
            onChange={(e) => handleChange("material", e.target.value)}
            className="w-full border border-border px-3 py-2.5 text-sm bg-white outline-none focus:border-text-primary transition-colors"
          >
            <option value="">—</option>
            {materials.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1">Shape</label>
          <select
            value={form.shape}
            onChange={(e) => handleChange("shape", e.target.value)}
            className="w-full border border-border px-3 py-2.5 text-sm bg-white outline-none focus:border-text-primary transition-colors"
          >
            <option value="">—</option>
            {shapes.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-6 pt-2">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={form.is_new} onChange={(e) => handleChange("is_new", e.target.checked)} className="accent-black" />
          New Arrival
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={form.is_bestseller} onChange={(e) => handleChange("is_bestseller", e.target.checked)} className="accent-black" />
          Bestseller
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={form.is_sold_out} onChange={(e) => handleChange("is_sold_out", e.target.checked)} className="accent-black" />
          Sold Out
        </label>
      </div>

      {/* Colors */}
      <div className="pt-4 border-t border-border">
        <label className="block text-xs font-medium text-text-muted mb-2">Colors</label>
        {colors.map((c, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input type="text" placeholder="Name" value={c.name}
              onChange={(e) => { const next = [...colors]; next[i] = { ...next[i], name: e.target.value }; setColors(next) }}
              className="flex-1 border border-border px-3 py-2 text-sm bg-white outline-none focus:border-text-primary transition-colors" />
            <input type="color" value={c.hex}
              onChange={(e) => { const next = [...colors]; next[i] = { ...next[i], hex: e.target.value }; setColors(next) }}
              className="w-10 h-9 border border-border p-0.5 bg-white cursor-pointer" />
            <button type="button" onClick={() => setColors(colors.filter((_, j) => j !== i))}
              className="text-xs text-red-500 hover:text-red-700 px-2">×</button>
          </div>
        ))}
        <button type="button" onClick={() => setColors([...colors, { name: "", hex: "#000000" }])}
          className="text-xs text-text-muted hover:text-text-primary transition-colors">+ Add Color</button>
      </div>

      {/* Sizes */}
      <div className="pt-4 border-t border-border">
        <label className="block text-xs font-medium text-text-muted mb-2">Sizes</label>
        {sizes.map((s, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input type="text" placeholder="Label" value={s.label}
              onChange={(e) => { const next = [...sizes]; next[i] = { ...next[i], label: e.target.value }; setSizes(next) }}
              className="flex-1 border border-border px-3 py-2 text-sm bg-white outline-none focus:border-text-primary transition-colors" />
            <input type="text" placeholder="Value" value={s.value}
              onChange={(e) => { const next = [...sizes]; next[i] = { ...next[i], value: e.target.value }; setSizes(next) }}
              className="flex-1 border border-border px-3 py-2 text-sm bg-white outline-none focus:border-text-primary transition-colors" />
            <button type="button" onClick={() => setSizes(sizes.filter((_, j) => j !== i))}
              className="text-xs text-red-500 hover:text-red-700 px-2">×</button>
          </div>
        ))}
        <button type="button" onClick={() => setSizes([...sizes, { label: "", value: "" }])}
          className="text-xs text-text-muted hover:text-text-primary transition-colors">+ Add Size</button>
      </div>

      {/* Images */}
      <div className="pt-4 border-t border-border">
        <label className="block text-xs font-medium text-text-muted mb-2">Images (URLs)</label>
        {images.map((url, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input type="text" placeholder="https://..." value={url}
              onChange={(e) => { const next = [...images]; next[i] = e.target.value; setImages(next) }}
              className="flex-1 border border-border px-3 py-2 text-sm bg-white outline-none focus:border-text-primary transition-colors" />
            <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))}
              className="text-xs text-red-500 hover:text-red-700 px-2">×</button>
          </div>
        ))}
        <button type="button" onClick={() => setImages([...images, ""])}
          className="text-xs text-text-muted hover:text-text-primary transition-colors">+ Add Image URL</button>
      </div>

      {/* Features */}
      <div className="pt-4 border-t border-border">
        <label className="block text-xs font-medium text-text-muted mb-2">Features</label>
        {features.map((f, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input type="text" placeholder="Feature" value={f}
              onChange={(e) => { const next = [...features]; next[i] = e.target.value; setFeatures(next) }}
              className="flex-1 border border-border px-3 py-2 text-sm bg-white outline-none focus:border-text-primary transition-colors" />
            <button type="button" onClick={() => setFeatures(features.filter((_, j) => j !== i))}
              className="text-xs text-red-500 hover:text-red-700 px-2">×</button>
          </div>
        ))}
        <button type="button" onClick={() => setFeatures([...features, ""])}
          className="text-xs text-text-muted hover:text-text-primary transition-colors">+ Add Feature</button>
      </div>

      {/* Details */}
      <div className="pt-4 border-t border-border">
        <label className="block text-xs font-medium text-text-muted mb-2">Details</label>
        <div className="grid grid-cols-2 gap-3">
          {(["frameWidth", "lensHeight", "bridgeWidth", "templeLength", "weight", "material"] as const).map((field) => (
            <div key={field}>
              <label className="block text-[11px] text-text-muted mb-0.5 capitalize">{field.replace(/([A-Z])/g, " $1").trim()}</label>
              <input type="text" value={details[field]}
                onChange={(e) => setDetails({ ...details, [field]: e.target.value })}
                className="w-full border border-border px-3 py-2 text-sm bg-white outline-none focus:border-text-primary transition-colors" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary text-sm"
        >
          {saving ? "Saving…" : initial ? "Update Product" : "Create Product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="btn btn-ghost text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
