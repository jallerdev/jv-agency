"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * VUELVE ARRIBA AL CAMBIAR DE PÁGINA.
 * ──────────────────────────────────────────────────────────────────────────
 * Next desplaza al principio en cada navegación, pero se le puede escapar: la
 * restauración de desplazamiento del historial, un `focus()` de algún
 * componente que monta abajo, o el desplazamiento suave de la raíz cancelado a
 * medias. El resultado que reportó Luis es siempre el mismo —entrar a una
 * página nueva y aparecer en el pie— y lo vio saliendo del blog hacia la
 * portada y hacia /agendar, en local y en producción.
 *
 * No busca la causa: la tapa. En cuanto la ruta cambia y no hay ancla que
 * respetar, el documento vuelve a cero de golpe. Es lo que el visitante espera
 * de un enlace a otra página, y no hay caso en que quiera lo contrario.
 *
 * SE RESPETA EL ANCLA. Con `#agenda` o `#proceso` en la URL, el destino lo
 * decide el ancla y aquí no se toca nada: reiniciar ahí rompería justo los
 * enlaces internos de la portada.
 *
 * `instant` y no `smooth` a propósito: sobre una portada de trece mil píxeles
 * una animación de vuelta al principio se ve como un fallo, y cualquier gesto
 * del visitante la cancela a mitad.
 */
export function AlCambiarDeRuta() {
  const ruta = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [ruta]);

  return null;
}
