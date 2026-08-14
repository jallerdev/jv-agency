import Link from "next/link";
import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import {
  ADDRESS_LINE,
  BUSINESS,
  WHATSAPP_LINK,
} from "@/lib/business";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Servicios",
    links: [
      { label: "Desarrollo web", href: "/#servicios" },
      { label: "Software a medida", href: "/#servicios" },
      { label: "Diseño web / UI", href: "/#servicios" },
      { label: "Mantenimiento", href: "/#servicios" },
    ],
  },
  {
    title: "Agencia",
    links: [
      { label: "Trabajo", href: "/#trabajo" },
      { label: "Proceso", href: "/#proceso" },
      { label: "Blog", href: "/blog" },
      { label: "Sobre nosotros", href: "/sobre-nosotros" },
      { label: "Cotizador", href: "/cotizador" },
      { label: "Contacto", href: "/#contacto" },
    ],
  },
  {
    title: "Producto",
    links: [
      // HalcónOS es producto propio de la agencia. El enlace es legítimo y
      // además cumple una función concreta de SEO: hasta ahora este sitio no
      // enlazaba ni una vez al subdominio, que por eso no recibía nada de
      // autoridad. Es el enlace más barato que teníamos disponible.
      { label: "HalcónOS — CRM de ventas", href: "https://halcon.jvagencia.com" },
      { label: "Blog de HalcónOS", href: "https://halcon.jvagencia.com/blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Política de privacidad", href: "/privacidad" },
      { label: "Términos y condiciones", href: "/terminos" },
      { label: "Política de cookies", href: "/cookies" },
    ],
  },
];

const SOCIAL = [
  { Icon: Facebook, url: BUSINESS.social.facebook, label: "Facebook" },
  { Icon: Instagram, url: BUSINESS.social.instagram, label: "Instagram" },
  { Icon: Mail, url: `mailto:${BUSINESS.email}`, label: "Correo" },
].filter((s) => Boolean(s.url));

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-[#211b17] text-surface/80">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        {/* 1 bloque de marca + 4 columnas de enlaces (se sumó «Producto»). */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="h-9 w-auto" />
              <span className="font-display text-xl text-surface">Agencia</span>
            </div>
            <p className="mt-5 max-w-xs font-body text-sm leading-relaxed text-surface/60">
              Diseño que enamora, código que aguanta. Webs y software a medida para que las PYMEs de
              LATAM se vean —y funcionen— a la altura de sus ambiciones.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL.map(({ Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  aria-label={label}
                  target={url.startsWith("http") ? "_blank" : undefined}
                  rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
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
                {col.links.map((link) => {
                  // Los enlaces a HalcónOS son a otro host: van con <a> y
                  // `rel="noopener"`. Sin `noreferrer`, a propósito — queremos
                  // que el referer llegue, es tráfico propio entre sitios
                  // nuestros y sirve para atribuirlo en analítica.
                  const external = link.href.startsWith("http");
                  const cls =
                    "font-body text-sm text-surface/60 transition-colors hover:text-accent";
                  return (
                    <li key={link.label}>
                      {external ? (
                        <a href={link.href} rel="noopener" className={cls}>
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className={cls}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-surface/10 pt-8 font-body text-sm text-surface/50">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={`mailto:${BUSINESS.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Mail className="h-4 w-4" /> {BUSINESS.email}
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Phone className="h-4 w-4" /> WhatsApp {BUSINESS.whatsappDisplay}
            </a>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Phone className="h-4 w-4" /> {BUSINESS.phoneDisplay}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {ADDRESS_LINE}
            </span>
          </div>
          <div className="flex flex-col gap-1 text-surface/40 md:flex-row md:items-center md:justify-between">
            <span>
              {BUSINESS.legalNameOfficial} · NIT {BUSINESS.taxId}
            </span>
            <span>© {new Date().getFullYear()} {BUSINESS.tradeName}. Todos los derechos reservados.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
