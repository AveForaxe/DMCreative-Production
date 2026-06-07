/**
 * DotsNav.jsx - Section Indicator Navigation Sidebar
 *
 * Refactored Phase 1:
 * ✅ IntersectionObserver untuk akurat section detection (via useActiveSection hook)
 * ✅ Responsive widths: 72px desktop, 64px tablet, hidden mobile
 * ✅ Smooth spring-like animations
 * ✅ Subtle red glow (0.4 opacity, not 0.7)
 * ✅ Proper accessibility (aria labels, keyboard nav, focus visible)
 * ✅ Tooltip positioning fixed (no overflow)
 */

import React from "react";
import { useActiveSection } from "../hooks/useActiveSection";

// Single source of truth untuk sections
const SECTIONS = [
  { id: "hero", label: "Home", icon: "home" },
  { id: "portfolio", label: "Portfolio", icon: "collections" },
  { id: "services", label: "Layanan", icon: "verified" },
  { id: "contact", label: "Kontak", icon: "mail" },
];

const SECTION_IDS = SECTIONS.map((s) => s.id);

export default function DotsNav() {
  // Unified section detection via IntersectionObserver
  const activeSection = useActiveSection(SECTION_IDS);

  // Visibility: show on all sections including home
  const isVisible = true;

  /**
   * Smooth scroll to section with header offset
   */
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const headerHeight = 80;
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({ top: targetPosition, behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={[
          // Hidden on mobile, flex on md+
          "hidden md:flex",
          // Fixed sidebar, full height
          "fixed left-0 top-0 h-screen",
          // Responsive width: 64px tablet (md), 72px desktop (lg)
          "w-16 lg:w-[72px]",
          // Background & border
          "bg-surface-container-lowest border-r border-outline-variant",
          // Layout
          "flex-col justify-between items-center",
          // Responsive padding
          "py-6 lg:py-8",
          // Z-index
          "z-50",
          // Visibility transition
          "transition-opacity duration-500",
          isVisible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
        role="navigation"
        aria-label="Section navigation"
      >
        {/* ── TOP: Logo / Home Button ──────────────────────────────── */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={(e) => scrollToSection(e, "hero")}
            className="
            flex items-center justify-center
            w-9 h-9 lg:w-10 lg:h-10
            rounded-full
            hover:bg-surface-container-low
            transition-all duration-300
            group cursor-pointer
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red
          "
            aria-label="Scroll ke bagian atas (Hero)"
            title="Home"
          >
            <span
              className="
              material-symbols-outlined
              text-white
              text-[20px] lg:text-[24px]
              group-hover:text-brand-red
              group-hover:scale-110
              transition-all duration-300
            "
            >
              photo_camera
            </span>
          </button>
        </div>

        {/* ── MIDDLE: Dots Navigation ───────────────────────────────── */}
        <div className="relative flex flex-col items-center gap-4 lg:gap-5">
          {/* Vertical track line (connects dots) */}
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-outline-variant pointer-events-none z-0"
            aria-hidden="true"
          />

          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <div
                key={section.id}
                className="relative z-10 flex items-center justify-center"
              >
                <a
                  href={`#${section.id}`}
                  onClick={(e) => scrollToSection(e, section.id)}
                  className="
                  flex items-center justify-center
                  w-8 h-8
                  group relative
                  rounded-full
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red
                "
                  aria-label={`Navigasi ke ${section.label}`}
                  aria-current={isActive ? "page" : undefined}
                  title={section.label}
                >
                  {/* Tooltip Label (appears on hover) */}
                  <span
                    className="
                    absolute left-12
                    px-3 py-1.5
                    bg-black border border-outline-variant
                    rounded-sm
                    text-white text-[10px] font-bold
                    uppercase tracking-[0.15em]
                    whitespace-nowrap
                    pointer-events-none
                    shadow-xl
                    opacity-0
                    -translate-x-2
                    transition-all duration-300
                    group-hover:opacity-100
                    group-hover:translate-x-0
                  "
                    role="tooltip"
                  >
                    {section.label}
                  </span>

                  {/* Icon */}
                  <span
                    className={[
                      "material-symbols-outlined transition-all flex items-center justify-center",
                      isActive
                        ? "text-brand-red text-[18px] lg:text-[20px] drop-shadow-[0_0_8px_rgba(230,57,70,0.4)] scale-110"
                        : "text-outline text-[16px] lg:text-[18px] group-hover:text-white group-hover:scale-110",
                    ].join(" ")}
                    style={{
                      transitionDuration: "400ms",
                      transitionTimingFunction: isActive
                        ? "cubic-bezier(0.34, 1.56, 0.64, 1)"
                        : "cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    aria-hidden="true"
                  >
                    {section.icon}
                  </span>
                </a>
              </div>
            );
          })}
        </div>

        {/* ── BOTTOM: Social Links ──────────────────────────────────── */}
        <div className="flex flex-col items-center gap-4 lg:gap-5">
          <SocialLink
            href="https://instagram.com/dmcreapro"
            label="Instagram"
            icon="instagram"
          />
          <SocialLink
            href="https://tiktok.com/@dmcreapro"
            label="TikTok"
            icon="tiktok"
          />
          <SocialLink
            href="https://facebook.com/dmcreapro"
            label="Facebook"
            icon="facebook"
          />
        </div>
      </nav>

      {/* Mobile Bottom Nav — only on mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center h-16 px-2 bg-[rgba(19,19,19,0.92)] backdrop-blur-xl shadow-[0_-10px_30px_rgba(0,0,0,0.35)] border-t border-white/5">
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => scrollToSection(e, section.id)}
              className="flex flex-col items-center gap-1 min-w-[44px] min-h-[44px] justify-center"
              aria-label={section.label}
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-colors duration-300 ${isActive ? "text-brand-red" : "text-on-tertiary-container"}`}
              >
                {section.icon}
              </span>
              <span
                className={`text-[9px] font-semibold uppercase tracking-wide transition-colors duration-300 ${isActive ? "text-brand-red" : "text-on-tertiary-container"}`}
              >
                {section.label}
              </span>
            </a>
          );
        })}
      </nav>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SocialLink - Reusable social icon button
────────────────────────────────────────────────────────────────── */
function SocialLink({ href, label, icon }) {
  const icons = {
    instagram: (
      <svg
        className="w-4 h-4 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    tiktok: (
      <svg
        className="w-4 h-4 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M16.6 3.2c.4 2.2 1.8 3.5 4.1 3.9v3.2c-1.4.1-2.7-.3-4-.9v5.3c0 3.1-2.5 5.6-5.6 5.6S5.5 18.9 5.5 15.8 8 10.2 11.1 10.2c.4 0 .7 0 1.1.1v3.2c-.4-.1-.8-.2-1.2-.2-1.7 0-3.1 1.4-3.1 3.1s1.4 3.1 3.1 3.1 3.1-1.4 3.1-3.1V3.2h2.5z" />
      </svg>
    ),
    facebook: (
      <svg
        className="w-4 h-4 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M13.5 22v-9h3l.4-3h-3.4V3.8c0-.9.3-1.5 1.6-1.5h1.7V.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H6.5v3h2.8v9h4.2z" />
      </svg>
    ),
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        text-on-tertiary-container hover:text-white
        transition-all duration-300
        flex items-center justify-center
        w-7 h-7 lg:w-8 lg:h-8
        group rounded-full
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red
      "
      aria-label={label}
      title={label}
    >
      <span className="group-hover:scale-110 transition-transform duration-300">
        {icons[icon] ?? icons.instagram}
      </span>
    </a>
  );
}
