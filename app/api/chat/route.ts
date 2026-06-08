import { streamText } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { SYSTEM_PROMPT } from "@/lib/data";

export const runtime = "edge";

// ── Pilares de backend ───────────────────────────────────────────────────────
const MAX_MESSAGES   = 20;     // historial máximo aceptado
const MAX_CHARS      = 1500;   // largo máximo por mensaje
const RATE_LIMIT     = 12;     // requests por ventana
const RATE_WINDOW_MS = 60_000; // 1 minuto

// Rate limit en memoria (por IP). Suficiente para un portfolio; sin dependencias.
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.reset) {
    hits.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  rec.count++;
  return rec.count > RATE_LIMIT;
}

type ChatMsg = { role: "user" | "assistant"; content: string };

function isValid(messages: unknown): messages is ChatMsg[] {
  return (
    Array.isArray(messages) &&
    messages.length > 0 &&
    messages.length <= MAX_MESSAGES &&
    messages.every(
      m =>
        m && typeof m === "object" &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.length > 0 &&
        m.content.length <= MAX_CHARS
    )
  );
}

function errorStream(text: string): Response {
  return new Response(text, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export async function POST(req: Request) {
  // 1. Rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (rateLimited(ip)) {
    return errorStream("Estás yendo muy rápido. Esperá unos segundos y volvé a escribir 🙂");
  }

  // 2. Parse + validación
  let messages: unknown;
  try {
    ({ messages } = await req.json());
  } catch {
    return errorStream("No pude leer tu mensaje. Probá de nuevo.");
  }
  if (!isValid(messages)) {
    return errorStream("Mensaje inválido. Mantené la consulta corta y volvé a intentar.");
  }

  // 3. API key presente
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return errorStream(
      "El chat todavía no está conectado. Escribinos directo a jaas.i.elel2@gmail.com y te respondemos al toque."
    );
  }

  // 4. Generación con streaming
  try {
    const groq = createGroq({ apiKey });
    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: SYSTEM_PROMPT,
      messages: messages as ChatMsg[],
      maxOutputTokens: 700,
      temperature: 0.6,
    });
    return result.toTextStreamResponse();
  } catch {
    return errorStream("Se me cruzaron los cables. Probá de nuevo o escribinos a jaas.i.elel2@gmail.com");
  }
}
