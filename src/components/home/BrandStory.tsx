"use client"

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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-text-primary leading-tight mb-6 text-balance">
              Crafted for Clarity.<br />Designed for Life.
            </h2>
            <div className="space-y-5 text-text-secondary leading-relaxed text-sm md:text-base">
              <p className="leading-relaxed">
                Born from a belief that eyewear should be as functional as it is beautiful, Spectra brings together
                master artisans and modern visionaries.
              </p>
              <p className="leading-relaxed">
                Every frame begins as a sketch, evolves through 3D modeling, and is meticulously hand-finished by
                craftspeople with decades of experience. The result is eyewear that feels as good as it looks — featherlight,
                durable, and unmistakably refined.
              </p>
              <p className="leading-relaxed">
                We source the finest Japanese acetate, beta titanium, and sustainably harvested woods. Each material
                chosen not just for beauty, but for longevity. Because the best frame is the one you never want to take off.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] bg-surface-light border border-border/50 overflow-hidden flex items-center justify-center card-shadow">
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto mb-6 border border-border/60 rounded-full flex items-center justify-center text-text-muted group-hover:bg-white/50 transition-all duration-300">
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

            <div className="absolute -bottom-6 -right-6 glass-strong p-6 hidden md:block shadow-sm border border-border/30">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-xl font-bold text-text-primary">{stat.value}</p>
                    <p className="text-[10px] uppercase tracking-wider text-text-muted mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:hidden gap-4 mt-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white border border-border/50 p-4 text-center card-shadow">
              <p className="text-lg font-bold text-text-primary">{stat.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
