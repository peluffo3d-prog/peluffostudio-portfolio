"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { ACCENT, EASE } from "@/lib/constants";

const STACK = [
  {
    area: "Producto Digital",
    items: ["Apps web", "MVPs funcionales", "Landing pages", "Plataformas SaaS", "E-commerce"],
  },
  {
    area: "IA & Automatización",
    items: ["Agentes IA", "Bots WhatsApp", "Flujos automáticos", "Atención 24/7", "Integraciones"],
  },
  {
    area: "Negocio",
    items: ["Validación de ideas", "Go-to-market", "Monetización", "Operaciones", "Estrategia"],
  },
  {
    area: "Fabricación",
    items: ["Impresión 3D", "Diseño de producto", "Prototipos", "E-commerce físico", "Retail"],
  },
];

export default function Stack() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="stack"
      ref={ref}
      style={{ fontFamily: "'Inter', sans-serif", background: "#060606", color: "#fff" }}
      className="px-5 sm:px-8 md:px-12 py-24 md:py-32"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
        className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-5"
        style={{ color: ACCENT }}
      >
        — Capacidades
      </motion.p>

      <div className="overflow-hidden mb-14 md:mb-20">
        <motion.h2
          initial={{ y: "110%" }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          className="font-semibold uppercase"
          style={{ fontSize: "clamp(2.4rem, 7vw, 6.5rem)", lineHeight: 0.88, fontWeight: 600 }}
        >
          Capacidades.
        </motion.h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 border-t border-white/10 pt-12">
        {STACK.map((col, ci) => (
          <motion.div
            key={col.area}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.16 + ci * 0.08 }}
          >
            <p
              className="text-[9px] font-semibold tracking-widest uppercase mb-5"
              style={{ color: ACCENT }}
            >
              {col.area}
            </p>
            <ul className="flex flex-col gap-3">
              {col.items.map(item => (
                <li
                  key={item}
                  className="text-xs sm:text-sm font-semibold tracking-widest uppercase"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
