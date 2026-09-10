import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const BLOOMROSE_URL = "https://www.bloomroseaccesorios.com";
const BLOOMROSE_IMG = "/work/bloomrose.webp";
/* Un solo `sizes` para la captura y para su reflejo: así los dos piden
   exactamente la misma URL optimizada y el reflejo no cuesta un byte extra. */
const BLOOMROSE_SIZES = "(min-width:1024px) 62rem, (min-width:640px) calc(100vw - 2.5rem), calc(100vw - 2rem)";

const FEATURES = [
  "Diseño UI a medida",
  "Pagos en línea (PSE, Nequi, tarjeta)",
  "Cotización de envíos",
  "Catálogo con control de stock",
  "Cuentas y seguimiento de pedidos",
];

/* La misma placa que usa Portfolio.tsx, un tamaño más arriba: bisel cálido de
   3 px, pantalla oscura dentro y sombra de dos tiempos. Es lo que hace que el
   caso a fondo y la rejilla se lean como parientes y no como dos diseños
   pegados. Si se toca aquí, hay que tocarlo igual allá.
   Radio interior = 1,75rem (rounded-3xl) − 3 px del bisel = 1,56rem. */
const BISEL = "rounded-3xl bg-gradient-to-b from-white/95 via-line to-secondary/45 p-[3px]";
const PANTALLA = "overflow-hidden rounded-[1.56rem] bg-canvas";

