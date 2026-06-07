import React, { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  const clientLogos = [
    "/images/client/Client (1).webp",
    "/images/client/Client (6).webp",
    "/images/client/Client (7).webp",
    "/images/client/Client (8).webp",
    "/images/client/Client (9).webp",
    "/images/client/Client (10).webp",
    "/images/client/Client (11).webp",
    "/images/client/Client (12).webp",
    "/images/client/Client (13).webp",
    "/images/client/Client (14).webp",
    "/images/client/Client (15).webp",
    "/images/client/Client (16).webp",
    "/images/client/Client (17).webp",
    "/images/client/Client (18).webp",
    "/images/client/Client (19).webp",
  ];

  // Parallax — disabled on mobile for perf
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const isMobile = window.innerWidth < 768;
      const scrollY = window.scrollY;
      const height = containerRef.current.offsetHeight;

      if (scrollY < height) {
        if (bgRef.current && !isMobile) {
          bgRef.current.style.transform = `translateY(${scrollY * 0.4}px) scale(1.05)`;
        }
        if (contentRef.current) {
          if (!isMobile) {
            contentRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
          }
          const fadeStart = height * 0.3;
          const opacity =
            scrollY > fadeStart
              ? Math.max(0, 1 - (scrollY - fadeStart) / (height * 0.7))
              : 1;
          contentRef.current.style.opacity = `${opacity}`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleConsultation = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReel = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="hero relative min-h-screen flex flex-col overflow-hidden pt-20"
    >
      {/* ── Parallax Background ── */}
      <div className="hero-bg absolute inset-0 z-0 bg-black overflow-hidden">
        <img
          ref={bgRef}
          src="/images/hero-bg.jpg"
          alt="Suasana panggung konser megah dengan pencahayaan dramatis"
          fetchPriority="high"
          loading="eager"
          className="w-full h-full object-cover opacity-40 saturate-[0.6] will-change-transform"
          style={{ transform: "scale(1.05)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-[rgba(19,19,19,0.6)] to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-background to-transparent z-[1]" />
      </div>

      {/* ── Hero Content — vertically centered in flex-1 ── */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-10 py-10">
        <div
          ref={contentRef}
          className="hero-content relative z-10 w-full max-w-[860px] text-center will-change-transform"
        >
          {/* Badge */}
          <span className="hero-badge inline-block px-4 py-2 bg-white/95 text-black text-[9px] md:text-[10px] font-bold tracking-[0.25em] uppercase mb-5 animate-[fadeInUp_0.8s_0.3s_both] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            EST. 2020
          </span>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase leading-[1.04] tracking-[-0.04em] mb-4 animate-[fadeInUp_0.8s_0.45s_both] text-white">
            Abadikan Momen Anda
            <br />
            <span className="text-brand-red">dengan Presisi</span>
          </h1>

          {/* Description */}
          <p className="hero-description mx-auto max-w-[560px] text-on-surface-variant text-sm md:text-base leading-relaxed mb-8 animate-[fadeInUp_0.8s_0.6s_both]">
            Jasa dokumentasi event profesional untuk konser, pernikahan, dan
            acara korporat dengan estetika modern. Kami menghadirkan standar
            visual galeri untuk setiap memori Anda.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeInUp_0.8s_0.75s_both]">
            <button
              onClick={handleConsultation}
              className="hero-cta-button hero-cta-primary px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase cursor-pointer"
            >
              Booking Sekarang
            </button>
            <button
              onClick={handleReel}
              className="hero-cta-button hero-cta-secondary px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase cursor-pointer bg-transparent"
            >
              Lihat Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* ── Clients Strip — anchored to bottom, no box ── */}
      <div className="clients-hero relative z-10 w-full pb-16 md:pb-12">

        {/* Divider with centered label */}
        <div className="flex items-center gap-5 px-6 md:px-14 lg:px-20 mb-7">
          <div className="flex-1 h-px bg-outline-variant/40" />
          <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-on-tertiary-container whitespace-nowrap">
            DIPERCAYA OLEH
          </span>
          <div className="flex-1 h-px bg-outline-variant/40" />
        </div>

        {/* Marquee Slider */}
        <div
          className="clients-slider overflow-hidden relative cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          {/* Track */}
          <div
            className="clients-track will-change-transform"
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            {/* Set 1 */}
            <div className="flex gap-10 sm:gap-14 lg:gap-16 items-center px-6 shrink-0">
              {clientLogos.map((logo, idx) => (
                <img
                  key={`a-${idx}`}
                  src={logo}
                  alt={`Client ${idx + 1}`}
                  className="client-logo select-none h-14 md:h-16 lg:h-20 w-auto object-contain transition-all duration-400"
                  draggable={false}
                />
              ))}
            </div>
            {/* Set 2 — seamless duplicate */}
            <div className="flex gap-10 sm:gap-14 lg:gap-16 items-center px-6 shrink-0">
              {clientLogos.map((logo, idx) => (
                <img
                  key={`b-${idx}`}
                  src={logo}
                  alt={`Client ${idx + 1}`}
                  className="client-logo select-none h-14 md:h-16 lg:h-20 w-auto object-contain transition-all duration-400"
                  draggable={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
