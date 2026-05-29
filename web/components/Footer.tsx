import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";

const COLUMNS = [
  {
    title: "Servicios",
    links: ["Desarrollo web", "Software a medida", "Diseño web / UI", "Mantenimiento"],
  },
  {
    title: "Agencia",
    links: ["Trabajo", "Proceso", "Sobre nosotros", "Contacto"],
  },
  {
    title: "Legal",
    links: ["Términos y condiciones", "Política de privacidad", "Política de cookies"],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-[#211b17] text-surface/80">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center">
              <span className="font-display text-xl text-surface">JV Agencia</span>
            </div>
            <p className="mt-5 max-w-xs font-body text-sm leading-relaxed text-surface/60">
              Diseño que enamora, código que aguanta. Webs y software a medida para que las PYMEs de
              LATAM se vean —y funcionen— a la altura de sus ambiciones.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Red social"
                  className="grid h-10 w-10 place-items-center rounded-full border border-surface/15 text-surface/70 transition-all hover:scale-105 hover:border-accent hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-body text-sm font-semibold uppercase tracking-widest text-surface">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-sm text-surface/60 transition-colors hover:text-accent"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-surface/10 pt-8 font-body text-sm text-surface/50 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4" /> contact@jvagencia.com
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" /> LATAM · Remoto
            </span>
          </div>
          <p>© {new Date().getFullYear()} JV Agencia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
