import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Clock,
  CreditCard,
  ExternalLink,
  Smartphone,
  Truck,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Faqs } from "@/components/Faqs";
import { sinPendientes } from "@/components/Pendiente";
import { BotonCuentame } from "@/components/Cuentame";
import { Comparador } from "@/components/visuales/Comparador";
import { ListaAcopio } from "@/components/visuales/ListaAcopio";
import { PanelAutonomia } from "@/components/visuales/PanelAutonomia";
import { RailPlazo } from "@/components/visuales/RailPlazo";
import { SITE_URL } from "@/lib/site";
import { PRICES, money } from "@/lib/quote";

/**
 * Página de servicio para la intención transaccional «tienda virtual».
 *
 * DECISIÓN DE VOCABULARIO, y no es cosmética: en Colombia el dueño del negocio
 * busca «tienda virtual» —por eso va en la URL y en el h1— mientras que el
 * precio publicado en /precios, las tres páginas de ciudad y los dos sectores
 * ya dicen «tienda online». Las dos frases son la MISMA intención de búsqueda,
 * así que van en la MISMA página: «tienda virtual» al frente, «tienda online»
 * en el title, la descripción y el cuerpo, para no partir en dos una palabra
 * que ya está publicada con precio y plazo.
 *
 * «E-commerce» y «comercio electrónico» también viven adentro, nunca al frente:
 * los busca quien ya sabe de qué habla, y a ese no hay que convencerlo.
 *
 * El title y el h1 salen del mapa de `SEO-INTENCIONES-DE-COMPRA.md`; al title
 * se le sumó «tienda online» por lo anterior, sin pasar de 70 caracteres.
 */
export const metadata: Metadata = {
  title: "Creación de tiendas virtuales y tienda online en Colombia | JV Agencia",
  description:
    "Creo tu tienda virtual con catálogo, inventario, carrito, pagos con PSE, Nequi y tarjeta y envíos cotizados. Tienda online desde $2.500.000, lista en 3 semanas.",
  alternates: { canonical: "/servicios/tiendas-virtuales" },
  openGraph: {
    title: "Creación de tiendas virtuales y tienda online en Colombia | JV Agencia",
    description:
      "Tu tienda virtual cobra sola: PSE, Nequi y tarjeta, inventario y envíos. Desde $2.500.000, lista en 3 semanas.",
    url: `${SITE_URL}/servicios/tiendas-virtuales`,
    type: "website",
  },
};

/**
 * Los dos números publicados de esta página. No salen de `PRICES.base.ecom`:
 * esa es la base del cotizador antes de sumar pasarela, catálogo y envíos, y
 * no coincide con el piso que anuncia el sitio. Estaban escritos a mano en
 * cuatro sitios distintos de este mismo archivo.
 */
const PISO_TIENDA = 2500000;
const RENOVACION_ANUAL = 290000;

const PARA_QUIEN = [
  {
    titulo: "Vendes por Instagram y anotas los pedidos a mano",
    desc: "El DM, la foto otra vez, el número de Nequi, el comprobante y una libreta. Funciona hasta el día que se te cruzan tres pedidos.",
  },
  {
    titulo: "No sabes con certeza qué te queda",
    desc: "Vendiste la última talla M ayer y hoy la volviste a vender. A alguien le toca esperar o le devuelves la plata, y esa persona no vuelve.",
  },
  {
    titulo: "Te compran de otras ciudades y el envío lo calculas a ojo",
    desc: "Unas veces cobras de más y pierdes la venta; otras cobras de menos y el envío se come la ganancia de ese pedido.",
  },
  {
    titulo: "Quieres que te compren a las 11 de la noche",
    desc: "El que decide comprar un domingo no espera al lunes. O paga ahí mismo, o no paga.",
  },
];

/**
 * La comparativa de plataformas. Va DENTRO de esta página a propósito: hacer
 * una página por «Shopify Colombia» y otra por «WooCommerce Colombia» sería
 * exactamente la página-puerta que Google castiga, y además serían dos páginas
 * peleando por el mismo cliente.
 */
