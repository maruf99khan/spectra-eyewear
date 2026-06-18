export default function Loading() {
  return (
    <div className="pt-20 md:pt-24">
      <div className="container-main py-8 animate-pulse space-y-6">
        <div className="h-8 w-32 bg-surface-light border border-border" />
        <div className="h-4 w-48 bg-surface-light border border-border mb-8" />
        {[1, 2].map((i) => (
          <div key={i} className="h-24 bg-surface-light border border-border" />
        ))}
      </div>
    </div>
  )
}
