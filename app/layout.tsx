import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://peluffostudio.vercel.app"),
  title: "PeluffoStudio — Software & IA para LATAM | Jasiel & Javier",
  description:
    "Dos amigos construyendo software y agentes de IA para negocios en LATAM. AtlasLibre, Diseños JK, Laser Cut y más. Hablá con nuestra IA o escribinos.",
  keywords: ["desarrollo web", "agentes IA", "landing pages", "software LATAM", "Next.js", "Buenos Aires"],
  openGraph: {
    title: "PeluffoStudio — Software & IA para LATAM",
    description: "Dos amigos construyendo software real y agentes de IA para negocios en LATAM.",
    type: "website",
    locale: "es_AR",
    siteName: "PeluffoStudio",
  },
  twitter: {
    card: "summary_large_image",
    title: "PeluffoStudio — Software & IA para LATAM",
    description: "Software real y agentes de IA para negocios en LATAM.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
