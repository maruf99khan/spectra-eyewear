import Link from "next/link"

export default function AuthErrorPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20">
      <div className="w-full max-w-sm mx-auto px-6 text-center">
        <h1 className="text-2xl font-heading font-bold tracking-tight text-text-primary mb-2">Authentication error</h1>
        <p className="text-sm text-text-muted mb-8">
          Something went wrong during authentication. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/auth/login" className="btn btn-primary text-sm px-6 py-2.5">
            Try Again
          </Link>
          <Link href="/" className="btn btn-secondary text-sm px-6 py-2.5">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
