import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-bg-primary">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.03)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.02)_0%,transparent_50%)]" />
      <div className="absolute top-40 right-1/3 w-80 h-80 bg-black/[0.02] rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-black/[0.015] rounded-full blur-3xl" />

      <div className="container-main w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
          <div className="py-24 lg:py-0">
            <p className="section-label mb-6">Summer Collection 2026</p>

            <h1 className="font-heading font-bold text-[clamp(2.75rem,5vw+1rem,5rem)] leading-[0.9] tracking-tight text-text-primary mb-6">
              See the World
              <br />
              <span className="italic text-text-muted">Through New Eyes</span>
            </h1>

            <p className="text-text-secondary max-w-md mb-10 leading-relaxed">
              Precision-crafted eyewear for the discerning. Each frame engineered for clarity, designed for impact.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/collections/all"
                className="btn btn-primary text-sm px-10 py-3.5"
              >
                Shop the Collection
              </Link>
              <Link
                href="/collections/sunglasses"
                className="btn btn-secondary text-sm px-10 py-3.5"
              >
                View Sunglasses
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-14 pt-8 border-t border-border/50">
              <div>
                <p className="text-2xl font-heading font-bold text-text-primary tabular-nums">25+</p>
                <p className="text-xs text-text-muted tracking-wide">Years Crafting</p>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-text-primary tabular-nums">10K+</p>
                <p className="text-xs text-text-muted tracking-wide">Frames Designed</p>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-text-primary tabular-nums">50K+</p>
                <p className="text-xs text-text-muted tracking-wide">Happy Customers</p>
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
            <div className="relative aspect-[4/5] w-full min-h-[400px] lg:min-h-[600px] elevation-lg">
              <div className="absolute -inset-3 bg-bg-secondary/50 rounded-lg" />
              <div className="relative w-full h-full overflow-hidden radius-sm">
                <Image
                  src="/images/hero-product.jpg"
                  alt="Spectra eyewear"
                  fill
                  className="object-cover transition-transform duration-[800ms] hover:scale-[1.02]"
                  preload
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
