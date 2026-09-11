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
            Va con next/script y `afterInteractive`: se carga cuando la página
            ya es usable, para no competir con el contenido por el hilo
            principal ni castigar las métricas de carga que justamente sirve
            para medir.
            Solo en producción: en desarrollo ensuciaría los datos con visitas
            que no son de nadie. */}
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
              strategy="afterInteractive"
            />
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
