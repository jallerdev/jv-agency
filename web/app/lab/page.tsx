import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PRICES, SEO_PRICES, money } from "@/lib/quote";

import { ArbolDecision, type NodoArbol } from "@/components/visuales/ArbolDecision";
import { BloqueLocalGoogle } from "@/components/visuales/BloqueLocalGoogle";
import { CasillaVacia } from "@/components/visuales/CasillaVacia";
import { ComparadorAnchos } from "@/components/visuales/ComparadorAnchos";
import { Comparador } from "@/components/visuales/Comparador";
import { FichaGoogle } from "@/components/visuales/FichaGoogle";
import { HiloWhatsApp } from "@/components/visuales/HiloWhatsApp";
import { ListaAcopio } from "@/components/visuales/ListaAcopio";
import { PanelAutonomia } from "@/components/visuales/PanelAutonomia";
import { RailDistancia } from "@/components/visuales/RailDistancia";
import { RailPlazo } from "@/components/visuales/RailPlazo";
import { SumadorSeo } from "@/components/visuales/SumadorSeo";

/**
 * EL TALLER — SOLO DESARROLLO
 * ─────────────────────────────────────────────────────────────────────────
 * Pinta la biblioteca entera de una vez para poder revisarla a 390 y a 1440
 * sin ir página por página. En producción devuelve 404 y no aparece en el
 * sitemap (app/sitemap.ts es una lista explícita, no un barrido de rutas).
 *
 * Los visuales van alternando canvas y `.banda`: varios se usan dentro de una
 * banda y hay que ver los dos fondos. Recuerda la regla: dentro de una banda,
 * el tono lo pone la banda —un visual sin fondo propio ahí es lo correcto.
 */

export const metadata: Metadata = {
  title: "Taller de visuales",
  robots: { index: false, follow: false },
};

