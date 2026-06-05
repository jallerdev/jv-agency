import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = {
  title: "Política de Cookies | JV Agencia",
  description:
    "Política de cookies del sitio web de JV Agencia: qué cookies usamos, con qué fin y cómo puedes gestionarlas.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Política de Cookies"
      intro="Esta política explica qué son las cookies, cuáles utiliza este sitio y cómo puedes gestionarlas."
    >
      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que un sitio web guarda en tu dispositivo para
        recordar información sobre tu visita, como tus preferencias o datos técnicos de navegación.
      </p>

      <h2>2. Cookies que utilizamos</h2>
      <ul>
        <li>
          <strong>Necesarias:</strong> imprescindibles para que el sitio funcione correctamente (por
          ejemplo, preferencias de visualización). No se pueden desactivar.
        </li>
        <li>
          <strong>Analíticas (si están activas):</strong> nos ayudan a entender de forma anónima cómo
          se usa el sitio para mejorarlo. No te identifican personalmente.
        </li>
      </ul>
      <p>No utilizamos cookies de publicidad ni vendemos información obtenida mediante cookies.</p>

      <h2>3. Cómo gestionar las cookies</h2>
      <p>
        Puedes aceptar, bloquear o eliminar las cookies desde la configuración de tu navegador
        (Chrome, Firefox, Safari, Edge, etc.). Ten en cuenta que desactivar algunas cookies puede
        afectar el funcionamiento del sitio.
      </p>

      <h2>4. Cambios</h2>
      <p>
        Podemos actualizar esta política. Cualquier cambio se publicará en esta página. Para dudas,
        escríbenos a <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
      </p>
    </LegalPage>
  );
}
