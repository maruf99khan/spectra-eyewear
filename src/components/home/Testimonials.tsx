"use client"

const testimonials = [
  {
    text: "The most comfortable frames I've ever worn. I forget I'm wearing them — but everyone reminds me how great they look.",
    author: "Alex M.",
    title: "Verified Buyer",
  },
  {
    text: "The 3D viewer on the site let me see every angle before buying. It felt like trying them on in person.",
    author: "Sarah K.",
    title: "Designer, NYC",
  },
  {
    text: "I've been through a dozen eyewear brands. Spectra is the first one I've reordered from. The quality is unmatched.",
    author: "James R.",
    title: "Architect, London",
  },
  {
    text: "Ordered prescription lenses with my frame — the clarity is extraordinary. You can tell every detail was considered.",
    author: "Maya L.",
    title: "Photographer, Tokyo",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-bg-primary">
      <div className="container-main">
        <div className="text-center mb-16">
          <p className="section-label justify-center mb-4">Testimonials</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-text-primary text-balance">Loved by Thousands</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card p-6 md:p-8 hover-lift">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#111" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="pt-3 border-t border-border/30">
                <p className="text-sm font-medium text-text-primary">{t.author}</p>
                <p className="text-xs text-text-muted mt-0.5">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
