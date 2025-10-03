import React from 'react'
import HeroSection from '../components/Home/HeroSection'
import ServicesSection from '../components/Home/ServiceSection'
import AboutSection from '../components/Home/AboutSection'

const Home = () => {
  return (
    <div className="font-sans bg-gray-50 text-gray-800">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      {/* <LatestNewsSection /> */}
      {/* <FAQSection /> */}
    </div>
  )
}

export default Home