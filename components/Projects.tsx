"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

import { ACCENT, EASE } from "@/lib/constants";

export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="proyectos"
      ref={ref}
      style={{ fontFamily: "'Inter', sans-serif", background: "#060606", color: "#fff" }}
      className="px-5 sm:px-8 md:px-12 py-24 md:py-36"
    >
      {/* Header */}
      <div className="flex items-end justify-between mb-12 md:mb-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-[10px] font-semibold tracking-widest uppercase mb-4"
            style={{ color: ACCENT }}
          >
            — Trabajo selecto
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
              className="font-semibold uppercase"
              style={{ fontSize: "clamp(2.4rem, 7vw, 6.5rem)", lineHeight: 0.88, fontWeight: 600 }}
            >
              Lo que<br />construimos.
            </motion.h2>
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
          className="hidden md:block text-xs font-semibold tracking-widest uppercase text-right"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          {projects.length} proyectos
        </motion.p>
      </div>

      {/* Grid — 2 columnas en desktop, 1 en mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {projects.map((project, i) => (
          <motion.a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.12 + i * 0.07 }}
            className="group relative block overflow-hidden"
            style={{
              aspectRatio: i === 0 ? "16/10" : "4/3",
              borderRadius: "4px",
            }}
          >
            {/* Imagen de fondo */}
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                unoptimized={project.image.includes("thum.io")}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #111 0%, #222 100%)" }} />
            )}

            {/* Overlay base — siempre presente para legibilidad */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%)" }}
            />

            {/* Overlay hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "rgba(0,0,0,0.45)" }}
            />

            {/* Número — top left */}
            <div className="absolute top-4 left-5 md:top-5 md:left-6">
              <span
                className="text-[10px] font-semibold tracking-widest uppercase transition-opacity duration-300 group-hover:opacity-0"
                style={{ color: ACCENT }}
              >
                0{i + 1}
              </span>
            </div>

            {/* Arrow — top right, visible on hover */}
            <div
              className="absolute top-4 right-4 md:top-5 md:right-5 w-9 h-9 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-white group-hover:border-white"
              style={{ borderColor: "rgba(255,255,255,0.3)" }}
            >
              <ArrowUpRight size={14} className="text-black" />
            </div>

            {/* Contenido inferior — siempre visible, se enriquece en hover */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              {/* Tags — aparecen en hover */}
              <div className="flex flex-wrap gap-2 mb-3 overflow-hidden h-0 group-hover:h-auto transition-all duration-300">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[9px] font-semibold tracking-widest uppercase px-2 py-1"
                    style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", borderRadius: "2px" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3
                className="font-semibold uppercase leading-none transition-transform duration-500 ease-out"
                style={{
                  fontSize: "clamp(1.2rem, 2.8vw, 2rem)",
                  fontWeight: 700,
                  color: "#fff",
                  transform: "translateY(0)",
                }}
              >
                {project.title}
              </h3>

              {/* Descripción — aparece en hover */}
              <p
                className="mt-2 text-[11px] leading-relaxed font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-400 max-w-sm"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {project.description}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
