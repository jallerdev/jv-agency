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
    // Cinco de estos seis apuntaban a /#servicios, un ancla de la portada:
    // el pie está en todas las páginas del sitio, así que era la portada la
    // que se quedaba con toda la señal interna de «software a la medida» o
    // «SEO y posicionamiento» aunque cada uno ya tuviera página propia.
    // Ahora cada servicio con página apunta a su página.
    // «Diseño web / UI» sigue sin entrada propia a propósito: no es un
    // servicio aparte y su intención vive en /servicios/diseno-de-paginas-web,
    // que ya está de primero en la lista.
    links: [
      { label: "Diseño de páginas web", href: "/servicios/diseno-de-paginas-web" },
      { label: "Tiendas virtuales", href: "/servicios/tiendas-virtuales" },
      { label: "Chatbot de WhatsApp", href: "/servicios/chatbot-whatsapp" },
      { label: "Posicionamiento SEO", href: "/servicios/posicionamiento-seo" },
      { label: "Software a la medida", href: "/servicios/software-a-la-medida" },
      { label: "Mantenimiento", href: "/#servicios" },
    ],
  },
  {
    title: "Agencia",
    links: [
      { label: "Precios", href: "/precios" },
      { label: "Trabajo", href: "/#trabajo" },
      { label: "Proceso", href: "/#proceso" },
      { label: "Blog", href: "/blog" },
      { label: "Sobre mí", href: "/sobre-nosotros" },
      { label: "Contacto", href: "/#agenda" },
    ],
  },
  {
    title: "Producto",
    links: [
      // HalcónOS es producto propio: lo construí yo. El enlace es legítimo y
      // además cumple una función concreta de SEO: hasta ahora este sitio no
      // enlazaba ni una vez al subdominio, que por eso no recibía nada de
      // autoridad. Es el enlace más barato que tenía disponible.
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
 * 3. EL CONTRASTE. La línea legal iba en `text-ink/40` = 3,61:1 y no
 *    pasaba AA. Sube a /60 (6,5:1). Los enlaces suben de /60 a /70 (8,3:1).
 */
export function Footer() {
  return (
    <footer
      /* El pie ya no necesita un tono propio: sobre el canvas casi negro, el
         escalon de superficie (#101012) y el filete de 1px bastan. */
      className="relative isolate overflow-hidden bg-surface text-ink-soft [--focus-ring-color:theme(colors.accent.DEFAULT)]"
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
              <Logo className="h-9 w-auto text-primary" />
              <span className="font-body text-xl font-semibold text-ink">Agencia</span>
            </div>
            <p className="mt-5 max-w-xs text-pretty font-body text-sm leading-relaxed text-ink/70">
              Diseño que enamora, código que aguanta. Webs y software a la medida para PYMEs de
              LATAM, hechos por una sola persona de principio a fin.
            </p>
            <MetaTechProvider variant="compact" className="mt-6 border-line bg-surface/5" />

            <div className="mt-6 flex gap-2.5">
              {SOCIAL.map(({ Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  aria-label={label}
                  target={url.startsWith("http") ? "_blank" : undefined}
                  rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="tap-target grid h-11 w-11 place-items-center rounded-full border border-line text-ink/75 transition-card duration-quick ease-state hover:-translate-y-0.5 hover:border-accent hover:bg-surface/5 hover:text-accent active:translate-y-0 active:scale-[0.96]"
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="min-w-0">
              {/* Mono en versalitas: el mismo idioma de etiqueta que usa el
                  resto del sitio para los antetítulos. */}
              <h3 className="jv-eyebrow text-ink/70">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-0.5">
                {col.links.map((link) => {
                  // Los enlaces a HalcónOS son a otro host: van con <a> y
                  // `rel="noopener"`. Sin `noreferrer`, a propósito — quiero
                  // que el referer llegue, es tráfico propio entre sitios
                  // míos y sirve para atribuirlo en analítica.
                  const external = link.href.startsWith("http");
                  const cls =
                    "tap-target flex items-center font-body text-sm text-ink/70 transition-surface duration-quick ease-state hover:text-accent";
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

        <div className="mt-14 jv-rule font-body text-sm text-ink/70">
          <div className="flex flex-col gap-x-7 gap-y-1 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={`mailto:${BUSINESS.email}`}
              className="tap-target inline-flex items-center gap-2 transition-surface duration-quick ease-state hover:text-accent"
            >
              <Mail className="h-4 w-4 shrink-0 text-ink/55" strokeWidth={2} />
              {BUSINESS.email}
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target inline-flex items-center gap-2 whitespace-nowrap tabular-nums transition-surface duration-quick ease-state hover:text-accent"
            >
              <Phone className="h-4 w-4 shrink-0 text-ink/55" strokeWidth={2} />
              WhatsApp {BUSINESS.whatsappDisplay}
            </a>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="tap-target inline-flex items-center gap-2 whitespace-nowrap tabular-nums transition-surface duration-quick ease-state hover:text-accent"
            >
              <Phone className="h-4 w-4 shrink-0 text-ink/55" strokeWidth={2} />
              {BUSINESS.phoneDisplay}
            </a>
            <span className="tap-target inline-flex items-center gap-2 text-ink/60">
              <MapPin className="h-4 w-4 shrink-0 text-ink/55" strokeWidth={2} />
              {ADDRESS_LINE}
            </span>
          </div>

          <div className="mt-5 flex flex-col gap-1 jv-rule pt-5 font-mono text-xs tabular-nums text-ink/60 md:flex-row md:items-center md:justify-between">
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
