import React, { useState, useEffect, useRef } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  // Unified section detection via IntersectionObserver (replaces scroll listener)
  const activeSection = useActiveSection(['hero', 'portfolio', 'services', 'contact']);

  const lastScrollYRef = useRef(0);
  const ctaBtnRef = useRef(null);

  // Handle scroll: minify header bg + hide/show on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 1. Minify header bg
      setIsScrolled(scrollY > 50);

      // 2. Hide on scroll down, show on scroll up
      const lastScrollY = lastScrollYRef.current;
      if (scrollY > lastScrollY && scrollY > 200) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollYRef.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Magnetic button hover effect
  const handleMouseMove = (e) => {
    if (!ctaBtnRef.current) return;
    const btn = ctaBtnRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    if (!ctaBtnRef.current) return;
    ctaBtnRef.current.style.transform = 'translate(0, 0)';
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const target = document.getElementById(id);
    if (target) {
      const headerHeight = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Mobile Nav Overlay */}
      <div
        id="mobileNavOverlay"
        className={`mobile-nav-overlay fixed inset-0 z-90 bg-[rgba(19,19,19,0.98)] flex flex-col justify-center items-center gap-10 transition-opacity duration-500 ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <a
          href="#portfolio"
          onClick={(e) => scrollToSection(e, 'portfolio')}
          className="text-3xl font-bold uppercase hover:text-brand-red transition-colors"
        >
          Portfolio
        </a>
        <a
          href="#services"
          onClick={(e) => scrollToSection(e, 'services')}
          className="text-3xl font-bold uppercase hover:text-brand-red transition-colors"
        >
          Services
        </a>
        <a
          href="#contact"
          onClick={(e) => scrollToSection(e, 'contact')}
          className="text-3xl font-bold uppercase hover:text-brand-red transition-colors"
        >
          Hubungi Kami
        </a>
      </div>

      {/* Main Sticky Header */}
      <header
        id="siteHeader"
        className={`site-header fixed z-100 top-0 left-0 md:left-16 lg:left-[72px] w-full md:w-[calc(100%-4rem)] lg:w-[calc(100%-72px)] h-20 flex justify-between items-center px-6 md:px-10 border-b border-outline-variant transition-all duration-300 ${
          isScrolled ? 'bg-[rgba(19,19,19,0.95)]' : 'bg-[rgba(19,19,19,0.85)]'
        } backdrop-blur-md`}
        style={{
          transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        {/* Logo */}
        <div
          onClick={(e) => scrollToSection(e, 'hero')}
          className="site-logo text-2xl md:text-3xl font-black tracking-[-0.04em] uppercase text-white cursor-pointer select-none"
        >
          DMCREAPRO
        </div>

        {/* Desktop Navigation */}
        <nav className="site-nav hidden md:flex gap-10">
          <a
            href="#portfolio"
            onClick={(e) => scrollToSection(e, 'portfolio')}
            className={`text-sm font-semibold uppercase tracking-[0.1em] hover:text-white transition-colors relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-brand-red after:transition-all after:duration-400 ${
              activeSection === 'portfolio'
                ? 'text-white after:w-full'
                : 'text-on-surface-variant after:w-0'
            }`}
          >
            Portfolio
          </a>
          <a
            href="#services"
            onClick={(e) => scrollToSection(e, 'services')}
            className={`text-sm font-semibold uppercase tracking-[0.1em] hover:text-white transition-colors relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-brand-red after:transition-all after:duration-400 ${
              activeSection === 'services'
                ? 'text-white after:w-full'
                : 'text-on-surface-variant after:w-0'
            }`}
          >
            Services
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            className={`text-sm font-semibold uppercase tracking-[0.1em] hover:text-white transition-colors relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-brand-red after:transition-all after:duration-400 ${
              activeSection === 'contact'
                ? 'text-white after:w-full'
                : 'text-on-surface-variant after:w-0'
            }`}
          >
            Contact
          </a>
        </nav>

        {/* CTA Button */}
        <button
          ref={ctaBtnRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={(e) => scrollToSection(e, 'contact')}
          className="btn btn-primary header-cta hidden md:inline-flex px-8 py-3 text-xs font-semibold tracking-[0.2em] text-white bg-brand-red hover:text-black border-none cursor-pointer relative overflow-hidden transition-all"
        >
          <span className="relative z-10">GET IN TOUCH</span>
        </button>

        {/* Burger Mobile Toggle */}
        <button
          id="mobileNavToggle"
          className="mobile-nav-toggle flex md:hidden flex-col gap-[6px] w-7 cursor-pointer z-[200] border-none bg-none outline-none"
          onClick={() => {
            setIsMobileOpen(!isMobileOpen);
            document.body.style.overflow = !isMobileOpen ? 'hidden' : '';
          }}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block h-[2px] w-full bg-white transition-all duration-300 ${
              isMobileOpen ? 'rotate-45 translate-y-[8px]' : ''
            }`}
          ></span>
          <span
            className={`block h-[2px] w-full bg-white transition-all duration-300 ${
              isMobileOpen ? 'opacity-0' : 'opacity-100'
            }`}
          ></span>
          <span
            className={`block h-[2px] w-full bg-white transition-all duration-300 ${
              isMobileOpen ? '-rotate-45 -translate-y-[8px]' : ''
            }`}
          ></span>
        </button>
      </header>
    </>
  );
}
