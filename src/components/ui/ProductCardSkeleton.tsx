import { Skeleton } from "./Skeleton"

export function ProductCardSkeleton() {
  return (
    <div className="block">
      <div className="aspect-[4/5] bg-surface-light border border-border/50 overflow-hidden mb-3 glass-card">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="space-y-2 px-0.5">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  )
}
