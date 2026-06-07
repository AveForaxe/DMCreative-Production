import React from "react";

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="footer"
      className="site-footer w-full py-16 md:py-28 bg-surface-container-lowest border-t border-outline-variant px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto text-left">
        {/* Footer Top Title Logo */}
        <div
          onClick={scrollToTop}
          className="footer-logo text-4xl md:text-5xl font-black tracking-[-0.03em] uppercase text-white cursor-pointer select-none mb-12 hover:text-brand-red transition-colors inline-block"
        >
          DMCREAPRO
        </div>

        {/* 3-Column Grid */}
        <div className="footer-grid grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 border-b border-outline-variant pb-12 mb-8">
          {/* Column 1: Address */}
          <div className="footer-col text-left">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white mb-4">
              Kantor
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-[320px]">
              Jl. Raya Genengan, Pakisaji, Kab. Malang
              <br /> Jawa Timur 65162
            </p>
          </div>

          {/* Column 2: Socials */}
          <div className="footer-col text-left">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white mb-4">
              Socials
            </h4>
            <div className="footer-links flex flex-col gap-2">
              <a
                href="https://instagram.com/dmcreapro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold tracking-widest uppercase text-on-tertiary-container hover:text-white underline underline-offset-4 transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com/dmcreapro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold tracking-widest uppercase text-on-tertiary-container hover:text-white underline underline-offset-4 transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://tiktok.com/@dmcreapro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold tracking-widest uppercase text-on-tertiary-container hover:text-white underline underline-offset-4 transition-colors"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* Column 3: Legal */}
          <div className="footer-col text-left">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white mb-4">
              Contact
            </h4>
            <div className="footer-links flex flex-col gap-2">
              <a
                href="mailto:dmcproduction10@gmail.com"
                className="text-xs font-semibold tracking-widest uppercase text-on-tertiary-container hover:text-white underline underline-offset-4 transition-colors"
              >
                dmcproduction10@gmail.com
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold tracking-widest uppercase text-on-tertiary-container hover:text-white underline underline-offset-4 transition-colors"
              >
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom copyright details */}
        <div className="footer-bottom flex flex-col md:flex-row gap-4 justify-between items-start md:items-center text-left md:text-right text-xs font-semibold tracking-widest text-on-tertiary-container uppercase">
          <span>
            &copy; {new Date().getFullYear()} DMCREAPRO. All rights reserved.
          </span>
          <span>Est. 2020</span>
        </div>
      </div>
    </footer>
  );
}
