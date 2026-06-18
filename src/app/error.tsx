"use client"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        <p className="text-6xl font-heading font-bold text-text-muted/20">500</p>
        <h1 className="text-lg font-heading font-semibold">Something went wrong</h1>
        <p className="text-sm text-text-muted">{error.message || "An unexpected error occurred."}</p>
        <button
          onClick={reset}
          className="mt-4 text-sm text-text-primary underline underline-offset-4 hover:text-text-secondary transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
