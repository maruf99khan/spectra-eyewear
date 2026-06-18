export default function Loading() {
  return (
    <div className="pt-20 md:pt-24">
      <div className="container-main py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-24 bg-surface-light border border-border" />
          <div className="h-8 w-48 bg-surface-light border border-border" />
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3 space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-surface-light border border-border" />
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="h-64 bg-surface-light border border-border sticky top-28" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
