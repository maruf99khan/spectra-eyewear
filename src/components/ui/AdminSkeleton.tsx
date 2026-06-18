import { Skeleton } from "./Skeleton"

export function AdminSkeleton() {
  return (
    <div className="grid md:grid-cols-4 gap-6 mb-12">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="glass-card p-6">
          <Skeleton className="w-6 h-6 mb-4" />
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  )
}
