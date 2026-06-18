export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-surface-light animate-pulse ${className}`}
    />
  )
}
