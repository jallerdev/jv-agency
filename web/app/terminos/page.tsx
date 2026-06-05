import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = {
  title: "Términos y Condiciones | JV Agencia",
  description:
    "Términos y condiciones de uso del sitio web y de los servicios de diseño y desarrollo web de JV Agencia.",
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return (
    <LegalPage
      title="Términos y Condiciones"
      intro="Estos términos regulan el uso de este sitio web y la contratación de los servicios de JV Agencia. Al navegar o contratar nuestros servicios, aceptas estas condiciones."
    >
      <h2>1. Identificación</h2>
      <p>
        Este sitio es operado por <strong>{BUSINESS.legalName}</strong> (“JV Agencia”), NIT{" "}
        {BUSINESS.taxId}. Para cualquier asunto puedes contactarnos en{" "}
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
      </p>

      <h2>2. Servicios</h2>
      <p>
        JV Agencia es un estudio de diseño y desarrollo que ofrece desarrollo web, software a medida,
        diseño web/UI y mantenimiento. El alcance, plazos y entregables de cada proyecto se definen en
        la propuesta o cotización aceptada por el cliente.
      </p>

      <h2>3. Cotizaciones y propuestas</h2>
      <p>
        Las cotizaciones tienen una vigencia limitada que se indica en cada propuesta. Los precios
        pueden variar según el alcance final acordado. Una cotización no constituye un contrato hasta
        que ambas partes la aceptan por escrito.
      </p>

      <h2>4. Propiedad intelectual</h2>
      <p>
        Salvo acuerdo distinto por escrito, los entregables finales pasan a ser propiedad del cliente
        una vez cancelado el valor total del proyecto. JV Agencia conserva el derecho de mostrar el
        trabajo realizado en su portafolio. Las herramientas, librerías y componentes de terceros se
        rigen por sus respectivas licencias.
      </p>

      <h2>5. Pagos</h2>
      <p>
        Las condiciones de pago (anticipos, hitos y saldos) se establecen en cada propuesta. El
        incumplimiento de los pagos puede suspender el avance del proyecto y la entrega de
        credenciales o archivos finales.
      </p>

      <h2>6. Responsabilidad</h2>
      <p>
        Nos esforzamos por entregar trabajo de alta calidad, pero no garantizamos resultados
        comerciales específicos (ventas, posicionamiento, tráfico). JV Agencia no será responsable por
        daños indirectos derivados del uso del sitio o de los servicios, ni por fallas de proveedores
        de terceros (alojamiento, dominios, plataformas).
      </p>

      <h2>7. Enlaces de terceros</h2>
      <p>
        Este sitio puede contener enlaces a sitios de terceros. No somos responsables del contenido ni
        de las políticas de privacidad de dichos sitios.
      </p>

      <h2>8. Ley aplicable</h2>
      <p>
        Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia se
        someterá a la jurisdicción de los jueces competentes de Colombia.
      </p>

      <h2>9. Contacto</h2>
      <p>
        Para preguntas sobre estos términos, escríbenos a{" "}
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
      </p>
    </LegalPage>
  );
}