const PLATAFORMAS = [
  {
    t: "Shopify o Tiendanube",
    d: "Alquilas la tienda. Cada cosa que quieras cambiar depende de que exista una app que la haga.",
    filas: {
      dia1: "Sale en dos días",
      despues: "Mensualidad de plataforma",
      venta: "Comisión, si no usas su pasarela",
    },
    veredicto:
      "Si vas a probar si vendes en línea y todavía no quieres invertir, esto es lo correcto. Te lo digo aunque no me convenga.",
  },
  {
    t: "WooCommerce sobre WordPress",
    d: "Es tuyo. Lo caro es después: plugins que se pisan entre sí y actualizaciones que rompen el pago.",
    filas: {
      dia1: "Barato de arrancar",
      despues: "Alojamiento, plugins y mantenimiento",
      venta: "—",
    },
    veredicto:
      "Se puede sostener bien, pero hay que sostenerlo. Sin mantenimiento, es la que más se cae.",
  },
  {
    t: "A la medida — lo que yo hago",
    d: "Se programa lo que tu negocio necesita y nada más. Es lo que está corriendo hoy en Bloomrose.",
    destacada: true,
    filas: {
      dia1: "Cuesta más y no sale en dos días",
      despues: `Renovación anual de ${money(RENOVACION_ANUAL)}`,
      venta: "—",
    },
    veredicto:
      "A cambio de ese primer día, no hay mensualidad de plataforma ni comisión por vender.",
  },
];

/**
 * Las tres filas de la matriz. Son CUALITATIVAS a propósito: esta página se
 * niega —con razón escrita en el código— a publicar tarifas de terceros que no
 * puede verificar, y una cifra desactualizada en una tabla de precios es una
 * mentira con fecha. El único número que aparece es el propio.
 */
const FILAS_PLATAFORMA = [
  { clave: "dia1", etiqueta: "El día 1" },
  { clave: "despues", etiqueta: "Después" },
  { clave: "venta", etiqueta: "Por venta" },
] as const;

/** Lo que entra por el precio base publicado. Sale de `lib/quote.ts`. */
const INCLUYE = [
  "Seis páginas: inicio, catálogo, ficha de producto, carrito y pago, contacto, y privacidad y términos",
  "Panel de productos, precios e inventario, para que lo manejes tú",
  "Catálogo, fichas con galería y proceso de compra completo",
  "Panel de pedidos con estados y aviso al cliente cuando cambian",
  "Cobro en línea: PSE, Nequi, Bancolombia y tarjeta",
  "Envío cotizado por ciudad o por peso, y opción de recoger en tienda",
  "Datos estructurados de producto, para que Google muestre precio y existencias",
  "Diseño propio, sin plantilla comprada, armado desde la pantalla del teléfono",
  "Certificado de seguridad (HTTPS), respaldo y velocidad revisada antes de entregar",
  "Capacitación de entrega y 30 días de ajustes sin costo",
];

/** Lo que NO entra. Es la mitad que decide si el proyecto sale bien o mal. */
const NO_INCLUYE = [
  {
    texto: "La habilitación de tu empresa ante la DIAN. Sin ella no hay conexión de facturación que valga.",
    quien: "tu contador",
  },
  {
    texto: "La cuenta en la pasarela ni sus comisiones. La abres tú, a tu nombre, y la plata te llega directo.",
    quien: "la pasarela",
  },
  {
    texto: "La logística: no empaco, no despacho y no negocio tarifas por ti.",
    quien: "la transportadora",
  },
  {
    texto: "La fotografía de producto. Si no la tienes, te digo con quién.",
    quien: "un fotógrafo",
  },
  {
    texto: "El tráfico. Una tienda no trae gente sola.",
    quien: "SEO o publicidad",
  },
  {
    texto: "Dropshipping, marketplaces ni montarte en Mercado Libre o Amazon.",
    quien: "no lo vendo",
  },
  {
    texto: "Ventas garantizadas. El que te las prometa te está mintiendo.",
    quien: "nadie",
  },
];

/** Lo que se cobra aparte. Los números salen de `lib/quote.ts`, no de mi cabeza. */
const EXTRAS = [
  {
    t: "Variantes de producto",
    p: PRICES.toggles.variants,
    d: "Talla, color, sabor o presentación en un mismo producto, cada una con su propio inventario y su propio aviso de agotado.",
  },
  {
    t: "Cupones y descuentos",
    p: PRICES.toggles.coupons,
    d: "Códigos por porcentaje o por monto, con vigencia, tope de usos y precio tachado en el catálogo mientras dura.",
  },
  {
    t: "Recuperación de carrito",
    p: PRICES.toggles.cartrecovery,
    d: "Al que dejó la compra a medias se le recuerda por correo o por WhatsApp, y queda el informe de cuántos carritos volvieron.",
  },
  {
    t: "Facturación electrónica (DIAN)",
    p: PRICES.toggles.invoicing,
    d: "La factura sale sola al confirmarse el pago, con su IVA o su INC, conectada a un proveedor autorizado por la DIAN.",
  },
  {
    t: "Migrar la tienda que ya tienes",
    p: PRICES.migracion.migrar,
    d: "Traer catálogo, clientes y direcciones desde Shopify, WooCommerce o de donde estés hoy, sin perder lo que ya te posiciona.",
  },
];

/**
 * Las tres semanas, dibujadas. El tramo previo del rail es la condición que
 * más discusiones ahorra después: el reloj arranca con el catálogo completo,
 * no con la firma.
 */
