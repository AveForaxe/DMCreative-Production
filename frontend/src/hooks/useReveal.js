import { useEffect } from "react";

/**
 * useReveal — shared IntersectionObserver hook for .reveal scroll animations
 * @param {string} sectionId — the parent section id to scope queries
 */
export function useReveal(sectionId) {
  useEffect(() => {
    const revealElements = document.querySelectorAll(`#${sectionId} .reveal`);
    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.1 },
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionId]);
}
