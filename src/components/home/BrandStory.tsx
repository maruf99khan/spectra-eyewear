import Image from "next/image"

const stats = [
  { label: "Years Crafting", value: "25+" },
  { label: "Frames Designed", value: "10K+" },
  { label: "Happy Customers", value: "50K+" },
  { label: "Countries", value: "30+" },
]

export function BrandStory() {
  return (
    <section className="py-24 md:py-32 border-y border-border/50 bg-surface relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.01)_0%,transparent_60%)]" />
      <div className="container-main relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="section-label mb-4">Our Story</p>
            <h2 className="font-heading font-bold tracking-tight text-text-primary text-[clamp(1.75rem,3vw+0.5rem,3rem)] leading-tight mb-6">
              Crafted for Clarity.<br />Designed for Life.
            </h2>
            <div className="space-y-5 text-text-secondary leading-relaxed">
              <p>
                Born from a belief that eyewear should be as functional as it is beautiful, Spectra brings together
                master artisans and modern visionaries.
              </p>
              <p>
                Every frame begins as a sketch, evolves through 3D modeling, and is meticulously hand-finished by
                craftspeople with decades of experience.
              </p>
              <p>
                We source the finest Japanese acetate, beta titanium, and sustainably harvested woods. Each material
                chosen not just for beauty, but for longevity.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] bg-surface-light border border-border/50 overflow-hidden elevation-hover radius-sm">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-6 border border-border/60 rounded-full flex items-center justify-center text-text-muted">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12h2l3.5-7 3.5 7 3.5-7 3.5 7H22"/>
                      <circle cx="9" cy="15" r="2"/>
                      <circle cx="15" cy="15" r="2"/>
                    </svg>
                  </div>
                  <blockquote className="text-sm md:text-base text-text-muted italic max-w-xs mx-auto leading-relaxed">
                    &ldquo;We don&apos;t just make glasses. We craft instruments of vision.&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white border border-border elevation-md p-6 hidden md:block radius-sm">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-xl font-bold text-text-primary tabular-nums">{stat.value}</p>
                    <p className="text-[10px] uppercase tracking-wider text-text-muted mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:hidden gap-4 mt-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white border border-border/50 p-4 text-center elevation-sm radius-sm">
              <p className="text-lg font-bold text-text-primary tabular-nums">{stat.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
