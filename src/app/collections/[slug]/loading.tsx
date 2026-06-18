export default function Loading() {
  return (
    <div className="pt-20 md:pt-24">
      <div className="container-main py-8 animate-pulse space-y-6">
        <div className="h-4 w-24 bg-surface-light border border-border" />
        <div className="h-8 w-64 bg-surface-light border border-border" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[4/5] bg-surface-light border border-border" />
          ))}
        </div>
      </div>
    </div>
  )
}