export function MediaSection() {
  return (
    /* Abre el capítulo "el trabajo"; Portfolio lo continúa justo debajo, por
       eso este bloque respira arriba y cede el cierre al de abajo. */
    <section id="trabajo" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center" stagger>
          <Badge>Un caso a fondo</Badge>
          {/* El interlineado se fija en el mismo punto de ruptura donde cambia
              el tamaño: si no, el `sm:text-5xl` de Tailwind mete su propio
              line-height de 1 y el titular renderiza pegado en escritorio. */}
          <h2 className="mt-6 font-display text-4xl/[1.15] text-ink sm:text-5xl/[1.08]">
            Una tienda online
            <span className="text-primary-dark"> de punta a punta.</span>
          </h2>
          <p className="mt-5 font-body text-lg text-ink-soft">
            En vez de enseñarte diez capturas, te cuento una entera: qué necesitaba el negocio,
            qué construí y cómo quedó. Los demás proyectos están más abajo.
          </p>
        </Reveal>

        <Reveal variant="scale" delay={120} className="relative mt-14 md:mt-16">
          {/* Retroiluminación. Antes era un rounded-full con blur-3xl al 15%:
              sobre el papel cálido no producía ninguna diferencia visible.
              Ahora es un radial con parada explícita detrás de la placa, para
              que la captura parezca iluminada desde atrás. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-2 -top-10 h-[80%] md:-inset-x-8 bg-[radial-gradient(58%_46%_at_50%_44%,rgba(192,118,59,0.34),transparent_72%)] blur-2xl"
          />

          {/* En móvil la placa se sangra 16 px por lado para recuperar ancho
              de captura sin llegar a tocar el borde de pantalla. La sombra sale
              del viewport pero box-shadow no genera scroll. */}
          <div className="-mx-4 sm:mx-0">
            <a
              href={BLOOMROSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mx-auto block max-w-5xl rounded-3xl"
            >
              <div
                className={[
                  BISEL,
                  "shadow-frame transition-card duration-slow ease-state",
                  "group-hover:-translate-y-1.5 group-hover:shadow-frame-hover",
                  "group-focus-visible:-translate-y-1.5 group-focus-visible:shadow-frame-hover",
                ].join(" ")}
              >
                <div className={PANTALLA}>
                  <div className="flex items-center gap-2 border-b border-ink/10 bg-surface px-5 py-3">
                    <span className="flex shrink-0 items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-danger/55" />
                      <span className="h-2.5 w-2.5 rounded-full bg-warning/55" />
                      <span className="h-2.5 w-2.5 rounded-full bg-success/55" />
                    </span>
                    <div className="ml-2 flex-1">
                      <span className="mx-auto flex w-fit items-center gap-2 rounded-full border border-line bg-background/70 px-4 py-1">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success ring-2 ring-success/25" />
                        <span className="font-mono text-xs text-ink-soft">
                          www.bloomroseaccesorios.com
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* La ventana impone la proporción: el archivo es 2000x1160
                      (1,72:1) y trae 23 px de canaleta blanca a la derecha. El
                      `scale-[1.03]` anclado arriba se la come sin tocar el asset. */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-canvas">
                    <Image
                      src={BLOOMROSE_IMG}
                      alt="Bloomrose — tienda de bisutería y accesorios que diseñé y construí"
                      width={2000}
                      height={1160}
                      quality={85}
                      sizes={BLOOMROSE_SIZES}
                      className="absolute inset-x-0 top-0 h-auto w-full origin-top scale-[1.03] transition-transform duration-ambient ease-entrance group-hover:-translate-y-[9%] group-focus-visible:-translate-y-[9%] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-y-0"
                    />

                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-tr from-transparent via-white/25 to-transparent mix-blend-overlay transition-transform duration-ambient ease-entrance group-hover:translate-x-full motion-reduce:hidden"
                    />

                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between gap-3 bg-canvas/90 px-5 py-3 font-mono text-xs text-ink backdrop-blur transition-transform duration-base ease-state group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none">
                      <span className="truncate">bloomroseaccesorios.com</span>
                      <span className="shrink-0">Abrir sitio ↗</span>
                    </span>
                  </div>
                </div>
              </div>
            </a>

            {/* Reflejo. Es el gesto que convierte la captura en pieza expuesta y
                no en imagen pegada: la misma imagen volteada, difuminada por una
                máscara, apoyada bajo la placa. Decorativo puro, aria-hidden.

                Un reflejo delata el truco en cuanto la silueta no coincide: la
                placa termina en esquina redonda y el reflejo arrancaba en
                escuadra, así que se leía como una segunda imagen pegada debajo,
                no como el mismo objeto visto en la mesa. Por eso el reflejo
                repite la placa entera —bisel de 3 px y pantalla— con los mismos
                radios, en espejo: lo que abajo es el borde superior era el
                inferior de la placa, y ahí es donde va la curva.

                Los gradientes también se invierten (`to-t`): en un espejo, el
                brillo que corona el bisel queda por debajo. */}
            <div
              aria-hidden
              className="pointer-events-none relative mx-auto h-16 max-w-5xl overflow-hidden opacity-40 [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.85),transparent_78%)] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.85),transparent_78%)] md:h-24"
            >
              <div className="absolute inset-x-0 top-0 rounded-t-3xl bg-gradient-to-t from-white/95 via-line to-secondary/45 px-[3px] pt-[3px]">
                <div className="overflow-hidden rounded-t-[1.56rem]">
                  <Image
                    src={BLOOMROSE_IMG}
                    alt=""
                    aria-hidden
                    width={2000}
                    height={1160}
                    quality={85}
                    sizes={BLOOMROSE_SIZES}
                    className="h-auto w-full -scale-y-100 blur-[1px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pie de obra. Antes era otra tarjeta con borde y fondo —la misma
              caja que usa el sitio para cosas mucho menores— con cinco
              pastillas grises: parecía un formulario. Ahora es una ficha
              apoyada sobre el papel, separada de la placa por una regla fina:
              a la izquierda qué es, a la derecha qué se construyó. */}
          <div className="mx-auto mt-10 max-w-5xl border-t border-line pt-8 md:mt-12">
            <div className="grid gap-8 md:grid-cols-[1.15fr_1fr] md:gap-14">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-3xl/[1.1] text-ink">Bloomrose</h3>
                  {/* El mismo proyecto aparece 1.500px más abajo en la rejilla
                      de Portfolio, y allí su categoría es "Tienda online" —el
                      término del vocabulario que comparten los siete
                      proyectos—. Aquí decía "E-commerce": una palabra que no
                      se usa en ninguna otra parte del sitio, para la misma
                      tienda, en la misma página. */}
                  <span className="rounded-full bg-accent/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-primary-dark">
                    Tienda online
                  </span>
                </div>
                <p className="mt-4 max-w-[58ch] font-body text-base leading-relaxed text-ink-soft">
                  Tienda online de bisutería y accesorios para el mercado colombiano. Diseño y
                  desarrollo de punta a punta: catálogo, carrito, cuentas, pagos y envíos.
                </p>
                <Button asChild variant="outline" size="md" className="mt-6 w-full sm:w-auto">
                  <a href={BLOOMROSE_URL} target="_blank" rel="noopener noreferrer">
                    Abrir sitio <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                  </a>
                </Button>
              </div>

              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-ink">
                  Qué construí
                </p>
                <ul className="mt-3 divide-y divide-line border-y border-line">
                  {FEATURES.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-3 py-2.5 font-body text-sm leading-relaxed text-ink"
                    >
                      <span className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
