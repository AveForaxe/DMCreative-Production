import React, { useRef } from "react";
import { useReveal } from "../hooks/useReveal";

export default function CTA() {
  const btnRef = useRef(null);
  useReveal("contact");

  // Parallax Magnetic effect on Book Now button
  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const btn = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = "translate(0, 0)";
  };

  const handleBookNow = () => {
    window.location.href =
      "mailto:dmcproduction10@gmail.com?subject=Booking Inquiry - DMCREAPRO";
  };

  return (
    <section
      id="contact"
      className="cta-section py-20 md:py-36 text-center relative overflow-hidden px-6 md:px-10"
    >
      {/* Ambient glow backlight behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(230,57,70,0.08)_0%,transparent_70%)] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-8 reveal text-white">
          Siap Mengabadikan{" "}
          <>
            <br />
          </>
          'Memorable Moments' milikmu?
        </h2>

        <p className="text-on-surface-variant text-base md:text-lg leading-relaxed max-w-[640px] mx-auto mb-12 reveal reveal-delay-1">
          Setiap momen memiliki kesan berarti. Kami di sini untuk memastikan
          diabadikan dengan cara yang paling berkesan dan penuh makna.
        </p>

        <div className="flex flex-wrap justify-center gap-8 mb-12 reveal">
          {[
            {
              icon: "event",
              label: "200+ Event",
              sub: "Berhasil Didokumentasikan",
            },
            { icon: "star", label: "5.0 Rating", sub: "Kepuasan Klien" },
            { icon: "verified", label: "Est. 2020", sub: "Berpengalaman" },
            { icon: "schedule", label: "Respon Cepat", sub: "Dalam 1x24 Jam" },
          ].map(({ icon, label, sub }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 min-w-[100px]"
            >
              <span className="material-symbols-outlined text-brand-red text-3xl">
                {icon}
              </span>
              <span className="text-white font-bold text-sm">{label}</span>
              <span className="text-on-tertiary-container text-xs">{sub}</span>
            </div>
          ))}
        </div>

        <form
          className="w-full max-w-lg mx-auto mb-10 flex flex-col gap-4 text-left reveal reveal-delay-1"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.target);
            window.location.href = `mailto:dmcproduction10@gmail.com?subject=Booking - ${data.get("event")}&body=Nama: ${data.get("name")}%0AWA: ${data.get("phone")}%0AJenis Acara: ${data.get("event")}%0APesan: ${data.get("message")}`;
          }}
        >
          <input
            name="name"
            required
            placeholder="Nama Lengkap"
            className="w-full px-5 py-4 bg-surface-container border border-outline-variant text-white placeholder:text-on-tertiary-container text-sm focus:outline-none focus:border-brand-red transition-colors"
          />
          <input
            name="phone"
            required
            placeholder="Nomor WhatsApp"
            className="w-full px-5 py-4 bg-surface-container border border-outline-variant text-white placeholder:text-on-tertiary-container text-sm focus:outline-none focus:border-brand-red transition-colors"
          />
          <select
            name="event"
            className="w-full px-5 py-4 bg-surface-container border border-outline-variant text-white text-sm focus:outline-none focus:border-brand-red transition-colors appearance-none cursor-pointer"
          >
            <option value="Photography">Photography</option>
            <option value="Videography">Videography</option>
            <option value="Live Streaming">Live Streaming</option>
            <option value="Lainnya">Lainnya</option>
          </select>
          <textarea
            name="message"
            rows={3}
            placeholder="Ceritakan acara Anda..."
            className="w-full px-5 py-4 bg-surface-container border border-outline-variant text-white placeholder:text-on-tertiary-container text-sm focus:outline-none focus:border-brand-red transition-colors resize-none"
          />
          <button
            type="submit"
            className="w-full py-4 bg-brand-red text-white font-bold tracking-[0.2em] uppercase text-sm hover:bg-brand-red-dark transition-all duration-300 cursor-pointer"
          >
            Kirim Permintaan
          </button>
        </form>

        <p className="text-on-tertiary-container text-xs mb-6 reveal reveal-delay-2">
          — atau langsung hubungi —
        </p>

        <div className="cta-button-wrapper flex justify-center reveal reveal-delay-3">
          <button
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleBookNow}
            className="btn btn-cta bg-white text-black font-extrabold px-16 py-6 tracking-[0.4em] uppercase hover:text-white border-none cursor-pointer relative overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10">Abadikan Momenmu</span>
          </button>
        </div>
      </div>
    </section>
  );
}
