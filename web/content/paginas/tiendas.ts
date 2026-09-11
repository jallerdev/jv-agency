import type { Texto, Traducido } from "@/content/types";

/**
 * TIENDAS VIRTUALES, EN LAS DOS LENGUAS
 * ──────────────────────────────────────────────────────────────────────────
 * DECISIÓN DE VOCABULARIO, y no es cosmética: en Colombia el dueño del negocio
 * busca «tienda virtual» —por eso va en la URL y en el h1— mientras que la
 * página de precios, las tres de ciudad y los dos sectores ya dicen «tienda
 * online». Son la MISMA intención de búsqueda, así que viven en la MISMA
 * página. En inglés el término es uno solo: «online store».
 *
 * «E-commerce» y «comercio electrónico» viven adentro, nunca al frente: los
 * busca quien ya sabe de qué habla, y a ese no hay que convencerlo.
 */
export const TIENDAS = {
  badge: { es: "Tiendas virtuales", en: "Online stores" },
  titulo: {
    es: "Tiendas virtuales que cobran solas,",
    en: "Online stores that charge on their own,",
  },
  tituloAcento: { es: "sin el caos del DM", en: "without the chaos of the DM" },
  entradilla: {
    es: "Hoy vendes contestando: mandas la foto otra vez, pasas el número de Nequi, esperas el comprobante y anotas el pedido donde puedas. Vendes tú, uno por uno, y solo mientras estés despierto. Una tienda muestra, cobra y deja el pedido listo.",
    en: "Today you sell by answering: you send the photo again, pass on the transfer details, wait for the receipt and write the order down wherever you can. You sell, one at a time, and only while you're awake. A store shows, charges and leaves the order ready.",
  },
  ctaPrincipal: { es: "Agenda una llamada", en: "Book a call" },
  ctaSecundario: { es: "Ver precios", en: "See pricing" },

  diferenciador: {
    titulo: {
      es: "Casi todos te alquilan una plantilla.",
      en: "Almost everyone rents you a template.",
    },
    acento: { es: "Yo te construyo la tienda.", en: "I build you the store." },
    parrafo1: {
      es: "Lo común es que te monten en una plataforma alquilada: mensualidad que sube justo cuando te empieza a ir bien, comisión por venta encima de la de la pasarela, y el día que te vayas, el catálogo y las cuentas de tus clientes se quedan del lado de ellos.",
      en: "The usual is that they put you on a rented platform: a monthly fee that goes up right when things start going well, a sales commission on top of the gateway's, and the day you leave, the catalogue and your customers' accounts stay on their side.",
    },
    fuerte: {
      es: "Yo te programo la tienda, no te la arriendo.",
      en: "I code the store for you, I don't rent it to you.",
    },
    parrafo2: {
      es: " Corre en tu dominio, el catálogo y los datos son tuyos, y no le pagas comisión a nadie por vender. De cada venta solo se descuenta lo de la pasarela.",
      en: " It runs on your domain, the catalogue and the data are yours, and you pay nobody a commission for selling. The only thing taken out of each sale is the gateway's cut.",
    },
  },

  paraQuienTitulo: {
    es: "Esto te sirve si te pasa alguna de estas",
    en: "This is for you if any of these happen",
  },
  paraQuien: [
    {
      titulo: {
        es: "Vendes por Instagram y anotas los pedidos a mano",
        en: "You sell on Instagram and write the orders down by hand",
      },
      cuerpo: {
        es: "El DM, la foto otra vez, el número de Nequi, el comprobante y una libreta. Funciona hasta el día que se te cruzan tres pedidos.",
        en: "The DM, the photo again, the transfer details, the receipt and a notebook. It works until the day three orders cross.",
      },
    },
    {
      titulo: {
        es: "No sabes con certeza qué te queda",
        en: "You don't know for sure what you have left",
      },
      cuerpo: {
        es: "Vendiste la última talla M ayer y hoy la volviste a vender. A alguien le toca esperar o le devuelves la plata, y esa persona no vuelve.",
        en: "You sold the last size M yesterday and sold it again today. Someone has to wait or gets a refund, and that person doesn't come back.",
      },
    },
    {
      titulo: {
        es: "Te compran de otras ciudades y el envío lo calculas a ojo",
        en: "People buy from other cities and you guess the shipping",
      },
      cuerpo: {
        es: "Unas veces cobras de más y pierdes la venta; otras cobras de menos y el envío se come la ganancia de ese pedido.",
        en: "Sometimes you charge too much and lose the sale; other times too little and the shipping eats that order's margin.",
      },
    },
    {
      titulo: {
        es: "Quieres que te compren a las 11 de la noche",
        en: "You want people to buy at 11 at night",
      },
      cuerpo: {
        es: "El que decide comprar un domingo no espera al lunes. O paga ahí mismo, o no paga.",
        en: "Whoever decides to buy on a Sunday doesn't wait for Monday. Either they pay right there, or they don't pay.",
      },
    },
  ] as readonly { titulo: Texto; cuerpo: Texto }[],

  /**
   * La comparativa de plataformas. Va DENTRO de esta página a propósito: hacer
   * una por «Shopify Colombia» y otra por «WooCommerce Colombia» sería
   * exactamente la página-puerta que Google castiga, y además serían dos
   * páginas peleando por el mismo cliente.
   *
   * Las tres filas son CUALITATIVAS a propósito: esta página se niega a
   * publicar tarifas de terceros que no puede verificar. Una cifra
   * desactualizada en una tabla de precios es una mentira con fecha. El único
   * número que aparece es el propio.
   */
  plataformasTitulo: {
    es: "¿Shopify, WooCommerce o a la medida?",
    en: "Shopify, WooCommerce or custom?",
  },
  plataformasEntradilla: {
    es: "El eje real es qué pagas y cuándo. Lo contesto sin defender la mía a la fuerza: hay casos en los que no me necesitas.",
    en: "The real axis is what you pay and when. I'll answer without defending mine by force: there are cases where you don't need me.",
  },
  filas: [
    { clave: "dia1", etiqueta: { es: "El día 1", en: "Day 1" } },
    { clave: "despues", etiqueta: { es: "Después", en: "After that" } },
    { clave: "venta", etiqueta: { es: "Por venta", en: "Per sale" } },
  ] as readonly { clave: "dia1" | "despues" | "venta"; etiqueta: Texto }[],
  plataformas: [
    {
      titulo: { es: "Shopify o Tiendanube", en: "Shopify or Tiendanube" },
      /* Su veredicto se pinta como CITA y no como el pie de las otras dos: la
         frase «te lo digo aunque no me convenga» es el argumento de toda la
         página —si recomiendo al competidor cuando toca, el resto de lo que
         digo se puede creer— y enterrada al final de una tarjeta no la lee
         nadie. */
      cita: true,
      cuerpo: {
        es: "Alquilas la tienda. Cada cosa que quieras cambiar depende de que exista una app que la haga.",
        en: "You rent the store. Everything you want to change depends on an app existing that does it.",
      },
      filas: {
        dia1: { es: "Sale en dos días", en: "Live in two days" },
        despues: { es: "Mensualidad de plataforma", en: "Platform monthly fee" },
        venta: {
          es: "Comisión, si no usas su pasarela",
          en: "Commission, if you don't use their gateway",
        },
      },
      veredicto: {
        es: "Si vas a probar si vendes en línea y todavía no quieres invertir, esto es lo correcto. Te lo digo aunque no me convenga.",
        en: "If you're testing whether you sell online and don't want to invest yet, this is the right call. I say so even though it doesn't suit me.",
      },
    },
    {
      titulo: { es: "WooCommerce sobre WordPress", en: "WooCommerce on WordPress" },
      cuerpo: {
        es: "Es tuyo. Lo caro es después: plugins que se pisan entre sí y actualizaciones que rompen el pago.",
        en: "It's yours. The expensive part comes later: plugins that trip over each other and updates that break checkout.",
      },
      filas: {
        dia1: { es: "Barato de arrancar", en: "Cheap to start" },
        despues: {
          es: "Alojamiento, plugins y mantenimiento",
          en: "Hosting, plugins and maintenance",
        },
        venta: { es: "—", en: "—" },
      },
      veredicto: {
        es: "Se puede sostener bien, pero hay que sostenerlo. Sin mantenimiento, es la que más se cae.",
        en: "It can be held up well, but it has to be held up. Without maintenance, it's the one that falls over most.",
      },
    },
    {
      titulo: { es: "A la medida — lo que yo hago", en: "Custom — what I do" },
      destacada: true,
      cuerpo: {
        es: "Se programa lo que tu negocio necesita y nada más. Es lo que está corriendo hoy en Bloomrose.",
        en: "What your business needs gets coded, and nothing else. It's what's running on Bloomrose today.",
      },
      filas: {
        dia1: {
          es: "Cuesta más y no sale en dos días",
          en: "Costs more and isn't live in two days",
        },
        despues: { es: "Renovación anual de {renovacion}", en: "Yearly renewal of {renovacion}" },
        venta: { es: "—", en: "—" },
      },
      veredicto: {
        es: "A cambio de ese primer día, no hay mensualidad de plataforma ni comisión por vender.",
        en: "In exchange for that first day, there's no platform monthly fee and no commission for selling.",
      },
    },
  ] as readonly {
    titulo: Texto;
    cuerpo: Texto;
    destacada?: boolean;
    cita?: boolean;
    filas: Record<"dia1" | "despues" | "venta", Texto>;
    veredicto: Texto;
  }[],

  precios: {
    badge: { es: "Precios", en: "Pricing" },
    titulo: {
      es: "Cuánto cuesta una tienda virtual en Colombia",
      en: "What an online store costs in Colombia",
    },
    entradillaAntes: { es: "El mismo que está en ", en: "The same one that's on " },
    entradillaEnlace: { es: "la página de precios", en: "the pricing page" },
    entradillaDespues: {
      es: ". Sin cotización a puerta cerrada y sin dejar el correo para enterarte.",
      en: ". No quote behind closed doors and no leaving your email to find out.",
    },
    tarjetaTitulo: { es: "Tienda online completa", en: "Complete online store" },
    desde: { es: "desde", en: "from" },
    plazo: {
      es: "3 a 5 semanas desde que el catálogo está completo",
      en: "3 to 5 weeks from when the catalogue is complete",
    },
    tarjetaCuerpo: {
      es: "Catálogo con inventario, carrito, cuentas, cobro en línea y envíos. Lo mismo que corre hoy en Bloomrose, no una versión recortada para la foto.",
      en: "Catalogue with inventory, cart, accounts, online payments and shipping. The same thing running on Bloomrose today, not a cut-down version for the photo.",
    },
    extrasTitulo: { es: "Lo que se cobra aparte", en: "What's charged separately" },
    extrasCuerpo: {
      es: "No todas las tiendas lo necesitan, así que no se lo cobro a todas.",
      en: "Not every store needs it, so I don't charge every store for it.",
    },
    aclaracionTitulo: {
      es: "Dos cosas que aclaro de entrada.",
      en: "Two things I make clear up front.",
    },
    aclaracion1Antes: { es: " La ", en: " The " },
    aclaracion1Fuerte: { es: "comisión de la pasarela", en: "payment gateway's commission" },
    aclaracion1Despues: {
      es: " —ePayco, Wompi, PayU o Mercado Pago— la cobra la pasarela sobre cada venta, con tu cuenta y a tu nombre: no la facturo yo y no está en estos precios.",
      en: " —ePayco, Wompi, PayU or Mercado Pago— is charged by the gateway on each sale, with your account and in your name: I don't bill it and it isn't in these prices.",
    },
    aclaracion2Antes: { es: "Y la ", en: "And the " },
    aclaracion2Fuerte: {
      es: "renovación anual es de {renovacion}",
      en: "yearly renewal is {renovacion}",
    },
    aclaracion2Despues: {
      es: ": cubre dominio, alojamiento y que la tienda siga en pie. No es mensualidad de plataforma, porque la tienda no se le alquila a nadie.",
      en: ": it covers domain, hosting and keeping the store standing. It isn't a platform fee, because the store isn't rented from anyone.",
    },
  },

  extras: [
    {
      clave: "variants",
      titulo: { es: "Variantes de producto", en: "Product variants" },
      cuerpo: {
        es: "Talla, color, sabor o presentación en un mismo producto, cada una con su propio inventario y su propio aviso de agotado.",
        en: "Size, colour, flavour or format on the same product, each with its own inventory and its own sold-out notice.",
      },
    },
    {
      clave: "coupons",
      titulo: { es: "Cupones y descuentos", en: "Coupons and discounts" },
      cuerpo: {
        es: "Códigos por porcentaje o por monto, con vigencia, tope de usos y precio tachado en el catálogo mientras dura.",
        en: "Codes by percentage or amount, with an expiry date, a usage cap and a struck-through price in the catalogue while it lasts.",
      },
    },
    {
      clave: "cartrecovery",
      titulo: { es: "Recuperación de carrito", en: "Cart recovery" },
      cuerpo: {
        es: "Al que dejó la compra a medias se le recuerda por correo o por WhatsApp, y queda el informe de cuántos carritos volvieron.",
        en: "Whoever left the purchase half-done gets a reminder by email or WhatsApp, and you get the report of how many carts came back.",
      },
    },
    {
      clave: "invoicing",
      titulo: { es: "Facturación electrónica (DIAN)", en: "Electronic invoicing (DIAN)" },
      cuerpo: {
        es: "La factura sale sola al confirmarse el pago, con su IVA o su INC, conectada a un proveedor autorizado por la DIAN.",
        en: "The invoice goes out on its own when payment is confirmed, with its VAT or consumption tax, connected to a DIAN-authorised provider.",
      },
    },
    {
      clave: "migrar",
      titulo: { es: "Migrar la tienda que ya tienes", en: "Migrate the store you already have" },
      cuerpo: {
        es: "Traer catálogo, clientes y direcciones desde Shopify, WooCommerce o de donde estés hoy, sin perder lo que ya te posiciona.",
        en: "Bringing across catalogue, customers and addresses from Shopify, WooCommerce or wherever you are today, without losing what already ranks.",
      },
    },
  ] as readonly { clave: string; titulo: Texto; cuerpo: Texto }[],

  comparador: {
    incluye: { es: "Qué entra por ese precio", en: "What that price includes" },
    noIncluyeAntes: { es: "Qué ", en: "What it " },
    noIncluyeAcento: { es: "no", en: "doesn't" },
    noIncluyeDespues: { es: " entra", en: " include" },
    nota: {
      es: "Esta lista vale más que la de arriba. Los proyectos no se dañan por lo que se prometió: se dañan por lo que cada uno dio por hecho.",
      en: "This list is worth more than the one above. Projects don't go wrong because of what was promised: they go wrong because of what each side assumed.",
    },
  },
  incluye: {
    es: [
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
    ],
    en: [
      "Six pages: home, catalogue, product page, cart and checkout, contact, and privacy and terms",
      "A panel for products, prices and inventory, so you run it yourself",
      "Catalogue, product pages with a gallery and the full checkout flow",
      "An orders panel with statuses and a notice to the customer when they change",
      "Online payments: PSE, Nequi, Bancolombia and card",
      "Shipping quoted by city or by weight, plus a pick-up-in-store option",
      "Product structured data, so Google shows price and availability",
      "Original design, no bought template, built starting from the phone screen",
      "Security certificate (HTTPS), backups and speed checked before handover",
      "Handover training and 30 days of adjustments at no cost",
    ],
  } as Traducido<readonly string[]>,
  noIncluye: [
    {
      texto: {
        es: "La habilitación de tu empresa ante la DIAN. Sin ella no hay conexión de facturación que valga.",
        en: "Registering your company with the DIAN. Without it no invoicing connection is worth anything.",
      },
      quien: { es: "tu contador", en: "your accountant" },
    },
    {
      texto: {
        es: "La cuenta en la pasarela ni sus comisiones. La abres tú, a tu nombre, y la plata te llega directo.",
        en: "The payment gateway account or its fees. You open it, in your name, and the money reaches you directly.",
      },
      quien: { es: "la pasarela", en: "the gateway" },
    },
    {
      texto: {
        es: "La logística: no empaco, no despacho y no negocio tarifas por ti.",
        en: "Logistics: I don't pack, I don't ship and I don't negotiate rates for you.",
      },
      quien: { es: "la transportadora", en: "the courier" },
    },
    {
      texto: {
        es: "La fotografía de producto. Si no la tienes, te digo con quién.",
        en: "Product photography. If you don't have it, I'll tell you who to go to.",
      },
      quien: { es: "un fotógrafo", en: "a photographer" },
    },
    {
      texto: {
        es: "El tráfico. Una tienda no trae gente sola.",
        en: "Traffic. A store doesn't bring people on its own.",
      },
      quien: { es: "SEO o publicidad", en: "SEO or ads" },
    },
    {
      texto: {
        es: "Dropshipping, marketplaces ni montarte en Mercado Libre o Amazon.",
        en: "Dropshipping, marketplaces or getting you onto Mercado Libre or Amazon.",
      },
      quien: { es: "no lo vendo", en: "I don't sell it" },
    },
    {
      texto: {
        es: "Ventas garantizadas. El que te las prometa te está mintiendo.",
        en: "Guaranteed sales. Anyone who promises you those is lying.",
      },
      quien: { es: "nadie", en: "nobody" },
    },
  ] as readonly { texto: Texto; quien: Texto }[],

  pasosTitulo: { es: "Así compra tu cliente", en: "This is how your customer buys" },
  pasosEntradilla: {
    es: "Tres pantallas, y en ese orden. La duda que frena una tienda no es qué trae: es si de verdad va a cobrar sola.",
    en: "Three screens, in that order. The doubt that stops a store isn't what it comes with: it's whether it really charges on its own.",
  },
  pasosNota: {
    es: "Ejemplo · pantallas de muestra, producto y precios inventados",
    en: "Example · sample screens, made-up product and prices",
  },
  pasos: {
    ficha: {
      rotulo: { es: "1 · Ficha", en: "1 · Product" },
      titulo: {
        es: "La talla que se acabó, marcada",
        en: "The size that ran out, marked",
      },
      cuerpo: {
        es: "Talla, color o presentación, cada una con su propio inventario.",
        en: "Size, colour or format, each with its own inventory.",
      },
      foto: { es: "Tu foto", en: "Your photo" },
      producto: { es: "Producto de ejemplo", en: "Example product" },
      agotada: { es: "M · agotada", en: "M · sold out" },
      boton: { es: "Agregar al carrito", en: "Add to cart" },
    },
    carrito: {
      rotulo: { es: "2 · Carrito", en: "2 · Cart" },
      titulo: {
        es: "El envío, cotizado antes de pagar",
        en: "Shipping, quoted before paying",
      },
      cuerpo: {
        es: "Por ciudad o por peso, con las tarifas que cambias tú.",
        en: "By city or by weight, with rates you change yourself.",
      },
      subtotal: { es: "Subtotal", en: "Subtotal" },
      envio: { es: "Envío a Cartagena", en: "Shipping to Cartagena" },
      total: { es: "Total", en: "Total" },
      boton: { es: "Ir a pagar", en: "Go to checkout" },
    },
    pago: {
      rotulo: { es: "3 · Pago", en: "3 · Payment" },
      titulo: {
        es: "Cobra a las once de la noche",
        en: "It charges at eleven at night",
      },
      cuerpo: {
        es: "La plata cae en tu cuenta. La pasarela es tuya y va a tu nombre.",
        en: "The money lands in your account. The gateway is yours and in your name.",
      },
      medios: {
        es: ["PSE", "Nequi", "Bancolombia", "Tarjeta débito o crédito"],
        en: ["PSE", "Nequi", "Bancolombia", "Debit or credit card"],
      } as Traducido<readonly string[]>,
      boton: { es: "Pagar $ 190.000", en: "Pay $ 190,000" },
    },
  },
  panelTitulo: {
    es: "Y esto lo haces tú, sin escribirme",
    en: "And you do this yourself, without writing to me",
  },

  /**
   * LA PIEZA FIRMA: «Así compra tu cliente», en un solo teléfono.
   *
   * Las tres pantallas ya estaban escritas —`pasos`— y no se tocan: esto solo
   * añade lo que hay que poder LEER de cada pantalla sin verla, que es lo que
   * oye quien usa lector de pantalla, y el rótulo del estado que la pantalla
   * enseña al final.
   *
   * El producto y los precios siguen siendo inventados y el pie lo sigue
   * diciendo: `pasosNota`.
   */
  firma: {
    pantallas: {
      es: [
        "La ficha del producto con tres tallas: la M aparece tachada y marcada como agotada, porque el inventario ya la descontó.",
        "El carrito: el envío a Cartagena se cotiza y el total sube de los $ 178.000 del subtotal a los $ 190.000 con envío.",
        "El pago: se elige Nequi, el botón pasa a «procesando» y entra el aviso de pedido pagado.",
      ],
      en: [
        "The product page with three sizes: M shows struck through and marked sold out, because inventory already discounted it.",
        "The cart: shipping to Cartagena is quoted and the total goes from the $178,000 subtotal to $190,000 with shipping.",
        "Payment: Nequi is picked, the button turns to “processing” and the paid-order notice comes in.",
      ],
    } as Traducido<readonly string[]>,
    procesando: { es: "Procesando…", en: "Processing…" },
    pagado: { es: "Pedido pagado", en: "Order paid" },
    hora: { es: "11:04 p. m.", en: "11:04 PM" },
    calculando: { es: "Calculando…", en: "Calculating…" },
  },

  /**
   * La calculadora de extras. Los cinco extras y sus precios ya existen
   * —`extras` aquí y `TOGGLES` en `lib/quote.ts`—: esto es solo lo que la
   * calculadora necesita decir alrededor del total.
   */
  calculadora: {
    titulo: { es: "Arma tu total", en: "Build your total" },
    base: { es: "Tienda online completa", en: "Complete online store" },
    total: { es: "Total estimado", en: "Estimated total" },
    ninguno: {
      es: "Sin extras: el piso de la tienda completa.",
      en: "No extras: the floor for the complete store.",
    },
    /* El aviso que impide que el total se lea como una cotización cerrada. Es
       la misma condición que ya dice la sección de precio, dicha donde se
       mira el número. */
    aviso: {
      es: "Estimado, no cotización: el número final sale de tu lista de productos.",
      en: "An estimate, not a quote: the final number comes out of your product list.",
    },
  },

  procesoTitulo: { es: "Cómo se hace", en: "How it's done" },
  procesoEntradilla: {
    es: "Antes de cotizar necesito tu lista de productos. De ahí sale el precio y el plazo de verdad: sin eso, cualquier número que te dé —yo o el que sea— es adivinanza.",
    en: "Before quoting I need your product list. That's where the real price and timeline come from: without it, any number anyone gives you —me included— is guesswork.",
  },
  previo: {
    etiqueta: { es: "Antes de la semana 1", en: "Before week 1" },
    texto: {
      es: "Tu catálogo completo: fotos, precios, pesos y existencias. El reloj no ha arrancado.",
      en: "Your complete catalogue: photos, prices, weights and stock. The clock hasn't started.",
    },
  },
  hitos: [
    {
      etiqueta: { es: "Semana 1", en: "Week 1" },
      texto: {
        es: "Diseño y catálogo: categorías, fichas, fotos, precios e inventario inicial.",
        en: "Design and catalogue: categories, product pages, photos, prices and opening inventory.",
      },
    },
    {
      etiqueta: { es: "Semana 2", en: "Week 2" },
      texto: {
        es: "Pagos y envíos: la pasarela conectada a tu cuenta y compras de prueba con plata real.",
        en: "Payments and shipping: the gateway connected to your account and test purchases with real money.",
      },
    },
    {
      etiqueta: { es: "Semana 3", en: "Week 3" },
      texto: {
        es: "Sale al aire con tu dominio y te siento a subir un producto y a despachar un pedido.",
        en: "It goes live on your domain and I sit you down to upload a product and ship an order.",
      },
    },
  ] as readonly { etiqueta: Texto; texto: Texto }[],
  acopio: {
    titulo: {
      es: "Qué necesito de ti para cotizar y arrancar",
      en: "What I need from you to quote and start",
    },
    nota: {
      es: "El reloj arranca cuando llega el material, no al aceptar la propuesta.",
      en: "The clock starts when the material arrives, not when the proposal is accepted.",
    },
    items: {
      es: [
        "Cuántos productos son, contados",
        "Si tienen tallas, colores o presentaciones",
        "Fotos de cada producto",
        "Precios y existencias de arranque",
        "Cuánto pesa y cuánto mide lo que despachas",
        "A qué ciudades despachas",
        "Tu cuenta en la pasarela, abierta a tu nombre",
        "Tu logo, en el mejor archivo que tengas",
      ],
      en: [
        "How many products there are, counted",
        "Whether they have sizes, colours or formats",
        "Photos of each product",
        "Opening prices and stock",
        "How much what you ship weighs and measures",
        "Which cities you ship to",
        "Your gateway account, opened in your name",
        "Your logo, in the best file you have",
      ],
    } as Traducido<readonly string[]>,
  },

  casoTitulo: { es: "Una tienda que ya está vendiendo", en: "A store that's already selling" },
  casoEntradilla: {
    es: "No es una maqueta ni un proyecto de estudio: es la tienda de una clienta, en producción y con dominio propio. Ábrela desde el celular.",
    en: "It isn't a mockup or a studio project: it's a client's store, in production and on its own domain. Open it from your phone.",
  },
  caso: {
    rotulo: { es: "Bisutería y accesorios · Colombia", en: "Jewellery and accessories · Colombia" },
    cuerpo: {
      es: "Bisutería y accesorios para el mercado colombiano. Catálogo con inventario, carrito, cuentas, pagos en línea y envíos. Programada a la medida, no montada sobre una plantilla.",
      en: "Jewellery and accessories for the Colombian market. Catalogue with inventory, cart, accounts, online payments and shipping. Coded to measure, not assembled on a template.",
    },
    alt: {
      es: "Tienda virtual de Bloomrose: catálogo de bisutería y accesorios con carrito y pagos en línea",
      en: "Bloomrose online store: jewellery and accessories catalogue with cart and online payments",
    },
    puntos: {
      es: [
        "Catálogo con inventario que se descuenta solo",
        "Pagos en línea, con el pedido confirmado sin llamar",
        "Cotización de envío antes de terminar la compra",
        "Comprada desde el celular, que es como compra la gente",
      ],
      en: [
        "Catalogue with inventory that discounts itself",
        "Online payments, with the order confirmed without a call",
        "Shipping quoted before finishing the purchase",
        "Bought from a phone, which is how people buy",
      ],
    } as Traducido<readonly string[]>,
  },

  faqTitulo: { es: "Lo que siempre preguntan", en: "What people always ask" },
  cierre: {
    titulo: { es: "Mándame tu lista de productos", en: "Send me your product list" },
    cuerpo: {
      es: "Con cuántos son, si tienen tallas o colores y a dónde despachas, te digo en la misma llamada cuánto cuesta y en cuánto queda. Y si lo que te sirve es Shopify y no yo, también te lo digo.",
      en: "With how many there are, whether they have sizes or colours and where you ship, I'll tell you on the same call what it costs and how soon it's ready. And if what suits you is Shopify and not me, I'll say that too.",
    },
  },
} as const;

