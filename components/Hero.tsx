"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { ACCENT, EASE } from "@/lib/constants";
import StatCounter from "@/components/StatCounter";

const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: EASE },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: EASE },
  }),
};

const NAV_LINKS     = ["Historia", "Proyectos", "Servicios", "Contacto"];
const HEADING_WORDS = ["Socios de", "Crecimiento"];
const STATS = [
  { num: "6", label: "PROYECTOS\nENTREGADOS" },
  { num: "2", label: "AGENTES\nDE IA" },
  { num: "3", label: "CLIENTES\nACTIVOS" },
];

export default function Hero() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [availMonth, setAvailMonth] = useState("");

  useEffect(() => {
    const d   = new Date();
    const mes = d.toLocaleDateString("es-AR", { month: "long" });
    setAvailMonth(`${mes} ${d.getFullYear()}`);
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif", background: "#ffffff" }}
    >
      {/* ── VIDEO BACKGROUND ── */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4" />
      </video>

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── NAV ── */}
        <nav className="flex items-center justify-between px-5 sm:px-8 md:px-12 pt-5 md:pt-6">
          {/* Logo */}
          <motion.div
            variants={fadeDown} initial="hidden" animate="visible" custom={0}
            className="flex items-center gap-3"
          >
            <div
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0"
              style={{ borderColor: ACCENT }}
            >
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: ACCENT }} />
            </div>
            <span className="hidden sm:block text-sm font-semibold tracking-widest uppercase text-black">
              PeluffoStudio
            </span>
          </motion.div>

          {/* Center links — desktop only */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                variants={fadeDown} initial="hidden" animate="visible" custom={i + 1}
                className="text-sm font-semibold tracking-widest uppercase text-black hover:opacity-60 transition-opacity"
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* Badge disponibilidad — solo cuando availMonth está listo */}
          {availMonth && (
            <motion.div
              variants={fadeDown} initial="hidden" animate="visible" custom={5}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border"
              style={{ borderColor: "rgba(0,0,0,0.15)", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
              <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#1a1a1a" }}>
                Disponibles · {availMonth}
              </span>
            </motion.div>
          )}

          {/* Hamburger */}
          <motion.button
            variants={fadeDown} initial="hidden" animate="visible" custom={6}
            onClick={() => setMenuOpen(true)}
            className="w-9 h-9 rounded-full bg-black flex flex-col items-center justify-center gap-1"
            aria-label="Abrir menú"
          >
            <span className="w-4 h-0.5 bg-white" />
            <span className="w-4 h-0.5 bg-white" />
            <span className="w-4 h-0.5 bg-white" />
          </motion.button>
        </nav>

        {/* ── STATS ROW ── */}
        <div className="flex-1 flex items-center justify-end px-5 sm:px-8 md:px-12 py-8 md:py-0">
          <div className="flex items-start gap-5 sm:gap-8 md:gap-10">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.num}
                variants={fadeUp} initial="hidden" animate="visible" custom={i + 2}
                className="flex flex-col items-end text-right"
              >
                <div
                  className="font-semibold text-black leading-none"
                  style={{ fontSize: "clamp(1.5rem, 5vw, 3.5rem)", fontWeight: 600 }}
                >
                  <span style={{ fontSize: "0.5em", color: ACCENT }}>+</span>
                  <StatCounter target={Number(stat.num)} delay={400 + i * 150} />
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase text-black whitespace-pre-line leading-tight mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM ── */}
        <div className="flex flex-col gap-6 md:gap-12 px-5 sm:px-8 md:px-12 pb-8 md:pb-12">

          {/* Row A: tagline + CTA */}
          <div className="flex items-center justify-between gap-4">
            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={5}
              className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase text-black max-w-[130px] sm:max-w-[160px] md:max-w-xs"
            >
              Jasiel & Javier /<br />Software & IA /<br />Buenos Aires
            </motion.p>

            <motion.a
              href="#contacto"
              variants={fadeUp} initial="hidden" animate="visible" custom={6}
              className="flex items-center gap-1.5 font-semibold tracking-widest uppercase whitespace-nowrap text-base sm:text-xl md:text-2xl hover:opacity-70 transition-opacity"
              style={{ color: ACCENT }}
            >
              Trabajemos juntos
              <ArrowUpRight size={18} className="sm:hidden" />
              <ArrowUpRight size={22} className="hidden sm:block" />
            </motion.a>
          </div>

          {/* Row B: description + main heading */}
          <div className="flex items-end justify-between gap-3 sm:gap-4">
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={7}
              className="w-[120px] sm:w-[180px] md:w-[280px] shrink-0"
            >
              <p className="text-[9px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase text-black text-left md:text-right">
                Construimos software y agentes de IA que automatizan y hacen crecer tu negocio en LATAM
              </p>
            </motion.div>

            {/* Heading words — clip reveal */}
            <div className="text-right">
              {HEADING_WORDS.map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.4 + i * 0.14, duration: 0.7, ease: EASE }}
                    className="font-semibold uppercase text-black"
                    style={{ fontSize: "clamp(2rem, 9vw, 9rem)", lineHeight: 0.88, fontWeight: 600 }}
                  >
                    {word}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU OVERLAY ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-white flex flex-col px-5 sm:px-8 pt-5 pb-10"
          >
            {/* Top */}
            <div className="flex items-center justify-between">
              <div
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: ACCENT }}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: ACCENT }} />
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-black flex items-center justify-center"
                aria-label="Cerrar menú"
              >
                <X size={16} color="white" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-8 mt-16">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-semibold tracking-widest uppercase text-black hover:opacity-60 transition-opacity"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-auto">
              <a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-xl font-semibold tracking-widest uppercase hover:opacity-70 transition-opacity"
                style={{ color: ACCENT }}
              >
                Trabajemos juntos
                <ArrowUpRight size={22} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
