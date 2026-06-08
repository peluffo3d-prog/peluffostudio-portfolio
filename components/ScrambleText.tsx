"use client";
import { useState, useEffect, useRef } from "react";

// Solo letras — se ve más como "texto buscando su forma"
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function ScrambleText({
  text,
  delay = 0,
  duration = 1800,
}: {
  text: string;
  delay?: number;
  duration?: number;
}) {
  const [output, setOutput] = useState(text);
  const rafRef   = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      const start     = performance.now();
      const nonSpaces = text.replace(/ /g, "").length;
      // Primera mitad del tiempo: todo scrambled. Segunda mitad: resolución lenta.
      const scramblePhase = duration * 0.45;

      const tick = (now: number) => {
        const elapsed = now - start;

        if (elapsed < scramblePhase) {
          // Fase 1: todos los chars siguen scrambled, cambian rápido
          setOutput(
            text.split("").map((char) =>
              char === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]
            ).join("")
          );
        } else {
          // Fase 2: resolución izquierda → derecha
          const resolveProgress = Math.min((elapsed - scramblePhase) / (duration - scramblePhase), 1);
          const resolved = Math.floor(resolveProgress * nonSpaces);

          let idx = 0;
          setOutput(
            text.split("").map((char) => {
              if (char === " ") return " ";
              if (idx++ < resolved) return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join("")
          );

          if (resolveProgress >= 1) {
            setOutput(text);
            return;
          }
        }

        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [text, delay, duration]);

  return <>{output}</>;
}
