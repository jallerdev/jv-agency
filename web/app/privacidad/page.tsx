import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { ADDRESS_LINE, BUSINESS } from "@/lib/business";

export const metadata: Metadata = {
  title: "Política de Privacidad y Tratamiento de Datos | JV Agencia",
  description:
    "Política de tratamiento de datos personales de JV Agencia conforme a la Ley 1581 de 2012 (Habeas Data) de Colombia. Conoce qué datos recolectamos, con qué fin y cómo ejercer tus derechos.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <LegalPage
      title="Política de Privacidad y Tratamiento de Datos"
      intro="En JV Agencia respetamos y protegemos tus datos personales. Esta política describe cómo los recolectamos, usamos y protegemos, conforme a la Ley 1581 de 2012 y el Decreto 1074 de 2015 de Colombia (régimen de Habeas Data)."
    >
      <h2>1. Responsable del tratamiento</h2>
      <p>
        El responsable del tratamiento de tus datos personales es <strong>{BUSINESS.legalName}</strong>{" "}
        (en adelante, “JV Agencia”), identificado con NIT <strong>{BUSINESS.taxId}</strong>, con
        domicilio en {ADDRESS_LINE}.
      </p>
      <ul>
        <li>
          Correo electrónico:{" "}
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
        </li>
        <li>
          Teléfono: <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phoneDisplay}</a>
        </li>
        <li>WhatsApp: {BUSINESS.whatsappDisplay}</li>
      </ul>

      <h2>2. Marco legal</h2>
      <p>
        Esta política se rige por la Constitución Política de Colombia (art. 15), la Ley 1581 de 2012,
        el Decreto 1074 de 2015 y demás normas que regulan la protección de datos personales en
        Colombia.
      </p>

      <h2>3. Datos que recolectamos</h2>
      <p>Tratamos únicamente los datos que nos entregas de forma voluntaria, entre ellos:</p>
      <ul>
        <li>
          <strong>Datos de contacto:</strong> nombre, correo electrónico y número de teléfono que
          ingresas en nuestro formulario de contacto o cotizador.
        </li>
        <li>
          <strong>Comunicaciones por WhatsApp:</strong> tu número de teléfono y el contenido de los
          mensajes que nos envías cuando nos escribes por WhatsApp.
        </li>
        <li>
          <strong>Datos del proyecto:</strong> la información que compartes sobre tu negocio o
          requerimiento para poder cotizar o prestar el servicio.
        </li>
        <li>
          <strong>Datos de navegación:</strong> información técnica anónima (ver{" "}
          <a href="/cookies">Política de Cookies</a>).
        </li>
      </ul>

      <h2>4. Finalidades del tratamiento</h2>
      <p>Tus datos se usan exclusivamente para:</p>
      <ul>
        <li>Responder tus solicitudes, mensajes y cotizaciones.</li>
        <li>Prestar y administrar los servicios de diseño, desarrollo y mantenimiento contratados.</li>
        <li>
          Enviarte comunicaciones relacionadas con tu solicitud o proyecto por correo electrónico o
          WhatsApp.
        </li>
        <li>Gestionar la facturación y obligaciones contractuales.</li>
        <li>Mejorar nuestro sitio web y la calidad de nuestros servicios.</li>
      </ul>
      <p>
        No vendemos, alquilamos ni compartimos tus datos personales con terceros para fines
        comerciales ajenos a JV Agencia.
      </p>

      <h2>5. Autorización</h2>
      <p>
        Al enviar el formulario de contacto, usar el cotizador o escribirnos por WhatsApp, autorizas
        de forma libre, previa, expresa e informada el tratamiento de tus datos personales conforme a
        esta política.
      </p>

      <h2>6. Encargados y transferencias</h2>
      <p>
        Para operar, podemos apoyarnos en proveedores tecnológicos que actúan como encargados del
        tratamiento bajo sus propias políticas de privacidad, entre ellos:
      </p>
      <ul>
        <li>Meta Platforms (WhatsApp) — para la mensajería con clientes.</li>
        <li>Google (Calendar / servicios de productividad) — para agendar y gestionar reuniones.</li>
        <li>Proveedores de alojamiento web e infraestructura.</li>
      </ul>

      <h2>7. Derechos del titular (Habeas Data)</h2>
      <p>Como titular de los datos, tienes derecho a:</p>
      <ul>
        <li>Conocer, actualizar y rectificar tus datos personales.</li>
        <li>Solicitar prueba de la autorización otorgada.</li>
        <li>Ser informado sobre el uso que se ha dado a tus datos.</li>
        <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).</li>
        <li>Revocar la autorización y/o solicitar la supresión de tus datos.</li>
        <li>Acceder de forma gratuita a tus datos personales.</li>
      </ul>

      <h2>8. Cómo ejercer tus derechos</h2>
      <p>
        Puedes ejercer tus derechos escribiendo a{" "}
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> indicando tu nombre, el derecho que
        deseas ejercer y tu solicitud. Atenderemos consultas en un máximo de 10 días hábiles y
        reclamos en un máximo de 15 días hábiles, conforme a la ley.
      </p>

      <h2>9. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger tus datos contra acceso no
        autorizado, pérdida o alteración. El acceso a la información está restringido al personal
        necesario para cumplir las finalidades descritas.
      </p>

      <h2>10. Vigencia y cambios</h2>
      <p>
        Esta política rige desde su publicación y puede actualizarse. Publicaremos cualquier cambio en
        esta misma página, indicando la fecha de la última actualización.
      </p>
    </LegalPage>
  );
}