/**
 * LAS CATORCE PREGUNTAS
 * ──────────────────────────────────────────────────────────────────────────
 * `{renovacion}`, `{facturacion}`, `{carrito}` y `{franjas}` los sustituye el
 * componente con los números de `lib/quote.ts`.
 *
 * LA COMISIÓN DE LA PASARELA VA COMO RANGO Y DICHO QUE ES APROXIMADO. Publicar
 * la tarifa exacta de cada una sería firmar un dato que ninguna de las cuatro
 * deja verificar desde fuera —Wompi responde 403, PayU redirige a otro dominio
 * y Mercado Pago pide sesión— y que además cambian cuando quieren. Un rango
 * orienta sin prometer; una cifra desactualizada es una mentira con fecha.
 */
export const TIENDAS_FAQ_GRUPOS = [
  { clave: "pagos", titulo: { es: "Pagos y comisiones", en: "Payments and fees" } },
  { clave: "envios", titulo: { es: "Envíos y entrega", en: "Shipping and delivery" } },
  { clave: "operacion", titulo: { es: "Operación del día a día", en: "Day-to-day operation" } },
  { clave: "seguridad", titulo: { es: "Seguridad y datos", en: "Security and data" } },
] as const satisfies readonly { clave: string; titulo: Texto }[];

