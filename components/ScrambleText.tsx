"use client";
import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&";

export default function ScrambleText({
  text,
  delay = 0,
  duration = 900,
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
      const start      = performance.now();
      const nonSpaces  = text.replace(/ /g, "").length;

      const tick = (now: number) => {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const resolved = Math.floor(progress * nonSpaces);

        let idx = 0;
        setOutput(
          text.split("").map((char) => {
            if (char === " ") return " ";
            if (idx++ < resolved) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
        );

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setOutput(text);
        }
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
