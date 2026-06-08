"use client";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { ACCENT, EASE } from "@/lib/constants";

type Message = { role: "user" | "assistant"; content: string; id: string };

const SUGGESTIONS = [
  "¿Qué es AtlasLibre?",
  "¿Cuánto sale una landing?",
  "Necesito un bot para mi negocio",
  "¿Cómo trabajan?",
];

// ── Render de markdown mínimo (bold, listas, saltos) sin dependencias ─────────
function renderMarkdown(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const trimmed = line.trim();
    const isBullet = /^[-*]\s+/.test(trimmed);
    const content  = isBullet ? trimmed.replace(/^[-*]\s+/, "") : line;

    // bold **texto**
    const parts = content.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
      p.startsWith("**") && p.endsWith("**")
        ? <strong key={j} style={{ fontWeight: 600, color: "rgba(255,255,255,0.95)" }}>{p.slice(2, -2)}</strong>
        : <span key={j}>{p}</span>
    );

    if (isBullet) {
      return (
        <div key={i} style={{ display: "flex", gap: "8px", paddingLeft: "2px" }}>
          <span style={{ color: ACCENT, flexShrink: 0 }}>·</span>
          <span>{parts}</span>
        </div>
      );
    }
    return <p key={i} style={{ minHeight: line === "" ? "0.5em" : undefined }}>{parts}</p>;
  });
}

export default function Chat() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [messages, setMessages]   = useState<Message[]>([]);
  const [input, setInput]         = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef                 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text, id: Date.now().toString() };
    const aId = (Date.now() + 1).toString();
    setMessages(p => [...p, userMsg, { role: "assistant", content: "", id: aId }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!res.body) throw new Error("no body");
      const reader = res.body.getReader();
      const dec    = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: d } = await reader.read();
        done = d;
        if (value)
          setMessages(p => p.map(m => m.id === aId ? { ...m, content: m.content + dec.decode(value) } : m));
      }
    } catch {
      setMessages(p => p.map(m => m.id === aId
        ? { ...m, content: "Se cortó la conexión. Escribinos directo a jaas.i.elel2@gmail.com 🙂" }
        : m));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      id="contacto"
      ref={ref}
      style={{ fontFamily: "var(--font-sans), 'Inter', sans-serif", background: "#060606", color: "#fff" }}
      className="px-5 sm:px-8 md:px-12 py-24 md:py-36"
    >
      {/* Header de sección */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
        className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-5"
        style={{ color: ACCENT }}
      >
        — Hablá con nosotros
      </motion.p>

      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">

        {/* Columna izquierda — pitch */}
        <div>
          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
              className="font-semibold uppercase"
              style={{ fontSize: "clamp(2.4rem, 7vw, 6rem)", lineHeight: 0.88, fontWeight: 600 }}
            >
              Preguntale<br />a la IA.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.18 }}
            className="text-sm leading-relaxed max-w-sm mb-8"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Este chat corre con un LLM real y conoce todo sobre nosotros: proyectos,
            precios y forma de trabajo. Es el mismo tipo de agente que te podemos construir.
            Probalo.
          </motion.p>
          <motion.a
            href="mailto:jaas.i.elel2@gmail.com"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
            className="text-[10px] font-semibold tracking-widest uppercase hover:opacity-60 transition-opacity"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            ¿Preferís humano? jaas.i.elel2@gmail.com →
          </motion.a>
        </div>

        {/* Columna derecha — la ventana de chat */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
          className="border overflow-hidden flex flex-col"
          style={{ borderColor: "rgba(255,255,255,0.12)", borderRadius: "6px", background: "rgba(255,255,255,0.02)", height: "min(520px, 70vh)" }}
        >
          {/* Barra superior del chat */}
          <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: ACCENT, color: "#fff" }}>
              PS
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold tracking-wide">Asistente de PeluffoStudio</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
                <span className="text-[9px] font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>En línea</span>
              </div>
            </div>
          </div>

          {/* Mensajes */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-4" style={{ scrollbarWidth: "thin", scrollbarColor: "#333 transparent" }}>
            {/* Mensaje de bienvenida */}
            {messages.length === 0 && (
              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0" style={{ background: ACCENT, color: "#fff" }}>PS</div>
                <div className="rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
                    ¡Hola! Somos Jasiel y Javier. Preguntame lo que quieras sobre nuestros proyectos,
                    precios o cómo podríamos ayudar a tu negocio. 👋
                  </p>
                </div>
              </div>
            )}

            <AnimatePresence initial={false}>
              {messages.map(m => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-3 items-start ${m.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                    style={{
                      background: m.role === "user" ? "rgba(255,255,255,0.1)" : ACCENT,
                      color:      m.role === "user" ? "rgba(255,255,255,0.7)" : "#fff",
                    }}>
                    {m.role === "user" ? "Vos" : "PS"}
                  </div>
                  <div
                    className={`px-4 py-3 max-w-[80%] text-sm leading-relaxed space-y-1.5 ${m.role === "user" ? "rounded-2xl rounded-tr-sm" : "rounded-2xl rounded-tl-sm"}`}
                    style={{
                      background: m.role === "user" ? ACCENT : "rgba(255,255,255,0.06)",
                      color:      m.role === "user" ? "#fff" : "rgba(255,255,255,0.85)",
                    }}
                  >
                    {m.role === "assistant" ? renderMarkdown(m.content) : <p>{m.content}</p>}
                    {/* Cursor de escritura */}
                    {m.role === "assistant" && m.content === "" && isLoading && (
                      <div className="flex gap-1 py-1">
                        {[0,1,2].map(i => (
                          <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40"
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Sugerencias */}
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 px-5 pb-3">
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => send(s)}
                  className="text-[11px] font-medium px-3 py-1.5 border transition-colors hover:border-white/35 hover:text-white/80"
                  style={{ borderColor: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.5)", borderRadius: "100px" }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={e => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 px-4 py-3 border-t"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Escribí tu mensaje..."
              className="flex-1 bg-transparent text-sm outline-none px-2"
              style={{ color: "#fff" }}
            />
            <button type="submit" disabled={isLoading || !input.trim()}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-25"
              style={{ background: input.trim() && !isLoading ? ACCENT : "rgba(255,255,255,0.1)" }}>
              <ArrowUp size={16} color="#fff" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
