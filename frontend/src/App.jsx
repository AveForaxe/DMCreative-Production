import React from "react";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import DotsNav from "./components/DotsNav";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import MobileWAButton from "./components/MobileWAButton";

export default function App() {
  return (
    <div className="relative min-h-screen bg-background text-on-surface">
      {/* Dynamic Global Enhancements */}
      <Preloader />
      <CustomCursor />
      <DotsNav />

      {/* Main Layout: left padding sesuai responsive sidebar width */}
      <div className="md:pl-16 lg:pl-[72px] min-h-screen flex flex-col pb-16 md:pb-0">
        <Header />

        <main className="flex-grow">
          <Hero />
          <Portfolio />
          <Services />
          <CTA />
        </main>

        <Footer />
        <MobileWAButton />
      </div>
    </div>
  );
}
