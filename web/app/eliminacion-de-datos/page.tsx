import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = {
  title: "Eliminación de datos | JV Agencia",
  description:
    "Cómo solicitar la eliminación de tus datos personales tratados por JV Agencia, incluidos los datos de WhatsApp.",
  alternates: { canonical: "/eliminacion-de-datos" },
};

export default function EliminacionDeDatosPage() {
  return (
    <LegalPage
      title="Eliminación de datos"
      intro="Esta página explica cómo solicitar la eliminación de tus datos personales tratados por JV Agencia, conforme a la Ley 1581 de 2012 (Habeas Data) de Colombia."
    >
      <h2>1. Cómo solicitar la eliminación</h2>
      <p>
        Para pedir la eliminación de tus datos personales, envía un correo a{" "}
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> con el asunto{" "}
        <strong>“Eliminación de datos”</strong> e incluye:
      </p>
      <ul>
        <li>Tu nombre completo.</li>
        <li>
          El dato de contacto con el que interactuaste con nosotros (número de teléfono/WhatsApp o
          correo electrónico).
        </li>
        <li>La solicitud expresa de que eliminemos tus datos.</li>
      </ul>
      <p>
        También puedes solicitarlo escribiéndonos por WhatsApp al {BUSINESS.whatsappDisplay}.
      </p>

      <h2>2. Qué datos eliminamos</h2>
      <ul>
        <li>Tus datos de contacto (nombre, correo, teléfono).</li>
        <li>El historial de conversaciones de WhatsApp asociado a tu número.</li>
        <li>La información de proyecto/cotización que nos hayas compartido.</li>
      </ul>
      <p>
        Podremos conservar la información mínima exigida por obligaciones legales o contables
        (por ejemplo, facturación), durante el tiempo que la ley lo requiera.
      </p>

      <h2>3. Plazo</h2>
      <p>
        Confirmaremos la recepción de tu solicitud y eliminaremos tus datos en un máximo de{" "}
        <strong>15 días hábiles</strong>, conforme a la normativa colombiana de protección de datos.
      </p>

      <h2>4. Datos en plataformas de terceros</h2>
      <p>
        Algunos datos pueden estar en plataformas que actúan como encargados (Meta/WhatsApp, Google).
        Tu solicitud cubre la eliminación de la información que JV Agencia conserva; para los datos
        que cada plataforma gestiona bajo sus propios términos, te orientaremos sobre cómo
        gestionarlos directamente con ellas.
      </p>

      <h2>5. Más información</h2>
      <p>
        Consulta el detalle de tus derechos y del tratamiento de tus datos en nuestra{" "}
        <a href="/privacidad">Política de Privacidad</a>.
      </p>
    </LegalPage>
  );
}
