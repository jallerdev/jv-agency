import { ViewTransition } from "react";
import Script from "next/script";

import "./globals.css";
import { figtree, jetbrains } from "./fuentes";
import { GA_MEASUREMENT_ID } from "@/lib/site";
import { StructuredData } from "@/components/StructuredData";
import { CuentameProvider } from "@/components/Cuentame";
import { Blobs } from "@/components/Blobs";
import { Cookies } from "@/components/Cookies";
import { AlCambiarDeRuta } from "@/components/AlCambiarDeRuta";
import type { Idioma } from "@/content/types";

/**
 * EL DOCUMENTO: <html> Y <body>, UNA SOLA VEZ
 * ──────────────────────────────────────────────────────────────────────────
 * El sitio tiene DOS layouts raíz —`app/(es)` y `app/(en)`— porque el atributo
 * `lang` del <html> tiene que decir la verdad en cada idioma, y un layout
 * único no puede saber en qué ruta está sin volver dinámica toda la página.
 *
 * Con dos layouts, el riesgo es que se separen: alguien añade un script en uno
 * y se le olvida el otro. Por eso el cuerpo del documento vive aquí y cada
 * layout solo aporta su `lang` y sus metadatos.
 */
export function Documento({
  lang,
  children,
}: {
  lang: Idioma;
  children: React.ReactNode;
}) {
  return (
    /* Las variables de next/font van en <html>, no en <body>.
       tokens.css define `--font-display: var(--font-figtree)` dentro de
       `:root`, que ES el <html>: si las familias se declaran un nivel más
       abajo, esa referencia no las ve —una custom property se hereda hacia
       abajo, nunca hacia arriba— y las familias caían al system-ui sin avisar
       de nada. */
    <html lang={lang} className={`${figtree.variable} ${jetbrains.variable}`}>
      <body className="bg-canvas font-body text-ink-soft antialiased">
        {/* QUIÉN VE EL AVISO DE COOKIES, DECIDIDO ANTES DEL PRIMER PINTADO.
            ─────────────────────────────────────────────────────────────────
            El aviso se montaba en un efecto —para no leer `localStorage`
            durante la hidratación y que el servidor y el cliente no
            discreparan— y eso lo pintaba DESPUÉS de hidratar. Con ello, el
            elemento más grande que pintaba la página pasó a ser el párrafo del
            aviso, y Google mide justo eso: Lighthouse daba LCP de 4,4 s en
            /precios con un 90 % de «render delay», mientras el primer pintado
            ocurría a los 0,9 s. La página se veía entera y la métrica contaba
            el cartel que llegaba tres segundos tarde.

            Este script de dos líneas es el patrón de siempre para esto: va en
            línea y BLOQUEA, así que corre antes del primer fotograma, lee la
            decisión guardada y la escribe en el <html>. El CSS hace el resto:
            el aviso vive en el HTML del servidor y se enseña o no por atributo
            —`.jv-cookies` en `app/efectos.css`—. React nunca decide si se ve,
            así que no hay discrepancia de hidratación que evitar ni un segundo
            pintado que pagar.

            Sin JavaScript no se enseña, y es correcto: sin JavaScript tampoco
            se carga Analytics, así que no hay nada que consentir. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var d=localStorage.getItem("jv-cookies");' +
              'document.documentElement.dataset.cookies=d?"decidido":"pendiente";' +
              /* Y devuelve el consentimiento concedido en las visitas
                 siguientes. Antes lo hacía el efecto del componente; al
                 quitarlo, quien había aceptado volvía a medirse sin cookies
                 sin haberlo pedido. Va aquí porque es la única línea que ya
                 lee la decisión, y después del `consent default` de la
                 cabecera, que es de quien hereda el orden. */
              'if(d==="si"&&window.gtag)window.gtag("consent","update",{analytics_storage:"granted"})}' +
              'catch(e){document.documentElement.dataset.cookies="pendiente"}',
          }}
        />
        {/* El campo de manchas detrás de TODO el sitio, no solo del hero.
            Una sola instancia fija cubre las quince mil filas de scroll de
            cualquier página; poner una por sección multiplicaría por seis el
            coste sin que se vea más. */}
        <AlCambiarDeRuta />
        <Blobs fijo />
        <StructuredData />
        {/* El diálogo de contacto vive en el layout, no en cada página: hay un
            solo panel montado para todo el sitio y cualquier botón lo abre. */}
        {/* LA TRANSICIÓN ENTRE PÁGINAS.
            Es la View Transitions API del navegador, no una animación en JS.
            Esa distinción es la que decide que esté aquí: el navegador toma
            una foto de la página que se va y otra de la que llega y funde la
            una en la otra; no hay opacidad animada a mano, ni un div que tape
            la pantalla, ni una espera artificial antes de navegar. Donde el
            navegador no la soporta no ocurre nada —la página cambia de golpe,
            como cambiaba antes— y ese es justamente el trato: o la hace el
            navegador o no se hace.

            La cabecera y el pie no parpadean aunque entren en la foto: son
            píxel por píxel los mismos a un lado y al otro del corte, así que
            fundir uno con el otro no se ve.

            Las curvas y los tiempos van en `app/efectos.css`, con el resto del
            movimiento, y ahí mismo se apaga bajo `prefers-reduced-motion`. */}
        <ViewTransition default="jv-pagina">
          <CuentameProvider idioma={lang}>{children}</CuentameProvider>
        </ViewTransition>
        <Cookies idioma={lang} />

        {/* Google Analytics 4.
            Solo en producción: en desarrollo ensuciaría los datos con visitas
            que no son de nadie.

            LA BIBLIOTECA VA EN `lazyOnload`, Y ESO VALE 1,18 SEGUNDOS. Estaba
            en `afterInteractive`, que ya es lo correcto por defecto, y aun así
            `gtag/js` pesa 171 kB: más que TODO el JavaScript propio del sitio
            comprimido, y más que las fuentes. En una línea de 1,6 Mbps eso son
            ochocientos milisegundos de ancho de banda que la portada necesita
            para pintar su propio texto.

            MEDIDO, no supuesto. Teléfono emulado a 4x de CPU y 4G lenta,
            portada: con Analytics, LCP 2,50 s; con la misma página y Analytics
            bloqueado, 1,32 s. En `/precios` la diferencia es cero —1,19 contra
            1,20— porque ahí no hay imágenes compitiendo por la línea. O sea que
            el coste no es del script: es de la BANDA que ocupa mientras el
            navegador todavía está pintando.

            `lazyOnload` lo baja cuando el navegador está ocioso, después de
            `load`. La medición no cambia de naturaleza: el `config` sigue
            encolándose antes —abajo, en `afterInteractive`— y `gtag/js` lo
            procesa al llegar, así que la visita se cuenta igual. Lo único que
            cambia es que deja de robarle la línea al primer pintado. */}
        {process.env.NODE_ENV === "production" && (
          <>
            {/* Modo de consentimiento v2, DENEGADO por defecto.
                Va antes que gtag/js y con `beforeInteractive` a propósito: si
                se declarara después, GA4 ya habría escrito su cookie y el
                aviso llegaría tarde. Con esto GA4 arranca sin cookies y solo
                sube a concedido si la persona acepta en el aviso.
                La Ley 1581 de 2012 pide consentimiento PREVIO; «previo» es
                justo esta línea. */}
            <Script id="consentimiento" strategy="beforeInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});`}
            </Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="lazyOnload"
            />
            {/* El `config` SÍ se queda en `afterInteractive`: son dos líneas
                que solo empujan al `dataLayer`, y encolarlas pronto es lo que
                hace que la visita lleve su hora real y no la del momento en que
                el navegador tuvo un hueco para bajar la biblioteca. */}
            <Script id="ga4" strategy="afterInteractive">
              {`gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