const PREVIO_PLAZO = {
  etiqueta: "Antes de la semana 1",
  texto: "Tu catálogo completo: fotos, precios, pesos y existencias. El reloj no ha arrancado.",
};

const HITOS_PLAZO = [
  {
    etiqueta: "Semana 1",
    texto: "Diseño y catálogo: categorías, fichas, fotos, precios e inventario inicial.",
  },
  {
    etiqueta: "Semana 2",
    texto: "Pagos y envíos: la pasarela conectada a tu cuenta y compras de prueba con plata real.",
  },
  {
    etiqueta: "Semana 3",
    texto: "Sale al aire con tu dominio y te siento a subir un producto y a despachar un pedido.",
  },
];

/** Lo que hace falta para cotizar y para que arranque el reloj. */
const MATERIAL = [
  "Cuántos productos son, contados",
  "Si tienen tallas, colores o presentaciones",
  "Fotos de cada producto",
  "Precios y existencias de arranque",
  "Cuánto pesa y cuánto mide lo que despachas",
  "A qué ciudades despachas",
  "Tu cuenta en la pasarela, abierta a tu nombre",
  "Tu logo, en el mejor archivo que tengas",
];

const FAQS = [
  {
    q: "¿Con qué me van a pagar mis clientes?",
    a: "PSE, tarjeta débito y crédito, Nequi y Bancolombia, según lo que habilite la pasarela que escojas. Y si quieres, el botón de cerrar el pedido por WhatsApp al lado: en Colombia todavía mucha gente prefiere hablar antes de pagar, y perder esa venta por purismo sería bobo.",
  },
  {
    q: "¿Cuánto me cobra la pasarela por cada venta?",
    /* La cifra va como RANGO y dicho que es aproximado, y el número que manda
       es el de la pasarela. Publicar aquí la tarifa exacta de cada una sería
       firmar un dato que ninguna de las cuatro me deja verificar desde fuera
       —Wompi responde 403, PayU redirige a otro dominio y Mercado Pago pide
       sesión— y que además cambian cuando quieren. Un rango orienta sin
       prometer; una cifra desactualizada en una página de precios es una
       mentira con fecha. */
    a: "Eso lo cobra la pasarela, no yo. De referencia: en Colombia la comisión anda entre el 2,5 % y el 3,5 % de cada venta más un fijo de unos $700 a $1.000 por transacción, y sobre eso el IVA. Es un aproximado —cambia según el medio de pago (PSE no cuesta lo mismo que una tarjeta de crédito) y según cuánto factures al mes—, así que la cifra que manda es la que publica cada pasarela en su documentación oficial: ePayco, Wompi, PayU y Mercado Pago la tienen en su propia página de tarifas y ahí hay que mirarla antes de escoger. La cuenta la abres tú, a tu nombre, y el dinero llega a tu cuenta sin pasar por la mía.",
  },
  {
    q: "¿Voy a pagar mensualidad y además comisión por venta?",
    a: `Mensualidad de plataforma, no: la tienda es tuya y no le alquilas nada a nadie. Comisión por venta a mí, tampoco. Lo que sí hay es la renovación anual de ${money(RENOVACION_ANUAL)}, que cubre dominio, alojamiento y que la tienda siga en pie; y la comisión de la pasarela, que la cobra la pasarela y le llega a todo el mundo por igual.`,
  },
  {
    q: "¿Y la facturación electrónica de la DIAN? ¿Se conecta?",
    a: `Sí. Se conecta con un proveedor tecnológico autorizado por la DIAN y la factura se emite y se le envía al comprador al confirmarse el pago, con su IVA, su INC o su exención. Va aparte, desde ${money(PRICES.toggles.invoicing)}. Lo que no puedo hacer por ti es habilitar tu empresa ante la DIAN: ese trámite es tuyo, y sin él no hay conexión posible.`,
  },
  {
    q: "¿Cómo se calcula el envío? ¿Y la contraentrega?",
    a: "Se configuran tarifas por ciudad o por peso, y las cambias tú cuando la transportadora suba. Va también el umbral de envío gratis desde cierto monto, la opción de recoger en tienda y el número de guía que le llega al cliente cuando despachas. Contraentrega se puede, si tu transportadora te la habilita a ti. Lo que no hago es despachar ni negociar tarifas en tu nombre.",
  },
  {
    q: "¿Yo puedo subir productos y cambiar precios sin llamarte?",
    a: "Sí, y esa es la idea. El panel es tuyo: productos, precios, inventario y pedidos. En la entrega te siento a hacerlo hasta que te salga sin ayuda. Una tienda que depende de que yo conteste es una tienda mal entregada.",
  },
  {
    q: "¿Cuántos productos aguanta?",
    a: `Los que necesites: no hay un techo técnico. Lo que sube por franjas es el trabajo de montar y organizar el catálogo — ${PRICES.productsTier
      .map((t) => `${t.label} suma ${money(t.add)}`)
      .join("; ")}. El precio de arranque cubre la primera franja.`,
  },
  {
    q: "¿Qué pasa cuando alguien deja el carrito abandonado?",
    a: `Se le recuerda. Correo o WhatsApp con lo que dejó a medias, y el informe de cuántos carritos volvieron y por cuánta plata. Va aparte, desde ${money(PRICES.toggles.cartrecovery)}, y suele pagarse solo: el carrito abandonado es la venta que ya estaba casi hecha.`,
  },
  {
    q: "¿Se compra bien desde el celular?",
    a: "Ahí es donde se cae la venta, así que ahí es donde se prueba primero. La tienda se arma empezando por la pantalla del teléfono y no adaptándola después, y la velocidad se revisa antes de entregar. Si el pago se demora en un celular con dos rayitas de señal, la venta se perdió y no hay diseño bonito que la salve.",
  },
  {
    q: "Ya vendo por Instagram y por WhatsApp. ¿Para qué quiero una tienda?",
    a: "Para dejar de ser tú el cuello de botella. Instagram no cobra por ti, no te lleva el inventario, no te dice cuánto vendiste el mes pasado y te puede cerrar la cuenta un martes sin explicarte nada. La tienda es tuya y no se la puede quitar nadie. Y no reemplaza el WhatsApp: se lo pones al lado, para el que quiere preguntar antes de pagar.",
  },
  {
    q: "¿En cuánto la tienes lista de verdad?",
    a: "Tres semanas, contadas desde que el catálogo está completo. Ese es el detalle que casi nadie aclara: el reloj no arranca cuando firmas, arranca cuando tengo fotos, precios y existencias. Si me entregas ochocientos productos con tallas y colores en un archivo a medio llenar, no son tres semanas — y te lo digo en la primera llamada, no al final.",
  },
  {
    q: "¿Y si se cae la tienda un sábado a mediodía?",
    a: "La tienda queda con respaldo y corriendo en infraestructura que aguanta picos, y la renovación anual cubre que siga en pie. No te voy a prometer que contesto en tres minutos un sábado, porque soy una persona y no un call center. Lo que sí: el número por el que me contrataste es el mismo por el que me escribes, y no desaparezco al entregar.",
  },
  {
    q: "¿Quién responde por la seguridad y por los datos de mis clientes?",
    a: "La tienda va con certificado de seguridad y respaldo. Los datos de tarjeta no pasan por tu tienda ni por mis manos: los captura la pasarela, que es la que está certificada para eso. Y como en Colombia aplica la Ley 1581 de protección de datos, la tienda sale desde el primer día con su aviso de privacidad y sus términos.",
  },
  {
    q: "¿Se conecta con el inventario o con el sistema de mi contador?",
    a: "Depende de qué uses hoy. Si tu sistema tiene por dónde conectarse, se conecta, y se cotiza según el alcance del trabajo. Si hoy llevas el inventario en una hoja de cálculo, el panel de la tienda pasa a ser tu inventario y dejas de llevar dos cuentas que nunca cuadran.",
  },
];

