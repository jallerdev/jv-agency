# URLs a indexar en Search Console

Generado el 10 de septiembre de 2026 desde `/sitemap.xml`. Son las URLs que
el sitio declara: si una no está aquí, es que no está en el sitemap y hay que
mirar `app/sitemap.ts` antes de pedir la indexación a mano.

## Cómo se usa

1. En Search Console, **Sitemaps** → enviar `https://www.jvagencia.com/sitemap.xml`.
   Eso basta para que Google las descubra todas; lo de abajo es para forzar
   las que urgen.
2. Para una URL concreta: **Inspección de URLs** → pegar → *Solicitar
   indexación*. Hay cupo diario, así que conviene gastarlo en las que
   convierten y no en las legales.

## Prioridad alta — las que convierten

- https://www.jvagencia.com
- https://www.jvagencia.com/precios
- https://www.jvagencia.com/servicios/diseno-de-paginas-web
- https://www.jvagencia.com/servicios/tiendas-virtuales
- https://www.jvagencia.com/servicios/chatbot-whatsapp
- https://www.jvagencia.com/servicios/posicionamiento-seo
- https://www.jvagencia.com/servicios/software-a-la-medida
- https://www.jvagencia.com/diseno-de-paginas-web-en-cartagena
- https://www.jvagencia.com/diseno-de-paginas-web-en-barranquilla
- https://www.jvagencia.com/diseno-de-paginas-web-en-bogota
- https://www.jvagencia.com/contacto

## Prioridad media — sectores, estudio y blog

- https://www.jvagencia.com/sectores/salones-y-spas
- https://www.jvagencia.com/sectores/clinicas-y-consultorios
- https://www.jvagencia.com/blog
- https://www.jvagencia.com/blog/cuanto-cuesta-una-pagina-web-en-colombia
- https://www.jvagencia.com/blog/cuanto-cuesta-un-chatbot-de-whatsapp-en-colombia
- https://www.jvagencia.com/blog/cuanto-cuesta-el-seo-en-colombia
- https://www.jvagencia.com/blog/mi-negocio-necesita-pagina-web
- https://www.jvagencia.com/blog/pagina-web-o-solo-instagram
- https://www.jvagencia.com/blog/que-debe-tener-la-pagina-web-de-un-restaurante
- https://www.jvagencia.com/blog/cuanto-se-demora-hacer-una-pagina-web
- https://www.jvagencia.com/sobre-nosotros

## Las de inglés

Van aparte porque son nuevas y todavía no tienen historial. El `hreflang` ya
declara el par en las dos direcciones, así que Google no las va a leer como
contenido duplicado.

- https://www.jvagencia.com/en
- https://www.jvagencia.com/en/services/whatsapp-chatbot
- https://www.jvagencia.com/en/services/web-design
- https://www.jvagencia.com/en/services/online-stores
- https://www.jvagencia.com/en/services/custom-software
- https://www.jvagencia.com/en/pricing
- https://www.jvagencia.com/en/about
- https://www.jvagencia.com/en/contact

## Legales — no urge

Están en el sitemap para que existan, no para posicionar.

- https://www.jvagencia.com/privacidad
- https://www.jvagencia.com/terminos
- https://www.jvagencia.com/cookies
- https://www.jvagencia.com/eliminacion-de-datos

## Lo que NO se pide indexar

- `/cotizador` y `/acceso`: herramienta interna de venta, detrás de
  contraseña y con `noindex`. Pedir su indexación dejaría al visitante en una
  pantalla de clave.
- `/lab`: banco de pruebas de componentes.

