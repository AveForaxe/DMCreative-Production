import React from "react";
import { useReveal } from "../hooks/useReveal";

export default function Services() {
  useReveal("services");

  const servicesData = [
    {
      num: "01",
      title: "Photography",
      description:
        "Wedding, Pre-wedding, Event Gathering, Graduation, Event Documentation, dan lainnya.",
      usp: "Hasil galeri editorial dengan editing profesional dalam 7 hari kerja.",
    },
    {
      num: "02",
      title: "Videography",
      description:
        "Company Profile, Video Product, After Movie, Film Production, Bumper, Teaser, Visual Effect, dan lainnya.",
      usp: "Sinematografi sinematik dengan color grading premium, siap publish dalam 14 hari.",
    },
    {
      num: "03",
      title: "Live Streaming",
      description:
        "YouTube Streaming, Zoom Streaming, Campers, Broadcaster, dan lainnya.",
      usp: "Multi-platform streaming dengan bitrate stabil dan tim teknis berpengalaman.",
    },
  ];

  return (
    <section
      id="services"
      className="services-section py-16 md:py-28 bg-surface-container-lowest border-y border-outline-variant"
    >
      <div className="services-wrapper max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-20 px-6 md:px-10">
        {/* Services Sidebar */}
        <div className="services-sidebar w-full md:w-1/3 text-left reveal">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-8 text-white">
            Layanan
            <br />
            Kami
          </h2>
          <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-8">
            Abadikan "memorable moment" mu bersama keluarga, pasangan, atau
            kegiatanmu bersama kami DMCREAPRO
          </p>

          {/* Equipment highlight card */}
          <div className="services-equipment-card p-8 border border-brand-red bg-background text-left transition-all duration-300 hover:border-white">
            <span className="material-symbols-outlined text-4xl text-brand-red mb-4 block select-none">
              verified
            </span>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white mb-2">
              100% High Performance
            </h4>
            <p className="text-xs text-on-tertiary-container leading-relaxed">
              Kemampuan, Tanggung Jawab, Disiplin, Kerapihan, Public Speaking,
              hingga Quality of Personality.
            </p>
          </div>
        </div>

        {/* Services List items */}
        <div className="services-list flex-1 flex flex-col gap-[1px] bg-outline-variant overflow-hidden">
          {servicesData.map((service, idx) => (
            <div
              key={`service-${idx}`}
              className="service-item group bg-background p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 justify-between items-start md:items-center transition-all duration-300 hover:bg-surface-container-high reveal"
            >
              <div className="service-item-content flex items-center gap-8 text-left">
                {/* Outlined numbers with interactive scale-up & glow */}
                <span
                  className="service-number text-5xl md:text-6xl font-black text-transparent opacity-20 select-none transition-all duration-300 leading-none group-hover:opacity-100 group-hover:scale-110"
                  style={{
                    WebkitTextStroke: "1px rgba(198, 198, 198, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.WebkitTextStroke = "1px #E63946";
                    e.target.style.textShadow =
                      "0 0 30px rgba(230, 57, 70, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.WebkitTextStroke =
                      "1px rgba(198, 198, 198, 0.3)";
                    e.target.style.textShadow = "none";
                  }}
                >
                  {service.num}
                </span>

                <div>
                  <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {service.description}
                  </p>
                  <p className="text-xs text-brand-red italic mt-1">
                    {service.usp}
                  </p>
                </div>
              </div>

              {/* Action learn more button */}
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="btn btn-sm shrink-0 border border-white hover:border-brand-red text-white text-[10px] font-semibold tracking-wider px-6 py-2 bg-transparent cursor-pointer relative overflow-hidden transition-all duration-300"
              >
                <span className="relative z-10">Learn More</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