/**
 * Los tres pasos de la compra, maquetados.
 *
 * Cuatro de los renglones de INCLUYE eran la descripción de estas tres
 * pantallas. Enseñar la casilla «M · agotada» dice más sobre control de
 * inventario que cualquier bullet, y la duda que frena una tienda de dos
 * millones y medio no es qué trae, es si de verdad va a cobrar sola.
 *
 * REGLAS QUE SE RESPETAN ACÁ:
 *  · Es DECORADO: los controles son <span>/<div> con aria-hidden. Un botón de
 *    verdad que no hace nada es una trampa para quien navega con teclado.
 *    Este bloque no aporta ni un enfocable a la página.
 *  · Los nombres de las pasarelas van como TEXTO, nunca su logotipo.
 *  · Producto y precios son de ejemplo y lo dice el rótulo. No se usan los de
 *    Bloomrose: inventar precios sobre el catálogo de una clienta real sería
 *    inventar datos sobre un tercero.
 *  · A 390 es un carril con arrastre y anclaje —asoma el borde del siguiente,
 *    así el gesto se entiende sin instrucciones—; scrollea la caja, nunca el
 *    documento. De sm en adelante, el MISMO DOM es una rejilla de tres.
 */
const TALLAS = [
  { t: "S", agotada: false },
  { t: "M", agotada: true },
  { t: "L", agotada: false },
];

const PAGOS = ["PSE", "Nequi", "Bancolombia", "Tarjeta débito o crédito"];

