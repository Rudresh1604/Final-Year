import React from 'react'
import HeroSection from '../components/Home/HeroSection'
import ServicesSection from '../components/Home/ServiceSection'

const Home = () => {
  return (
    <div className="font-sans bg-gray-50 text-gray-800">
      <HeroSection />
      <ServicesSection />
      {/* <AboutUsSection /> */}
      {/* <LatestNewsSection /> */}
      {/* <FAQSection /> */}
    </div>
  )
}

export default Home