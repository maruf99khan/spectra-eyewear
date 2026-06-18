import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto rounded-full border border-accent/30 flex items-center justify-center">
            <span className="text-4xl font-bold text-gradient">404</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold font-heading mb-3">Lost Your Way?</h1>
        <p className="text-sm text-text-muted mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Even the best frames occasionally misplace things.
        </p>
        <Link href="/">
          <Button>
            <ArrowLeft size={16} /> Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