function PasosCompra() {
  return (
    <div className="-mx-5 flex w-[calc(100%+2.5rem)] snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-1 no-scrollbar sm:mx-0 sm:grid sm:w-full sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0">
      {/* 1 · Ficha con variantes */}
      <article className="flex w-[86%] shrink-0 snap-center flex-col rounded-2xl border border-line bg-surface p-5 sm:w-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink">
          1 · Ficha
        </p>
        <h3 className="mt-2 font-body text-lg font-semibold text-ink">La talla que se acabó, marcada</h3>
        <p className="mt-1.5 font-body text-[13px] leading-snug text-ink-soft">
          Talla, color o presentación, cada una con su propio inventario.
        </p>

        <div aria-hidden className="mt-4 flex flex-1 flex-col">
          <div className="grid aspect-[5/3] shrink-0 place-items-center rounded-lg bg-gradient-to-br from-band to-line">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
              Tu foto
            </span>
          </div>
          <p className="mt-3 font-body text-sm font-semibold text-ink">Producto de ejemplo</p>
          <p className="font-mono text-[15px] tabular-nums text-primary-dark">$ 89.000</p>
          <div className="mb-4 mt-3 flex flex-wrap items-center gap-2">
            {TALLAS.map((x) => (
              <span
                key={x.t}
                className={
                  x.agotada
                    ? "rounded-md border border-dashed border-line px-3 py-1.5 font-mono text-[13px] text-ink-soft line-through"
                    : "rounded-md border border-line px-3 py-1.5 font-mono text-[13px] text-ink"
                }
              >
                {x.t}
              </span>
            ))}
            {/* `basis-full` la baja a su propio renglón: pegada a la L se leía
                como una cuarta talla. */}
            <span className="basis-full font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
              M · agotada
            </span>
          </div>
          <span className="mt-auto flex min-h-11 items-center justify-center rounded-full bg-primary px-5 font-body text-sm font-semibold text-on-accent">
            Agregar al carrito
          </span>
        </div>
      </article>

      {/* 2 · Carrito y envío */}
      <article className="flex w-[86%] shrink-0 snap-center flex-col rounded-2xl border border-line bg-surface p-5 sm:w-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink">
          2 · Carrito
        </p>
        <h3 className="mt-2 font-body text-lg font-semibold text-ink">El envío, cotizado antes de pagar</h3>
        <p className="mt-1.5 font-body text-[13px] leading-snug text-ink-soft">
          Por ciudad o por peso, con las tarifas que cambias tú.
        </p>

        <dl aria-hidden className="mb-4 mt-4 divide-y divide-line">
          {[
            ["Subtotal", "$ 178.000"],
            ["Envío a Cartagena", "$ 12.000"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3 py-2.5">
              <dt className="font-body text-[13px] text-ink-soft">{k}</dt>
              <dd className="shrink-0 font-mono text-[13px] tabular-nums text-ink">{v}</dd>
            </div>
          ))}
          <div className="flex items-baseline justify-between gap-3 py-2.5">
            <dt className="font-body text-sm font-semibold text-ink">Total</dt>
            <dd className="shrink-0 font-mono text-[15px] tabular-nums text-primary-dark">
              $ 190.000
            </dd>
          </div>
        </dl>
        <span
          aria-hidden
          className="mt-auto flex min-h-11 items-center justify-center rounded-full bg-primary px-5 font-body text-sm font-semibold text-on-accent"
        >
          Ir a pagar
        </span>
      </article>

      {/* 3 · Pago */}
      <article className="flex w-[86%] shrink-0 snap-center flex-col rounded-2xl border border-line bg-surface p-5 sm:w-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink">
          3 · Pago
        </p>
        <h3 className="mt-2 font-body text-lg font-semibold text-ink">Cobra a las once de la noche</h3>
        <p className="mt-1.5 font-body text-[13px] leading-snug text-ink-soft">
          La plata cae en tu cuenta. La pasarela es tuya y va a tu nombre.
        </p>

        <ul aria-hidden className="mb-4 mt-4 grid gap-2">
          {PAGOS.map((m, i) => (
            <li
              key={m}
              className={
                i === 0
                  ? "flex min-h-11 items-center gap-3 rounded-lg border border-primary/40 bg-primary/[0.06] px-3"
                  : "flex min-h-11 items-center gap-3 rounded-lg border border-line px-3"
              }
            >
              <span
                className={
                  i === 0
                    ? "h-3 w-3 shrink-0 rounded-full border-[3px] border-primary"
                    : "h-3 w-3 shrink-0 rounded-full border border-line"
                }
              />
              <span className="min-w-0 font-body text-[13px] text-ink">{m}</span>
            </li>
          ))}
        </ul>
        <span
          aria-hidden
          className="mt-auto flex min-h-11 items-center justify-center rounded-full bg-primary px-5 font-body text-sm font-semibold text-on-accent"
        >
          Pagar $ 190.000
        </span>
      </article>
    </div>
  );
}

