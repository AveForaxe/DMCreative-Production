/**
 * useActiveSection.js
 *
 * Custom hook untuk detect active section berdasarkan scroll position
 * menggunakan IntersectionObserver (performant, akurat di semua screen size)
 *
 * Single source of truth untuk semua components yang perlu track active section
 * (Header, DotsNav, CTA, dll)
 *
 * Usage:
 * const activeSection = useActiveSection(['hero', 'portfolio', 'services', 'contact']);
 */

import { useState, useEffect, useRef } from "react";

const DEFAULT_SECTIONS = ["hero", "portfolio", "services", "contact"];

export function useActiveSection(sectionIds = DEFAULT_SECTIONS) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  // Use ref to avoid re-creating observer when sectionIds reference changes
  const sectionIdsRef = useRef(sectionIds);

  useEffect(() => {
    sectionIdsRef.current = sectionIds;
  }, [sectionIds]);

  useEffect(() => {
    const ids = sectionIdsRef.current;

    // IntersectionObserver options
    // threshold: 0.4 → section dianggap active saat 40% terlihat
    // rootMargin: negative value di bawah untuk adjust trigger point
    const observerOptions = {
      threshold: 0.4,
      rootMargin: "0px 0px -30% 0px",
    };

    // Callback saat intersection state berubah
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        // Hanya set active jika entry sedang intersecting
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    // Create observer instance
    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions,
    );

    // Observe semua section yang diberikan
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      } else if (process.env.NODE_ENV !== "production") {
        console.warn(
          `[useActiveSection] Section dengan id "${id}" tidak ditemukan di DOM`,
        );
      }
    });

    // Cleanup: disconnect observer
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activeSection;
}
