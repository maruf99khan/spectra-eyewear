export default function Loading() {
  return (
    <div className="py-20 md:py-28">
      <div className="container-main animate-pulse space-y-6">
        <div className="h-8 w-48 bg-surface-light border border-border" />
        <div className="h-4 w-32 bg-surface-light border border-border mb-12" />
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-surface-light border border-border" />
          ))}
        </div>
      </div>
    </div>
  )
}
