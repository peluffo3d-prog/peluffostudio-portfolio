import Hero from "@/components/Hero";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Chat from "@/components/Chat";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";

const SOCIAL = [
  { label: "GitHub", href: "https://github.com/peluffo3d-prog" },
  { label: "Mail",   href: "mailto:jaas.i.elel2@gmail.com" },
];

export default function Home() {
  return (
    <main>
      <ScrollToTop />
      <Hero />
      <About />
      <Stack />
      <Projects />
      <Services />
      <Chat />

      <footer
        style={{ fontFamily: "'Inter', sans-serif", background: "#060606", borderTop: "1px solid rgba(255,255,255,0.08)" }}
        className="px-5 sm:px-8 md:px-12 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
      >
        <span
          className="text-[9px] font-semibold tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.22)" }}
        >
          PeluffoStudio · Buenos Aires · {new Date().getFullYear()}
        </span>

        <div className="flex items-center gap-6">
          {SOCIAL.map(s => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="text-[9px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60"
              style={{ color: "rgba(255,255,255,0.38)" }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </footer>

      <WhatsAppButton />
    </main>
  );
}
