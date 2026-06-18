export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border border-accent/30 rounded-full shimmer" />
        <p className="text-sm text-text-muted">Loading...</p>
      </div>
    </div>
  )
}
