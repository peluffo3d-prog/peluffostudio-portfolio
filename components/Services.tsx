"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";

import { ACCENT, EASE } from "@/lib/constants";

export default function Services() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="servicios"
      ref={ref}
      style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#000" }}
      className="px-5 sm:px-8 md:px-12 py-24 md:py-36"
    >
      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
        className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-5"
        style={{ color: ACCENT }}
      >
        — Servicios
      </motion.p>

      {/* Heading */}
      <div className="overflow-hidden mb-16 md:mb-24">
        <motion.h2
          initial={{ y: "110%" }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          className="font-semibold uppercase text-black"
          style={{ fontSize: "clamp(2.4rem, 7vw, 6.5rem)", lineHeight: 0.88, fontWeight: 600 }}
        >
          Cómo te ayudamos
        </motion.h2>
      </div>

      {/* Lista de servicios */}
      <div>
        {services.map((service, i) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.18 + i * 0.09 }}
            className="group flex items-start md:items-center justify-between gap-6 py-7 border-t border-black/10"
            style={{ borderBottom: i === services.length - 1 ? "1px solid rgba(0,0,0,0.10)" : undefined }}
          >
            {/* Left */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold tracking-widest uppercase mb-2" style={{ color: ACCENT }}>
                0{i + 1}
              </p>
              <h3
                className="font-semibold uppercase"
                style={{ fontSize: "clamp(1.3rem, 3.2vw, 2.8rem)", lineHeight: 1, fontWeight: 600 }}
              >
                {service.name}
              </h3>
              <p className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase mt-3 leading-relaxed max-w-md"
                style={{ color: "rgba(0,0,0,0.40)" }}>
                {service.description}
              </p>
              <ul className="flex flex-wrap gap-x-5 gap-y-1 mt-3">
                {service.includes.map(item => (
                  <li key={item} className="text-[9px] font-semibold tracking-widest uppercase flex items-center gap-1"
                    style={{ color: "rgba(0,0,0,0.40)" }}>
                    <span style={{ color: ACCENT }}>+</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4 shrink-0">
              <span
                className="text-lg sm:text-2xl font-semibold hidden sm:block"
                style={{ color: ACCENT, fontVariantNumeric: "tabular-nums" }}
              >
                {service.price}
              </span>
              <a
                href="#contacto"
                className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
