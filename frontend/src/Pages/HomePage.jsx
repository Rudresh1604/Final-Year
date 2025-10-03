import React from "react";
import HeroSection from "../components/Home/HeroSection";
import ServicesSection from "../components/Home/ServiceSection";
import AboutSection from "../components/Home/AboutSection";
import LatestNewsSection from "../components/Home/LatestNewsSection";

const HomePage = () => {
  return (
    <div className="font-sans bg-gray-50 text-gray-800">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <LatestNewsSection />
      {/* <FAQSection /> */}
    </div>
  );
};

export default HomePage;
