"use client";
import { motion } from "motion/react";
import { ACCENT } from "@/lib/constants";

const ITEMS = [
  "LANDING PAGES",
  "BOTS WHATSAPP",
  "AGENTES IA",
  "BUENOS AIRES",
  "NEXT.JS",
  "SUPABASE",
  "MVPs EN DÍAS",
  "SOFTWARE REAL",
  "PARA LATAM",
  "CLAUDE API",
  "GROQ",
];

// Duplicar para loop sin cortes
const CONTENT = [...ITEMS, ...ITEMS];

export default function Ticker() {
  return (
    <div
      className="overflow-hidden py-4 md:py-5 border-y select-none"
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#060606",
        borderColor: "rgba(255,255,255,0.07)",
      }}
    >
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {CONTENT.map((item, i) => (
          <span key={i} className="flex items-center gap-5 mx-5">
            <span
              className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              {item}
            </span>
            <span
              className="text-xs"
              style={{ color: ACCENT, opacity: 0.45 }}
            >
              ◆
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
