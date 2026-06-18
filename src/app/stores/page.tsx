import { MapPin, Phone, Clock, ArrowRight } from "lucide-react"
import { Store } from "@/types"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"

const stores: Store[] = [
  {
    id: "milan",
    name: "Spectra Milano",
    address: "Via della Spiga 24",
    city: "Milan",
    country: "Italy",
    phone: "+39 02 1234 5678",
    hours: "Mon-Sat 10:00-19:30",
    coordinates: [45.467, 9.195],
  },
  {
    id: "nyc",
    name: "Spectra Brooklyn",
    address: "123 Wythe Avenue",
    city: "Brooklyn, NY",
    country: "United States",
    phone: "+1 (212) 555-0198",
    hours: "Mon-Sat 10:00-20:00, Sun 11:00-18:00",
    coordinates: [40.72, -73.957],
  },
  {
    id: "tokyo",
    name: "Spectra Tokyo",
    address: "5-3-1 Minami Aoyama, Minato-ku",
    city: "Tokyo",
    country: "Japan",
    phone: "+81 3-1234-5678",
    hours: "Mon-Sat 11:00-20:00, Sun 11:00-19:00",
    coordinates: [35.663, 139.71],
  },
  {
    id: "london",
    name: "Spectra London",
    address: "42 Mount Street, Mayfair",
    city: "London",
    country: "United Kingdom",
    phone: "+44 20 7946 0958",
    hours: "Mon-Sat 10:00-19:00, Sun 12:00-17:00",
    coordinates: [51.51, -0.149],
  },
]

export default function StoresPage() {
  return (
    <div className="pt-20 md:pt-24">
      <section className="container-main py-16 md:py-24">
        <AnimatedDiv className="mb-12">
          <p className="text-accent text-xs uppercase tracking-[0.25em] font-medium mb-3">Visit Us</p>
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">Our Stores</h1>
          <p className="text-sm text-text-muted max-w-md">
            Experience Spectra in person. Try on our full collection and consult with our optical specialists.
          </p>
        </AnimatedDiv>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="aspect-[16/9] md:aspect-auto md:row-span-2 glass rounded-2xl overflow-hidden flex items-center justify-center min-h-[400px]">
            <div className="text-center p-8">
              <MapPin size={40} className="text-accent/50 mx-auto mb-4" />
              <p className="text-sm text-text-muted">Interactive map placeholder</p>
            </div>
          </div>

          <div className="space-y-4">
            {stores.map((store, i) => (
              <AnimatedDiv
                key={store.id}
                delay={i * 0.1}
                className="glass rounded-2xl p-5"
              >
                <h3 className="text-sm font-semibold mb-2">{store.name}</h3>
                <div className="space-y-1.5 text-xs text-text-muted mb-3">
                  <p className="flex items-center gap-2">
                    <MapPin size={12} className="flex-shrink-0" />
                    {store.address}, {store.city}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={12} className="flex-shrink-0" />
                    {store.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={12} className="flex-shrink-0" />
                    {store.hours}
                  </p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(store.name + " " + store.address + " " + store.city)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-accent hover:text-accent-light transition-colors flex items-center gap-1"
                >
                  Get Directions <ArrowRight size={12} />
                </a>
              </AnimatedDiv>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
