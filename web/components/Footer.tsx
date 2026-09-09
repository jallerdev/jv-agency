import Link from "next/link";
import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { MetaTechProvider } from "@/components/MetaTechProvider";
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
      { label: "Chatbot de WhatsApp", href: "/servicios/chatbot-whatsapp" },
      { label: "SEO y posicionamiento", href: "/#servicios" },
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

/* Pie del sitio.
 *
 * Tres cosas que estaban mal y se arreglaron aquí:
 *
 * 1. LA TRANSICIÓN. El pie entraba con `border-t border-line` —una línea crema
 *    sobre casi negro—, o sea un corte seco entre un sitio claro y un bloque
 *    oscuro. Ahora la entrada está compuesta: un hilo de cobre, una capa cálida
 *    que se apaga en los primeros 200 px y la MISMA textura de papel del resto
 *    del sitio corriendo sobre el fondo oscuro. El material continúa aunque el
 *    tono se invierta, que es lo que hace que el cambio se lea como decisión y
 *    no como el final del CSS.
 *
 * 2. LOS OBJETIVOS TÁCTILES. Los 17 enlaces medían 18 px de alto con 12 px de
 *    separación: un paso de 30 px entre destinos contiguos, imposible de
 *    acertar con el pulgar. Con `.tap-row` el área sube a ~44 px sin mover el
 *    texto ni el ritmo (por eso el contenedor baja de space-y-3 a space-y-1).
 *
 * 3. EL CONTRASTE. La línea legal iba en `text-surface/40` = 3,61:1 y no
 *    pasaba AA. Sube a /60 (6,5:1). Los enlaces suben de /60 a /70 (8,3:1).
 */
export function Footer() {
  return (
    <footer
      /* El anillo de foco de la casa es primary-dark, calibrado sobre el papel
         (7,38:1). Sobre este bloque oscuro se queda en 2:1 y deja de verse.
         Redefinir el token AQUÍ lo arregla para todo el pie de una vez: el
         cobre da 4,77:1 sobre #211b17. */
      className="relative isolate overflow-hidden bg-[#211b17] text-surface/80 [--focus-ring-color:theme(colors.accent.DEFAULT)]"
    >
      {/* Costura: el mismo hilo de cobre con el que cierra la banda de contacto. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent"
      />
      {/* Calor que baja: sobre la portada continúa el bronce del CTA; en las
          demás páginas es la luz del papel entrando en el bloque oscuro. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/28 via-primary/8 to-transparent"
      />
      <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 -z-10 opacity-45" />

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        {/* Marca + 4 columnas. En móvil las columnas van de dos en dos: cuatro
            listas apiladas eran ~1.400 px de pie en un teléfono. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] lg:gap-x-10 lg:gap-y-12">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <Logo className="h-9 w-auto" />
              <span className="font-display text-xl text-surface">Agencia</span>
            </div>
            <p className="mt-5 max-w-xs text-pretty font-body text-sm leading-relaxed text-surface/70">
              Diseño que enamora, código que aguanta. Webs y software a medida para que las PYMEs de
              LATAM se vean —y funcionen— a la altura de sus ambiciones.
            </p>
            <MetaTechProvider variant="compact" className="mt-6 border-surface/15 bg-surface/5" />

            <div className="mt-6 flex gap-2.5">
              {SOCIAL.map(({ Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  aria-label={label}
                  target={url.startsWith("http") ? "_blank" : undefined}
                  rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="tap-target grid h-11 w-11 place-items-center rounded-full border border-surface/15 text-surface/75 transition-card duration-quick ease-state hover:-translate-y-0.5 hover:border-accent hover:bg-surface/5 hover:text-accent active:translate-y-0 active:scale-[0.96]"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="min-w-0">
              {/* Mono en versalitas: el mismo idioma de etiqueta que usa el
                  resto del sitio para los antetítulos. */}
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-surface/70">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-0.5">
                {col.links.map((link) => {
                  // Los enlaces a HalcónOS son a otro host: van con <a> y
                  // `rel="noopener"`. Sin `noreferrer`, a propósito — queremos
                  // que el referer llegue, es tráfico propio entre sitios
                  // nuestros y sirve para atribuirlo en analítica.
                  const external = link.href.startsWith("http");
                  const cls =
                    "tap-target flex items-center font-body text-sm text-surface/70 transition-surface duration-quick ease-state hover:text-accent";
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

        <div className="mt-14 border-t border-surface/12 pt-6 font-body text-sm text-surface/70">
          <div className="flex flex-col gap-x-7 gap-y-1 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={`mailto:${BUSINESS.email}`}
              className="tap-target inline-flex items-center gap-2 transition-surface duration-quick ease-state hover:text-accent"
            >
              <Mail className="h-4 w-4 shrink-0 text-surface/55" strokeWidth={1.75} />
              {BUSINESS.email}
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target inline-flex items-center gap-2 whitespace-nowrap tabular-nums transition-surface duration-quick ease-state hover:text-accent"
            >
              <Phone className="h-4 w-4 shrink-0 text-surface/55" strokeWidth={1.75} />
              WhatsApp {BUSINESS.whatsappDisplay}
            </a>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="tap-target inline-flex items-center gap-2 whitespace-nowrap tabular-nums transition-surface duration-quick ease-state hover:text-accent"
            >
              <Phone className="h-4 w-4 shrink-0 text-surface/55" strokeWidth={1.75} />
              {BUSINESS.phoneDisplay}
            </a>
            <span className="tap-target inline-flex items-center gap-2 text-surface/60">
              <MapPin className="h-4 w-4 shrink-0 text-surface/55" strokeWidth={1.75} />
              {ADDRESS_LINE}
            </span>
          </div>

          <div className="mt-5 flex flex-col gap-1 border-t border-surface/10 pt-5 font-mono text-xs tabular-nums text-surface/60 md:flex-row md:items-center md:justify-between">
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
