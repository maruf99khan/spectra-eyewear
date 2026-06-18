import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"

const timeline = [
  { year: "2018", event: "Spectra founded in Milan with a vision to merge optical precision with design." },
  { year: "2019", event: "First collection launched — 12 frames, sold out in 3 weeks. Waitlist hits 5,000." },
  { year: "2020", event: "Opened flagship studio in Brooklyn. Introduced sustainable acetate program." },
  { year: "2021", event: "Beta titanium line debuts. Weight drops to 14g — lightest frame we've ever made." },
  { year: "2022", event: "Expanded to 30+ countries. Partnerships with leading opticians worldwide." },
  { year: "2024", event: "Launched 3D configurator. Customers can now customize every detail online." },
  { year: "2026", event: "50,000+ customers. Still designing. Still obsessed." },
]

const values = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "Precision Craftsmanship",
    description: "Every frame undergoes 47 quality checks before it reaches you. Made by hands that care.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: "Timeless Design",
    description: "We don't chase trends. We craft silhouettes that endure — season after season.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
        <path d="M21 3v5h-5"/>
      </svg>
    ),
    title: "Sustainable Innovation",
    description: "From recycled acetate packaging to biodegradable lens cloths — we design for tomorrow.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Community First",
    description: "50,000+ customers, one obsession: making eyewear that makes you feel seen.",
  },
]

export default function AboutPage() {
  return (
    <div className="pt-20 md:pt-24">
      <section className="container-main py-16 md:py-24">
        <AnimatedDiv className="max-w-3xl">
          <p className="text-accent text-xs uppercase tracking-[0.25em] font-medium mb-3">About</p>
          <h1 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-6">
            We Believe Great Vision
            <br />
            <span className="text-gradient">Should Look Beautiful</span>
          </h1>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl">
            Spectra was born from a simple belief: your eyewear should be as refined as your vision.
            We combine master craftsmanship with modern technology to create frames that are
            featherlight, durable, and unmistakably you.
          </p>
        </AnimatedDiv>
      </section>

      <section className="py-16 md:py-24 border-y border-border">
        <div className="container-main">
          <AnimatedDiv>
            <h2 className="text-2xl font-bold font-heading mb-12">Our Values</h2>
          </AnimatedDiv>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <AnimatedDiv key={v.title} delay={i * 0.1} className="glass rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-accent mb-4">
                  {v.icon}
                </div>
                <h3 className="text-sm font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{v.description}</p>
              </AnimatedDiv>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-main">
          <AnimatedDiv>
            <h2 className="text-2xl font-bold font-heading mb-12">Our Journey</h2>
          </AnimatedDiv>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
            <div className="space-y-8">
              {timeline.map((t, i) => (
                <AnimatedDiv
                  key={t.year}
                  delay={i * 0.05}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="hidden md:block w-1/2" />
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent -translate-x-1/2 mt-1.5 z-10" />
                  <div className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="text-sm font-bold text-accent">{t.year}</span>
                    <p className="text-sm text-text-secondary mt-1 leading-relaxed">{t.event}</p>
                  </div>
                </AnimatedDiv>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-border">
        <div className="container-main text-center">
          <AnimatedDiv>
            <h2 className="text-2xl font-bold font-heading mb-4">Ready to See the Difference?</h2>
            <p className="text-sm text-text-muted max-w-md mx-auto mb-8">
              Join 50,000+ customers who trust Spectra for their everyday vision.
            </p>
            <Link href="/collections/all">
              <Button size="lg">
                Shop the Collection <ArrowRight size={16} />
              </Button>
            </Link>
          </AnimatedDiv>
        </div>
      </section>
    </div>
  )
}
