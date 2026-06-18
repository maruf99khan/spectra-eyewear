import { Hero } from "@/components/home/Hero"
import { FeaturedCollections } from "@/components/home/FeaturedCollections"
import { Bestsellers } from "@/components/home/Bestsellers"
import { BrandStory } from "@/components/home/BrandStory"
import { Testimonials } from "@/components/home/Testimonials"
import { Newsletter } from "@/components/home/Newsletter"

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <Bestsellers />
      <BrandStory />
      <Testimonials />
      <Newsletter />
    </>
  )
}