const ARBOL: NodoArbol = {
  tipo: "pregunta",
  pregunta: "¿Vas a cobrar en línea, con carrito y pago?",
  opciones: [
    {
      etiqueta: "Sí, quiero vender",
      siguiente: {
        tipo: "resultado",
        titulo: "Eso es una tienda virtual",
        detalle:
          "No es una página web con un catálogo pegado: lleva carrito, pago, inventario y envíos. Va por otro lado.",
        pie: `Desde ${money(PRICES.base.ecom)} · 3 a 5 semanas`,
        enlace: { texto: "Ver tiendas virtuales", href: "/servicios/tiendas-virtuales" },
      },
    },
    {
      etiqueta: "No por ahora",
      siguiente: {
        tipo: "pregunta",
        pregunta: "¿La página ya existe?",
        opciones: [
          {
            etiqueta: "Sí, hay una",
            siguiente: {
              tipo: "resultado",
              titulo: "Rediseño",
              detalle:
                "Primero la reviso y te digo qué se salva y qué no. El precio sale de esa revisión: no tiene piso publicable y no me lo invento.",
              pie: "Sin piso publicable · sale de la revisión",
            },
          },
          {
            etiqueta: "No, empiezo de cero",
            siguiente: {
              tipo: "pregunta",
              pregunta: "¿Un solo servicio, o el negocio completo?",
              opciones: [
                {
                  etiqueta: "Un servicio",
                  siguiente: {
                    tipo: "resultado",
                    titulo: "Landing page",
                    detalle:
                      "Una sola página, con una sola cosa que hacer. Es lo que conviene cuando hay una oferta clara y un solo público.",
                    pie: `Desde ${money(850000)} · 5 días`,
                  },
                },
                {
                  etiqueta: "El negocio completo",
                  siguiente: {
                    tipo: "resultado",
                    titulo: "Web corporativa",
                    detalle:
                      "Varias páginas: servicios, quiénes somos, contacto. Es la que sostiene un negocio con más de una línea.",
                    pie: `Desde ${money(PRICES.base.corp)} · 1 a 2 semanas`,
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
};

function Pieza({
  n,
  nombre,
  ruta,
  para,
  children,
}: {
  n: string;
  nombre: string;
  ruta: string;
  para: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="jv-eyebrow text-accent-ink">
        {n} · {ruta}
      </p>
      <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">{nombre}</h2>
      <p className="mt-1.5 font-body text-[13px] leading-relaxed text-ink-soft">{para}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

export default function TallerDeVisuales() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className="pb-fab">
      <section className="mx-auto max-w-4xl px-5 pb-8 pt-16 md:px-8">
        <p className="jv-eyebrow text-accent-ink">
          Solo desarrollo · 404 en producción
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
          Taller de visuales
        </h1>
        <p className="mt-4 max-w-[60ch] font-body text-lg leading-relaxed text-ink-soft">
          Las doce piezas de <code className="font-mono text-[15px]">components/visuales/</code>,
          juntas. Míralas a 390 px antes que a 1440: es donde se rompen.
        </p>
      </section>

      <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
        <Pieza
          n="01"
          nombre="El hilo que contesta solo"
          ruta="visuales/HiloWhatsApp"
          para="/servicios/chatbot-whatsapp — y cualquier página que venda automatización."
        >
          <HiloWhatsApp className="mx-auto max-w-md" />
        </Pieza>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <Pieza
          n="02"
          nombre="El rail del plazo"
          ruta="visuales/RailPlazo"
          para="El tramo punteado de antes del día 1 es el argumento. Fíjate en que rota a columna."
        >
          <RailPlazo
            hitos={[
              { etiqueta: "Día 1", texto: "Estructura: qué ve tu cliente y en qué orden." },
              { etiqueta: "Día 2 y 3", texto: "Diseño y programación, al mismo tiempo." },
              { etiqueta: "Día 4", texto: "La revisas conmigo, en vivo, y ajustamos." },
              { etiqueta: "Día 5", texto: "Sale al aire y te enseño a manejarla." },
            ]}
          />
        </Pieza>
      </section>

      <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
        <Pieza
          n="03"
          nombre="El bloque local + la ficha"
          ruta="visuales/BloqueLocalGoogle · visuales/FichaGoogle"
          para="Insumo y resultado, montados en dos paneles. A 390 se apilan en ese orden."
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
            <FichaGoogle />
            <BloqueLocalGoogle />
          </div>
        </Pieza>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <Pieza
          n="04"
          nombre="La casilla vacía"
          ruta="visuales/CasillaVacia"
          para="/diseno-de-paginas-web-en-bogota — el hueco declarado en la vitrina."
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {["Bloomrose", "Halcón OS", "Hummik"].map((t) => (
              <article
                key={t}
                className="grid min-h-[12rem] place-items-center jv-card p-6 text-center"
              >
                <span className="font-body text-ink-soft">{t}</span>
              </article>
            ))}
            <CasillaVacia rotulo="Sin cliente de Bogotá">
              Todavía no hay un cliente de Bogotá. Cuando lo haya, va aquí.
            </CasillaVacia>
          </div>
        </Pieza>
      </section>

      <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
        <Pieza
          n="05"
          nombre="El sumador"
          ruta="visuales/SumadorSeo"
          para="Todas las cifras salen de SEO_PRICES. Dos totales, no uno."
        >
          <SumadorSeo className="mx-auto max-w-2xl" />
        </Pieza>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <Pieza
          n="06"
          nombre="Incluye / no incluye"
          ruta="visuales/Comparador"
          para="La etiqueta de quién lo hace va inline, pegada a la última palabra."
        >
          <Comparador
            tituloIncluye="Qué entra por ese precio"
            tituloNoIncluye="Qué no entra"
            nota="Esta lista vale más que la de arriba. Los proyectos no se dañan por lo que se prometió: se dañan por lo que cada uno dio por hecho."
            incluye={[
              "Panel de administración de productos, precios e inventario",
              "Carrito, cálculo de totales y proceso de compra completo",
              "Cobro en línea con pasarela: PSE, Nequi, Bancolombia y tarjeta",
              "Capacitación de entrega y 30 días de ajustes sin costo",
            ]}
            noIncluye={[
              { texto: "La habilitación de tu empresa ante la DIAN.", quien: "tu contador" },
              { texto: "La cuenta en la pasarela ni sus comisiones.", quien: "la pasarela" },
              { texto: "La logística: no empaco ni despacho.", quien: "la transportadora" },
              { texto: "La fotografía de producto.", quien: "se cotiza aparte" },
              { texto: "El tráfico: una tienda no trae gente sola.", quien: "es otro trabajo" },
            ]}
          />
        </Pieza>
      </section>

      <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
        <Pieza
          n="07"
          nombre="¿Landing o corporativa?"
          ruta="visuales/ArbolDecision"
          para="Su forma nativa es la de 390. La primera rama saca honestamente hacia tiendas."
        >
          <ArbolDecision raiz={ARBOL} className="mx-auto max-w-2xl" />
        </Pieza>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <Pieza
          n="08"
          nombre="La lista de acopio"
          ruta="visuales/ListaAcopio"
          para="Toda la fila es el objetivo táctil (.tap-row), no el cuadradito de 20 px."
        >
          <ListaAcopio
            className="mx-auto max-w-2xl"
            almacen="lab-acopio"
            items={[
              "Tu logo, en el mejor archivo que tengas",
              "Los textos, o el visto bueno para que los escriba yo",
              "Fotos del sitio, del equipo y del trabajo hecho",
              "Precios o tarifas, si los vas a publicar",
              "Horarios reales, sábados incluidos",
              "Accesos al dominio y al correo, si ya los tienes",
              "Registro profesional, si tu sector lo exige",
            ]}
          />
        </Pieza>
      </section>

      <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
        <Pieza
          n="09"
          nombre="La distancia real"
          ruta="visuales/RailDistancia"
          para="Paradas equiespaciadas a propósito: no es un mapa a escala."
        >
          <RailDistancia className="mx-auto max-w-3xl" />
        </Pieza>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <Pieza
          n="10"
          nombre="El panel que te queda"
          ruta="visuales/PanelAutonomia"
          para="Decorado, no formulario: nada de esto recibe foco de teclado."
        >
          <PanelAutonomia className="mx-auto max-w-md" />
        </Pieza>
      </section>

      <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
        <Pieza
          n="11"
          nombre="Teléfono y escritorio, con deslizador"
          ruta="visuales/ComparadorAnchos"
          para="BLOQUEADO hasta que existan capturas móviles reales. Abajo se ve su guardia."
        >
          <div className="mx-auto max-w-2xl">
            <p className="font-body text-[15px] leading-relaxed text-ink-soft">
              El componente se niega a pintar si las dos fuentes son la misma imagen, para que
              nadie haga pasar una captura de escritorio recortada por una de móvil. Esto es lo
              que sale mientras tanto:
            </p>
            {/* A propósito: la misma captura en los dos lados dispara la guardia. */}
            <ComparadorAnchosDemo />
          </div>
        </Pieza>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
        <p className="font-mono text-[11px] leading-relaxed text-ink-soft">
          Piso de SEO local leído en vivo desde lib/quote.ts:{" "}
          <strong className="text-ink">{money(SEO_PRICES.plan.local)}/mes</strong>. Si este número
          no coincide con el de la página, la página tiene un literal escrito a mano.
        </p>
      </section>
    </main>
  );
}

/* La misma captura en los dos lados a propósito: es lo que dispara la guardia
   del componente, y es lo que hay que poder ver en el taller. */
function ComparadorAnchosDemo() {
  const captura = {
    src: "/work/bloomrose.webp",
    alt: "Captura del sitio de Bloomrose",
    width: 1200,
    height: 800,
  };
  return <ComparadorAnchos escritorio={captura} movil={captura} />;
}
