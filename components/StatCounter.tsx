"use client";
import { useState, useEffect } from "react";

export default function StatCounter({ target, delay = 0 }: { target: number; delay?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      let n = 0;
      const step = target / 40;
      const id = setInterval(() => {
        n = Math.min(n + step, target);
        setCount(Math.round(n));
        if (n >= target) clearInterval(id);
      }, 16);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t);
  }, [target, delay]);
  return <>{count}</>;
}
