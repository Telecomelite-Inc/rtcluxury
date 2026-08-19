import Hero from '../components/Hero.jsx'
import StatsBar from '../components/StatsBar.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import FeaturedListings from '../components/FeaturedListings.jsx'
import Testimonials from '../components/Testimonials.jsx'
import CTASection from '../components/CTASection.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <HowItWorks />
      <FeaturedListings />
      <Testimonials />
      <CTASection />
    </>
  )
}
