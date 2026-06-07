import React, { useRef } from "react";
import { useReveal } from "../hooks/useReveal";

function PortfolioItem({ className, imgSrc, alt, category, title, aspect }) {
  const itemRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const item = itemRef.current;
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt angles
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;

    item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    item.style.transition = "none";
  };

  const handleMouseLeave = () => {
    if (!itemRef.current) return;
    const item = itemRef.current;
    item.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    item.style.transition = "transform 0.5s ease";
  };

  return (
    <div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`portfolio-item relative overflow-hidden cursor-pointer select-none reveal ${className}`}
    >
      <div className="overflow-hidden h-full w-full">
        <img
          src={imgSrc}
          alt={alt}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105 ${aspect || ""}`}
        />
      </div>

      {/* Premium overlay for desktop */}
      <div className="portfolio-overlay absolute inset-0 bg-[rgba(0,0,0,0.65)] flex flex-col justify-end p-8 md:p-10 opacity-0 hover:opacity-100 transition-opacity duration-500">
        <span className="portfolio-category inline-block px-3 py-1 bg-brand-red text-white text-[10px] font-semibold tracking-[0.15em] uppercase mb-4 w-fit">
          {category}
        </span>
        <h3 className="text-white text-xl md:text-2xl font-bold uppercase tracking-wide leading-tight">
          {title}
        </h3>
      </div>

      {/* Mobile label fallback */}
      <div className="portfolio-mobile-label flex md:hidden justify-between items-center mt-3">
        <span className="text-xs font-semibold tracking-[0.1em] uppercase text-on-surface-variant">
          {category}
        </span>
        <span className="material-symbols-outlined text-brand-red text-sm">
          north_east
        </span>
      </div>
    </div>
  );
}

export default function Portfolio() {
  useReveal("portfolio");

  const handleArchiveClick = () => {
    window.location.href = "/portfolio";
  };

  return (
    <section
      id="portfolio"
      className="portfolio-section py-16 md:py-28 px-6 md:px-10"
    >
      {/* Portfolio Section Header */}
      <div className="portfolio-header flex flex-col md:flex-row gap-8 justify-between items-start md:items-end mb-16 md:mb-20 reveal">
        <div className="portfolio-header-left text-left">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-4 text-white">
            Karya Kami
          </h2>
          <div className="portfolio-accent-line h-1 w-24 bg-brand-red"></div>
        </div>
        <p className="portfolio-header-right text-left text-on-surface-variant text-sm md:text-base leading-relaxed max-w-[480px]">
          Seleksi karya terbaik kami yang menangkap esensi dari setiap acara
          dengan ketajaman sinematik dan komposisi editorial.
        </p>
      </div>

      {/* Bento Grid layout */}
      <div className="portfolio-grid grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8">
        {/* Large Featured Item (Konser Musik) */}
        <PortfolioItem
          className="col-span-1 md:col-span-8"
          aspect="aspect-[4/3] md:aspect-[21/9]"
          imgSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuB2cBe74s2wtW2CGTWR-0rTK0RVz0klJAQSuxyVD0STbPBX1v_s-KEYJTmsM9HthKy_sUCk1tdz10cfY_aCIarpQ8Xuo1vWjKzhPGWJEyvhpgX6jrHUOerZCmyeIR7UB8AiO9dtkRzDJkKmwVayr5qIMm2Ma3LAPkFlgV8RG9fp9zX_nPAFzJ0bfmGvAzv7y5jzFZ0Poolh3knQlayAxGYU6wAKYm4J-00tRHvpok8Pi6MHa8NtV96-oVmmzm9f8LrRn-_lePVImIo"
          alt="Konser musik dengan pencahayaan panggung yang dramatis"
          category="Konser"
          title="Konser Musik: Midnight Symphony"
        />

        {/* Small Vertical Item (Wedding) */}
        <PortfolioItem
          className="col-span-1 md:col-span-4 reveal-delay-1"
          aspect="aspect-[4/3] md:h-full"
          imgSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAJ6_4o18CJSNhHW7w2QFTI1S2A7Aoiid1SYw8qqsSEOnap6cDz70nfJAJgC0wzg6Rk4M7EIHPN60Mhb_gGo1bX1w5k7BPlqVrlbVpsFkUlWemsIlPWXtL0_C9a9NBnLd_ukXhtR-9Ap8wZQjLtR1mcUmbkZiAoPcBkjTiISOzf7-fkzNA88Bx42gCrhTO0CtqvNPYG6ECjfCBycDb2nMhY0CnJ8q3qKFygEQ-uA-p_LalJH8tPGDeA4m6I7TDMQr5IkJFifvkR6s0"
          alt="Dekorasi pernikahan elegan dengan detail bunga merah"
          category="Wedding"
          title="Pernikahan Elegan: Arya & Siti"
        />

        {/* Medium Half Item (Corporate) */}
        <PortfolioItem
          className="col-span-1 md:col-span-6 reveal-delay-2"
          aspect="aspect-[4/3] md:aspect-[16/9]"
          imgSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAvWPUQ5dmiMjjF9FqB3WLUWVka4ANcG4-8TOk_NR1U3C5Q2Q9JKU0yLK5doEgL5pU0GmJwOvnNqPXTBOoI9gohaqOMXRhTolzS2QhyRDOJS4US3BhYiIYwNXiZvGprFnKoRXOsZObOB_eEYFCUnO4jtfEqi07lJI282OgpX1vMQP8AMe-PNuAbGYoeJwuxnQ0UMBgpLXDYM08cjb_kHkmCQsy8m3qNZqfGpE3zYecO2-BbVWlegfMKejt9HF1zTLTjMlwNoNCT7Qk"
          alt="Konferensi bisnis teknologi dengan layar LED besar"
          category="Corporate"
          title="Konferensi Bisnis: Tech Vision 2024"
        />

        {/* Medium Half Item (Festival) */}
        <PortfolioItem
          className="col-span-1 md:col-span-6 reveal-delay-3"
          aspect="aspect-[4/3] md:aspect-[16/9]"
          imgSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBL1XLOgSzgq7P5Hsvkcin9D_hhCMyo8XVdhva1mujBRTRaqAcagWHA3RabzOgQMCyFvoUOS_iVGbigXSc-opQILuykxrAZjDukdUIylLNnMv3dYB4aaSXqO5MRYUUC8KKuHnjMaoIj9BBb_rbe8okeUcFsluE1cSXkxp_d7J86_522xyqropm0E7PYdd1ziQRcAAaHB0-cXfH77YqTH2VTCFpUjWi-0_ehSLv64ZzpEpMSUTwR9o1BwjoR42DX7AkzeFi2usSDJik"
          alt="Festival musik outdoor dengan ribuan penonton"
          category="Festival"
          title="Festival Kota: Echoes of Sound"
        />
      </div>

      {/* Bento Grid footer archive button */}
      <div className="portfolio-footer flex justify-center mt-16 md:mt-20 reveal">
        <button
          onClick={handleArchiveClick}
          className="btn-link inline-flex items-center gap-4 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-white bg-transparent hover:text-brand-red cursor-pointer group transition-colors"
        >
          Lihat Portfolio Lengkap
          <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-2">
            arrow_forward
          </span>
        </button>
      </div>
    </section>
  );
}