export type GrupoFaqTienda = (typeof TIENDAS_FAQ_GRUPOS)[number]["clave"];

export const TIENDAS_FAQ: readonly { q: Texto; a: Texto; grupo: GrupoFaqTienda }[] = [
  {
    grupo: "pagos",
    q: { es: "¿Con qué me van a pagar mis clientes?", en: "What will my customers pay with?" },
    a: {
      es: "PSE, tarjeta débito y crédito, Nequi y Bancolombia, según lo que habilite la pasarela que escojas. Y si quieres, el botón de cerrar el pedido por WhatsApp al lado: en Colombia todavía mucha gente prefiere hablar antes de pagar, y perder esa venta por purismo sería bobo.",
      en: "PSE, debit and credit card, Nequi and Bancolombia, depending on what the gateway you pick enables. And if you want, the button to close the order over WhatsApp right next to it: in Colombia plenty of people still prefer to talk before paying, and losing that sale out of purism would be silly.",
    },
  },
  {
    grupo: "pagos",
    q: {
      es: "¿Cuánto me cobra la pasarela por cada venta?",
      en: "How much does the gateway charge me per sale?",
    },
    a: {
      es: "Eso lo cobra la pasarela, no yo. De referencia: en Colombia la comisión anda entre el 2,5 % y el 3,5 % de cada venta más un fijo de unos $700 a $1.000 por transacción, y sobre eso el IVA. Es un aproximado —cambia según el medio de pago (PSE no cuesta lo mismo que una tarjeta de crédito) y según cuánto factures al mes—, así que la cifra que manda es la que publica cada pasarela en su documentación oficial: ePayco, Wompi, PayU y Mercado Pago la tienen en su propia página de tarifas y ahí hay que mirarla antes de escoger. La cuenta la abres tú, a tu nombre, y el dinero llega a tu cuenta sin pasar por la mía.",
      en: "The gateway charges that, not me. For reference: in Colombia the commission runs between 2.5% and 3.5% of each sale plus a fixed fee of roughly $700 to $1,000 COP per transaction, with VAT on top. It's an approximation —it changes with the payment method (PSE doesn't cost the same as a credit card) and with how much you bill per month— so the figure that counts is the one each gateway publishes in its own documentation: ePayco, Wompi, PayU and Mercado Pago all have it on their own pricing page, and that's where to look before choosing. You open the account, in your name, and the money reaches your account without passing through mine.",
    },
  },
  {
    grupo: "pagos",
    q: {
      es: "¿Voy a pagar mensualidad y además comisión por venta?",
      en: "Will I pay a monthly fee and a sales commission on top?",
    },
    a: {
      es: "Mensualidad de plataforma, no: la tienda es tuya y no le alquilas nada a nadie. Comisión por venta a mí, tampoco. Lo que sí hay es la renovación anual de {renovacion}, que cubre dominio, alojamiento y que la tienda siga en pie; y la comisión de la pasarela, que la cobra la pasarela y le llega a todo el mundo por igual.",
      en: "A platform monthly fee, no: the store is yours and you're not renting anything from anyone. A sales commission to me, also no. What there is: the yearly renewal of {renovacion}, which covers domain, hosting and keeping the store standing; and the gateway's commission, which the gateway charges and which everyone pays equally.",
    },
  },
  {
    grupo: "pagos",
    q: {
      es: "¿Y la facturación electrónica de la DIAN? ¿Se conecta?",
      en: "What about DIAN electronic invoicing? Does it connect?",
    },
    a: {
      es: "Sí. Se conecta con un proveedor tecnológico autorizado por la DIAN y la factura se emite y se le envía al comprador al confirmarse el pago, con su IVA, su INC o su exención. Va aparte, desde {facturacion}. Lo que no puedo hacer por ti es habilitar tu empresa ante la DIAN: ese trámite es tuyo, y sin él no hay conexión posible.",
      en: "Yes. It connects to a DIAN-authorised technology provider and the invoice is issued and sent to the buyer when payment is confirmed, with its VAT, consumption tax or exemption. It's separate, from {facturacion}. What I can't do for you is register your company with the DIAN: that paperwork is yours, and without it no connection is possible.",
    },
  },
  {
    grupo: "envios",
    q: {
      es: "¿Cómo se calcula el envío? ¿Y la contraentrega?",
      en: "How is shipping calculated? And cash on delivery?",
    },
    a: {
      es: "Se configuran tarifas por ciudad o por peso, y las cambias tú cuando la transportadora suba. Va también el umbral de envío gratis desde cierto monto, la opción de recoger en tienda y el número de guía que le llega al cliente cuando despachas. Contraentrega se puede, si tu transportadora te la habilita a ti. Lo que no hago es despachar ni negociar tarifas en tu nombre.",
      en: "Rates are set by city or by weight, and you change them when the courier raises them. There's also the free-shipping threshold above a certain amount, the pick-up-in-store option and the tracking number that reaches the customer when you ship. Cash on delivery is possible, if your courier enables it for you. What I don't do is ship or negotiate rates in your name.",
    },
  },
  {
    grupo: "operacion",
    q: {
      es: "¿Yo puedo subir productos y cambiar precios sin llamarte?",
      en: "Can I upload products and change prices without calling you?",
    },
    a: {
      es: "Sí, y esa es la idea. El panel es tuyo: productos, precios, inventario y pedidos. En la entrega te siento a hacerlo hasta que te salga sin ayuda. Una tienda que depende de que yo conteste es una tienda mal entregada.",
      en: "Yes, and that's the point. The panel is yours: products, prices, inventory and orders. At handover I sit you down to do it until it comes out without help. A store that depends on me answering is a badly handed-over store.",
    },
  },
  {
    grupo: "operacion",
    q: { es: "¿Cuántos productos aguanta?", en: "How many products does it hold?" },
    a: {
      es: "Los que necesites: no hay un techo técnico. Lo que sube por franjas es el trabajo de montar y organizar el catálogo — {franjas}. El precio de arranque cubre la primera franja.",
      en: "As many as you need: there's no technical ceiling. What goes up in bands is the work of building and organising the catalogue — {franjas}. The starting price covers the first band.",
    },
  },
  {
    grupo: "operacion",
    q: {
      es: "¿Qué pasa cuando alguien deja el carrito abandonado?",
      en: "What happens when someone abandons the cart?",
    },
    a: {
      es: "Se le recuerda. Correo o WhatsApp con lo que dejó a medias, y el informe de cuántos carritos volvieron y por cuánta plata. Va aparte, desde {carrito}, y suele pagarse solo: el carrito abandonado es la venta que ya estaba casi hecha.",
      en: "They get a reminder. Email or WhatsApp with what they left half-done, and the report of how many carts came back and for how much. It's separate, from {carrito}, and it usually pays for itself: the abandoned cart is the sale that was already almost made.",
    },
  },
  {
    grupo: "operacion",
    q: { es: "¿Se compra bien desde el celular?", en: "Does it buy well from a phone?" },
    a: {
      es: "Ahí es donde se cae la venta, así que ahí es donde se prueba primero. La tienda se arma empezando por la pantalla del teléfono y no adaptándola después, y la velocidad se revisa antes de entregar. Si el pago se demora en un celular con dos rayitas de señal, la venta se perdió y no hay diseño bonito que la salve.",
      en: "That's where the sale falls apart, so that's where it gets tested first. The store is built starting from the phone screen, not adapted afterwards, and speed is checked before handover. If checkout drags on a phone with two bars of signal, the sale is lost and no pretty design saves it.",
    },
  },
  {
    grupo: "operacion",
    q: {
      es: "Ya vendo por Instagram y por WhatsApp. ¿Para qué quiero una tienda?",
      en: "I already sell on Instagram and WhatsApp. Why do I want a store?",
    },
    a: {
      es: "Para dejar de ser tú el cuello de botella. Instagram no cobra por ti, no te lleva el inventario, no te dice cuánto vendiste el mes pasado y te puede cerrar la cuenta un martes sin explicarte nada. La tienda es tuya y no se la puede quitar nadie. Y no reemplaza el WhatsApp: se lo pones al lado, para el que quiere preguntar antes de pagar.",
      en: "So you stop being the bottleneck. Instagram doesn't charge for you, doesn't track your inventory, doesn't tell you how much you sold last month and can close your account on a Tuesday without explaining anything. The store is yours and nobody can take it away. And it doesn't replace WhatsApp: you put it right next to it, for whoever wants to ask before paying.",
    },
  },
  {
    grupo: "operacion",
    q: { es: "¿En cuánto la tienes lista de verdad?", en: "How soon is it really ready?" },
    a: {
      es: "Tres semanas, contadas desde que el catálogo está completo. Ese es el detalle que casi nadie aclara: el reloj no arranca cuando firmas, arranca cuando tengo fotos, precios y existencias. Si me entregas ochocientos productos con tallas y colores en un archivo a medio llenar, no son tres semanas — y te lo digo en la primera llamada, no al final.",
      en: "Three weeks, counted from when the catalogue is complete. That's the detail almost nobody clarifies: the clock doesn't start when you sign, it starts when I have photos, prices and stock. If you hand me eight hundred products with sizes and colours in a half-filled spreadsheet, it isn't three weeks — and I tell you that on the first call, not at the end.",
    },
  },
  {
    grupo: "seguridad",
    q: {
      es: "¿Y si se cae la tienda un sábado a mediodía?",
      en: "And if the store goes down at midday on a Saturday?",
    },
    a: {
      es: "La tienda queda con respaldo y corriendo en infraestructura que aguanta picos, y la renovación anual cubre que siga en pie. No te voy a prometer que contesto en tres minutos un sábado, porque soy una persona y no un call center. Lo que sí: el número por el que me contrataste es el mismo por el que me escribes, y no desaparezco al entregar.",
      en: "The store has backups and runs on infrastructure that takes spikes, and the yearly renewal covers keeping it standing. I won't promise I answer within three minutes on a Saturday, because I'm a person and not a call centre. What I will say: the number you hired me on is the same one you write to, and I don't disappear at handover.",
    },
  },
  {
    grupo: "seguridad",
    q: {
      es: "¿Quién responde por la seguridad y por los datos de mis clientes?",
      en: "Who's responsible for security and my customers' data?",
    },
    a: {
      es: "La tienda va con certificado de seguridad y respaldo. Los datos de tarjeta no pasan por tu tienda ni por mis manos: los captura la pasarela, que es la que está certificada para eso. Y como en Colombia aplica la Ley 1581 de protección de datos, la tienda sale desde el primer día con su aviso de privacidad y sus términos.",
      en: "The store ships with a security certificate and backups. Card data doesn't pass through your store or through my hands: the gateway captures it, and it's the one certified for that. And since Colombia's Law 1581 on data protection applies, the store goes live from day one with its privacy notice and its terms.",
    },
  },
  {
    grupo: "operacion",
    q: {
      es: "¿Se conecta con el inventario o con el sistema de mi contador?",
      en: "Does it connect to my inventory or my accountant's system?",
    },
    a: {
      es: "Depende de qué uses hoy. Si tu sistema tiene por dónde conectarse, se conecta, y se cotiza según el alcance del trabajo. Si hoy llevas el inventario en una hoja de cálculo, el panel de la tienda pasa a ser tu inventario y dejas de llevar dos cuentas que nunca cuadran.",
      en: "It depends what you use today. If your system has a way in, it connects, and it's quoted according to the scope of the work. If today you keep inventory in a spreadsheet, the store's panel becomes your inventory and you stop keeping two sets of books that never match.",
    },
  },
];
