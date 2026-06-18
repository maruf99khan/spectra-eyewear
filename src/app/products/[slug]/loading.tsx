export default function Loading() {
  return (
    <div className="pt-20 md:pt-24">
      <div className="container-main py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-24 bg-surface-light border border-border" />
          <div className="h-8 w-48 bg-surface-light border border-border" />
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="aspect-[4/5] bg-surface-light border border-border" />
            <div className="space-y-6">
              <div className="h-4 w-20 bg-surface-light border border-border" />
              <div className="h-8 w-64 bg-surface-light border border-border" />
              <div className="h-6 w-32 bg-surface-light border border-border" />
              <div className="h-10 w-full bg-surface-light border border-border mt-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