export default function TiendasVirtualesPage() {
  // Datos estructurados de Service. Sin FAQPage a propósito: desde 2023 Google
  // lo restringió a sitios de gobierno y salud, y aquí no da resultado
  // enriquecido — solo peso muerto en el HTML.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/servicios/tiendas-virtuales#servicio`,
    name: "Creación de tiendas virtuales",
    alternateName: [
      "Tienda online",
      "Tienda en línea",
      "Desarrollo de e-commerce",
      "Comercio electrónico",
    ],
    serviceType: "Diseño y desarrollo de tiendas virtuales",
    description:
      "Diseño y programación de tiendas virtuales a la medida: catálogo con inventario, carrito, cuentas de cliente, cobro en línea con PSE, Nequi y tarjeta, y cotización de envíos.",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "Place", name: "Latinoamérica" },
    ],
    url: `${SITE_URL}/servicios/tiendas-virtuales`,
    offers: {
      "@type": "Offer",
      name: "Tienda online",
      description:
        "Tienda en línea con catálogo, carrito, cuentas, pagos y envíos. Entrega en 3 a 5 semanas desde que el catálogo está completo.",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "COP",
        // «desde» es un piso, no una tarifa cerrada: minPrice, no price.
        minPrice: PISO_TIENDA,
      },
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}/#organization` },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        {/* ── Encabezado ─────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 pb-8 pt-32 text-center md:px-8 md:pt-40">
          <Reveal>
            <Badge>Tiendas virtuales</Badge>
            <h1 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
              Tiendas virtuales que cobran solas,{" "}
              <span className="block text-metal">sin el caos del DM</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Hoy vendes contestando: mandas la foto otra vez, pasas el número de Nequi, esperas
              el comprobante y anotas el pedido donde puedas. Vendes tú, uno por uno, y solo
              mientras estés despierto. Una tienda muestra, cobra y deja el pedido listo.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href="/#contacto">
                  Agenda una llamada <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#precios">Ver precios</a>
              </Button>
            </div>
          </Reveal>
        </section>

        {/* ── El diferenciador, arriba y no enterrado ─────────────────── */}
        {/* Sin tarjeta propia: la sección va DENTRO de una banda y el tono lo
            pone la banda. El degradado y el borde apilaban dos tonos. */}
        <section className="banda mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Casi todos te alquilan una plantilla.
              <span className="text-metal"> Yo te construyo la tienda.</span>
            </h2>
            <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Lo común es que te monten en una plataforma alquilada: mensualidad que sube justo
              cuando te empieza a ir bien, comisión por venta encima de la de la pasarela, y el
              día que te vayas, el catálogo y las cuentas de tus clientes se quedan del lado de
              ellos.
            </p>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              <strong className="text-ink">Yo te programo la tienda, no te la arriendo.</strong>{" "}
              Corre en tu dominio, el catálogo y los datos son tuyos, y no le pagas comisión a
              nadie por vender. De cada venta solo se descuenta lo de la pasarela.
            </p>
          </Reveal>
        </section>

        {/* ── Para quién es ──────────────────────────────────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Esto te sirve si te pasa alguna de estas
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PARA_QUIEN.map((p, i) => (
              <Reveal key={p.titulo} delay={i * 80}>
                <article className="h-full rounded-2xl border border-line bg-surface/70 p-7">
                  <h3 className="font-body text-xl font-semibold text-ink">{p.titulo}</h3>
                  <p className="mt-2 font-body leading-relaxed text-ink-soft">{p.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Shopify vs WooCommerce vs a la medida ───────────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              ¿Shopify, WooCommerce o a la medida?
            </h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              El eje real es qué pagas y cuándo. Lo contesto sin defender la mía a la fuerza: hay
              casos en los que no me necesitas.
            </p>
          </Reveal>

          {/* Tres tarjetas con las MISMAS tres filas en el mismo orden. Es una
              matriz que se lee en paralelo en escritorio y en secuencia a 390,
              sin tabla que desborde ni transposición que mantener. */}
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PLATAFORMAS.map((p, i) => (
              <Reveal key={p.t} delay={i * 70}>
                <article
                  className={
                    p.destacada
                      ? "flex h-full flex-col rounded-2xl border border-primary/25 bg-surface p-6 shadow-soft"
                      : "flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-6"
                  }
                >
                  <h3 className="font-body text-xl font-semibold leading-tight text-ink">{p.t}</h3>
                  <p className="mt-2 font-body text-[13px] leading-snug text-ink-soft">{p.d}</p>

                  <dl className="mt-5 divide-y divide-line border-y border-line">
                    {FILAS_PLATAFORMA.map((f) => (
                      <div key={f.clave} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-3 py-3">
                        <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink">
                          {f.etiqueta}
                        </dt>
                        <dd className="min-w-0 font-body text-[13px] leading-snug text-ink">
                          {p.filas[f.clave]}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-5 flex-1 font-body text-sm leading-relaxed text-ink">
                    {p.veredicto}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Precios ────────────────────────────────────────────────── */}
        <section id="precios" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-12 md:px-8">
          <Reveal>
            <Badge>Precios</Badge>
            <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
              Cuánto cuesta una tienda virtual en Colombia
            </h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              El mismo que está en{" "}
              <Link href="/precios" className="text-primary-dark underline underline-offset-4">
                la página de precios
              </Link>
              . Sin cotización a puerta cerrada y sin dejar el correo para enterarte.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-10 rounded-[1.75rem] border border-primary/20 bg-surface/70 p-8 md:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
                <h3 className="font-display text-2xl text-ink sm:text-3xl">
                  Tienda online completa
                </h3>
                <p className="font-mono text-2xl text-primary-dark">desde {money(PISO_TIENDA)}</p>
              </div>
              <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-line bg-background/50 px-4 py-2 font-body text-sm text-ink-soft">
                <Clock className="h-4 w-4 text-accent" />3 a 5 semanas desde que el catálogo está
                completo
              </p>
              <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
                Catálogo con inventario, carrito, cuentas, cobro en línea y envíos. Lo mismo que
                corre hoy en Bloomrose, no una versión recortada para la foto.
              </p>
            </div>
          </Reveal>

          <div className="mt-10">
            <Reveal>
              <h3 className="font-display text-2xl text-ink">Lo que se cobra aparte</h3>
              <p className="mt-3 max-w-2xl font-body leading-relaxed text-ink-soft">
                No todas las tiendas lo necesitan, así que no se lo cobro a todas.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {EXTRAS.map((e, i) => (
                <Reveal key={e.t} delay={i * 60}>
                  <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-7">
                    <h4 className="font-body text-lg font-semibold text-ink">{e.t}</h4>
                    <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink-soft">
                      {e.d}
                    </p>
                    <p className="mt-5 border-t border-line pt-4 font-mono text-base text-primary-dark">
                      desde {money(e.p)}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal>
            <div className="mt-6 rounded-2xl border border-line bg-background/40 p-7">
              <p className="font-body leading-relaxed text-ink-soft">
                <strong className="text-ink">Dos cosas que aclaro de entrada.</strong> La{" "}
                <strong className="text-ink">comisión de la pasarela</strong> —ePayco, Wompi, PayU
                o Mercado Pago— la cobra la pasarela sobre cada venta, con tu cuenta y a tu
                nombre: no la facturo yo y no está en estos precios.
              </p>
              <p className="mt-4 font-body leading-relaxed text-ink-soft">
                Y la{" "}
                <strong className="text-ink">
                  renovación anual es de {money(RENOVACION_ANUAL)}
                </strong>
                : cubre dominio, alojamiento y que la tienda siga en pie. No es mensualidad de
                plataforma, porque la tienda no se le alquila a nadie.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Qué incluye y qué no ───────────────────────────────────── */}
        <section className="banda mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <Comparador
              tituloComo="h2"
              tituloIncluye="Qué entra por ese precio"
              tituloNoIncluye={
                <>
                  Qué <span className="text-metal">no</span> entra
                </>
              }
              nota="Esta lista vale más que la de arriba. Los proyectos no se dañan por lo que se prometió: se dañan por lo que cada uno dio por hecho."
              incluye={INCLUYE}
              noIncluye={NO_INCLUYE}
            />
          </Reveal>
        </section>

        {/* ── Así compra tu cliente, así lo manejas tú ────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Así compra tu cliente</h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Tres pantallas, y en ese orden. La duda que frena una tienda no es qué trae: es si
              de verdad va a cobrar sola.
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-10">
            <PasosCompra />
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
              Ejemplo · pantallas de muestra, producto y precios inventados
            </p>
          </Reveal>

          <Reveal delay={200}>
            <PanelAutonomia
              className="mx-auto mt-12 max-w-md"
              titulo="Y esto lo haces tú, sin escribirme"
            />
          </Reveal>
        </section>

        {/* ── Cómo se hace ───────────────────────────────────────────── */}
        <section className="banda mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Cómo se hace</h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              Antes de cotizar necesito tu lista de productos. De ahí sale el precio y el plazo de
              verdad: sin eso, cualquier número que te dé —yo o el que sea— es adivinanza.
            </p>
          </Reveal>

          {/* El tramo punteado es la condición que más discusiones ahorra
              después: el reloj arranca con el catálogo, no con la firma. */}
          <Reveal delay={80}>
            <RailPlazo className="mt-10" previo={PREVIO_PLAZO} hitos={HITOS_PLAZO} />
          </Reveal>

          <Reveal delay={140}>
            <ListaAcopio
              className="mt-12 max-w-2xl"
              titulo="Qué necesito de ti para cotizar y arrancar"
              almacen="acopio-tienda-virtual"
              items={MATERIAL}
            />
          </Reveal>
        </section>

        {/* ── El trabajo real que respalda la página ──────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Una tienda que ya está vendiendo
            </h2>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              No es una maqueta ni un proyecto de estudio: es la tienda de una clienta, en
              producción y con dominio propio. Ábrela desde el celular.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <article className="mt-10 grid overflow-hidden rounded-[1.75rem] border border-line bg-surface/70 lg:grid-cols-2">
              {/* Proporción fija (16/9) en las dos anchuras y el mismo recorte
                  que usa Portfolio.tsx. El archivo mide 2000x1160, así que con
                  16/10 la ventana quedaba más angosta que la captura y
                  `object-cover` se comía el lado izquierdo de la tienda; y el
                  `scale-[1.04]` anclado arriba tapa la canaleta blanca que el
                  archivo trae por la derecha, sin tocar el asset. */}
              <div className="relative aspect-[16/9] self-start overflow-hidden bg-canvas">
                <Image
                  src="/work/bloomrose.webp"
                  alt="Tienda virtual de Bloomrose: catálogo de bisutería y accesorios con carrito y pagos en línea"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="origin-top scale-[1.04] object-cover object-top"
                />
              </div>
              <div className="p-8 md:p-10">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary-dark">
                  Bisutería y accesorios · Colombia
                </p>
                <h3 className="mt-4 font-display text-2xl text-ink sm:text-3xl">Bloomrose</h3>
                <p className="mt-4 font-body leading-relaxed text-ink-soft">
                  Bisutería y accesorios para el mercado colombiano. Catálogo con inventario,
                  carrito, cuentas, pagos en línea y envíos. Programada a la medida, no montada
                  sobre una plantilla.
                </p>
                <ul className="mt-6 grid gap-2.5">
                  {[
                    { icon: Boxes, t: "Catálogo con inventario que se descuenta solo" },
                    { icon: CreditCard, t: "Pagos en línea, con el pedido confirmado sin llamar" },
                    { icon: Truck, t: "Cotización de envío antes de terminar la compra" },
                    { icon: Smartphone, t: "Comprada desde el celular, que es como compra la gente" },
                  ].map((f) => (
                    <li
                      key={f.t}
                      className="flex items-start gap-3 font-body text-sm text-ink-soft"
                    >
                      <f.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{f.t}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://www.bloomroseaccesorios.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 font-body text-primary-dark underline underline-offset-4"
                >
                  bloomroseaccesorios.com
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </article>
          </Reveal>
        </section>

        {/* ── Preguntas ──────────────────────────────────────────────── */}
        <section className="banda mx-auto max-w-4xl px-5 py-12 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Lo que siempre preguntan</h2>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <Faqs items={sinPendientes(FAQS)} />
          </Reveal>
        </section>

        {/* ── Cierre ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8 md:py-24">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Mándame tu lista de productos
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
              Con cuántos son, si tienen tallas o colores y a dónde despachas, te digo en la
              misma llamada cuánto cuesta y en cuánto queda. Y si lo que te sirve es Shopify y no
              yo, también te lo digo.
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href="/#contacto">
                  Agenda una llamada <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <BotonCuentame />
            </div>
            <p className="mx-auto mt-8 max-w-xl font-body text-base leading-relaxed text-ink-soft">
              ¿Tienda, o basta con{" "}
              <Link
                href="/servicios/diseno-de-paginas-web"
                className="text-primary-dark underline underline-offset-4"
              >
                una página web
              </Link>
              ?{" "}
              <Link href="/precios" className="text-primary-dark underline underline-offset-4">
                Los dos precios están publicados
              </Link>{" "}
              y el caso está contado en{" "}
              <Link
                href="/blog/pagina-web-o-solo-instagram"
                className="text-primary-dark underline underline-offset-4"
              >
                página web o solo Instagram
              </Link>
              . Que el WhatsApp conteste solo es{" "}
              <Link
                href="/servicios/chatbot-whatsapp"
                className="text-primary-dark underline underline-offset-4"
              >
                el chatbot
              </Link>
              ; traer a la gente que compra es{" "}
              <Link
                href="/servicios/posicionamiento-seo"
                className="text-primary-dark underline underline-offset-4"
              >
                posicionamiento SEO
              </Link>
              , y se cobra aparte.
            </p>
          </Reveal>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
