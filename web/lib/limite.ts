/**
 * LÍMITE DE PETICIONES POR IP
 * ──────────────────────────────────────────────────────────────────────────
 * Ninguna de las tres rutas de API tenía uno. La de acceso solo dormía 600 ms
 * antes de responder, y su propia nota decía que eso no es un límite: retrasar
 * cada intento un poco no impide hacer diez mil, solo hace que tarden más.
 *
 * QUÉ ES Y QUÉ NO ES ESTO. Es un contador en memoria del proceso. Frena el
 * abuso desde una IP —fuerza bruta contra la clave, formularios enviados en
 * bucle, la agenda llenándose de citas falsas— y no pretende más. En Vercel
 * cada instancia tiene su propio contador, así que con varias instancias vivas
 * el techo real es N veces el declarado. Es una diferencia que importa
 * conocerla y que no cambia el resultado: pasar de «sin límite» a «un límite
 * por instancia» es la diferencia entre cero y algo, no entre algo y perfecto.
 * Si algún día hace falta un techo exacto, va en Redis, no aquí.
 *
 * La ventana es DESLIZANTE y no fija: con ventanas fijas se pueden meter dos
 * ráfagas completas seguidas, una al final de una ventana y otra al principio
 * de la siguiente.
 */

type Marca = number[];

const registros = new Map<string, Marca>();

/* Sin esto el mapa crece hasta el reinicio del proceso: una IP que pasó una
   vez se queda ocupando memoria para siempre. Se limpia por amortización, al
   entrar, y no con un temporizador, que en serverless no se puede confiar en
   que llegue a correr. */
const LIMPIAR_CADA = 500;
let cuenta = 0;

function limpiar(ahora: number, ventanaMs: number) {
  for (const [clave, marcas] of registros) {
    const vivas = marcas.filter((t) => ahora - t < ventanaMs);
    if (vivas.length === 0) registros.delete(clave);
    else registros.set(clave, vivas);
  }
}

/**
 * La IP de quien llama.
 *
 * Detrás de un proxy, `x-forwarded-for` trae la cadena entera y la PRIMERA es
 * la del cliente. Se toma esa. Ojo: es una cabecera que el cliente puede
 * falsificar si llega directo al servidor; en Vercel la reescribe el borde,
 * así que aquí es de fiar. En cualquier otro alojamiento hay que comprobarlo
 * antes de confiar en este límite.
 */
export function ipDe(req: Request): string {
  const reenviada = req.headers.get("x-forwarded-for");
  if (reenviada) return reenviada.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "desconocida";
}

/**
 * ¿Se pasó del cupo?
 *
 * Devuelve `null` si puede seguir, o los segundos que faltan para volver a
 * intentar. Ese número es el que va en `Retry-After`: un 429 sin él obliga a
 * adivinar, y quien adivina reintenta enseguida.
 */
export function excedido(
  clave: string,
  { intentos, ventanaMs }: { intentos: number; ventanaMs: number }
): number | null {
  const ahora = Date.now();

  if (++cuenta % LIMPIAR_CADA === 0) limpiar(ahora, ventanaMs);

  const previas = (registros.get(clave) ?? []).filter((t) => ahora - t < ventanaMs);

  if (previas.length >= intentos) {
    const masVieja = previas[0];
    registros.set(clave, previas);
    return Math.max(1, Math.ceil((ventanaMs - (ahora - masVieja)) / 1000));
  }

  previas.push(ahora);
  registros.set(clave, previas);
  return null;
}

/** El 429 con su `Retry-After`, para no escribirlo en tres sitios. */
export function respuesta429(segundos: number, mensaje: string) {
  return new Response(JSON.stringify({ ok: false, error: mensaje }), {
    status: 429,
    headers: {
      "Content-Type": "application/json",
      "Retry-After": String(segundos),
    },
  });
}

/* ── Validación de servidor ──────────────────────────────────────────────
   El cliente ya valida, y el cliente no es una barrera: cualquiera puede
   mandar un POST con curl. Estas dos son las mismas reglas del formulario,
   escritas donde sí mandan. */

/** Correo con forma de correo. No comprueba que exista: eso no se puede. */
export function correoValido(valor: string | undefined): boolean {
  if (!valor) return false;
  if (valor.length > 254) return false; // el máximo del RFC 5321
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor);
}

/** Teléfono utilizable: al menos siete dígitos, y no una novela. */
export function telefonoValido(valor: string | undefined): boolean {
  if (!valor) return false;
  const digitos = valor.replace(/\D/g, "");
  return digitos.length >= 7 && digitos.length <= 15; // E.164 topa en 15
}

/** Recorta un texto libre para que no entre un megabyte en una nota. */
export function recortar(valor: string | undefined, max: number): string {
  return (valor ?? "").trim().slice(0, max);
}
