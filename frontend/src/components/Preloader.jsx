import React, { useState, useEffect } from "react";

export default function Preloader() {
  const [isFadeOut, setIsFadeOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const MIN_DISPLAY = 1800;
    const start = Date.now();

    const finish = () => {
      const elapsed = Date.now() - start;
      const delay = Math.max(0, MIN_DISPLAY - elapsed);
      setTimeout(() => {
        setIsFadeOut(true);
        setTimeout(() => setIsHidden(true), 700);
      }, delay);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => window.removeEventListener("load", finish);
  }, []);

  if (isHidden) return null;

  return (
    <div
      id="preloader"
      className={`preloader fixed inset-0 z-[9999] min-h-screen w-full overflow-hidden bg-[linear-gradient(135deg,#0b0b0b_0%,#151515_45%,#0e0e0e_100%)] flex items-center justify-center px-4 py-8 sm:px-6 transition-all duration-[700ms] ease-in-out ${
        isFadeOut ? "opacity-0 invisible" : "opacity-100 visible"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(230,57,70,0.10),_transparent_30%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.04),_transparent_25%)]" />
      <div className="preloader-orb preloader-orb-one absolute left-1/4 top-1/4 h-36 w-36 rounded-full bg-brand-red/10 blur-3xl" />
      <div className="preloader-orb preloader-orb-two absolute bottom-1/4 right-1/4 h-44 w-44 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-[360px] flex-row items-center justify-center gap-5 text-center sm:max-w-[420px] md:max-w-[560px] md:gap-6 lg:gap-8">
        <div className="preloader-camera-shell relative flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-md animate-[fadeInUp_0.6s_0.2s_ease-out_forwards] sm:p-4">
          <div className="preloader-flash absolute inset-0 rounded-full" />
          <svg
            className="preloader-camera relative z-10 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24"
            viewBox="0 0 120 120"
            aria-label="Camera loading animation"
            role="img"
          >
            <defs>
              <linearGradient
                id="cameraBody"
                x1="0%"
                x2="100%"
                y1="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#F2F2F2" />
                <stop offset="100%" stopColor="#B6B6B6" />
              </linearGradient>
              <linearGradient
                id="cameraLens"
                x1="0%"
                x2="100%"
                y1="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#E63946" />
                <stop offset="100%" stopColor="#FF8A93" />
              </linearGradient>
            </defs>
            <rect
              x="18"
              y="38"
              width="72"
              height="44"
              rx="14"
              fill="url(#cameraBody)"
            />
            <rect x="24" y="31" width="28" height="10" rx="5" fill="#151515" />
            <rect x="58" y="25" width="16" height="10" rx="5" fill="#151515" />
            <rect
              x="24"
              y="44"
              width="68"
              height="34"
              rx="12"
              fill="rgba(12,12,12,0.08)"
            />
            <circle
              className="preloader-lens-ring"
              cx="54"
              cy="60"
              r="18"
              fill="none"
              stroke="url(#cameraLens)"
              strokeWidth="4"
            />
            <circle cx="54" cy="60" r="10" fill="#0C0C0C" />
            <circle
              className="preloader-lens-core"
              cx="54"
              cy="60"
              r="6.5"
              fill="url(#cameraLens)"
              opacity="0.95"
            />
            <circle
              className="preloader-lens-pulse"
              cx="54"
              cy="60"
              r="22"
              fill="none"
              stroke="rgba(230,57,70,0.35)"
              strokeWidth="2"
            />
            <rect
              x="82"
              y="40"
              width="10"
              height="10"
              rx="3"
              fill="#E63946"
              className="preloader-flash-dot"
            />
            <circle
              cx="87"
              cy="45"
              r="10"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="flex min-w-0 flex-col items-center justify-center gap-1 animate-[fadeInUp_0.6s_0.35s_ease-out_forwards] md:items-start md:text-left">
          <p className="text-[10px] uppercase tracking-[0.45em] text-white/70 sm:text-[11px]">
            DMCREAPRO
          </p>
          <h2 className="text-[24px] font-black uppercase tracking-[-0.04em] text-white sm:text-[28px] md:text-[32px] lg:text-[36px]">
            Mengabadikan Setiap Momen
          </h2>
          <p className="text-xs text-on-surface-variant sm:text-sm">
            Menyiapkan fokus, cahaya, dan detail visual yang tajam…
          </p>
        </div>

        <div className="hidden w-full max-w-[220px] animate-[fadeInUp_0.6s_0.5s_ease-out_forwards] sm:block sm:max-w-[260px] md:absolute md:bottom-[-18px] md:left-1/2 md:-translate-x-1/2">
          <div className="preloader-bar relative h-[3px] overflow-hidden rounded-full bg-white/10 shadow-inner">
            <div className="preloader-bar-fill preloader-bar-fill-anim absolute inset-y-0 left-0 h-full rounded-full bg-gradient-to-r from-brand-red via-[#ff6b73] to-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
