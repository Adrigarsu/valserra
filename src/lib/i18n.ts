/*
 * Textos de la web en src/i18n/{es,en}.json.
 * Las dos lenguas tienen que tener las mismas claves. Se comprueba dos veces:
 * - Con tipos: cada archivo tiene que encajar en el tipo del otro, así que
 *   una clave que falte en cualquiera de los dos rompe `npm run check`.
 * - Al importar el módulo: mismas claves (también dentro de las listas),
 *   ningún texto vacío, los mismos huecos {nombre} en las dos lenguas y
 *   mensajes ICU bien escritos (llaves cerradas, plurales con other).
 *
 * Los textos se leen con t() (ver traductor, al final).
 */
import es from '../i18n/es.json' with { type: 'json' };
import en from '../i18n/en.json' with { type: 'json' };
import { formatearNumero } from './formato.ts';

export const idiomas = ['es', 'en'] as const;
export type Idioma = (typeof idiomas)[number];
export const idiomaPorDefecto: Idioma = 'es';

/** Forma de los textos. Sale de es.json, el idioma por defecto. */
export type Textos = typeof es;

// Comprobación de tipos en los dos sentidos
export const textos = { es, en } satisfies Record<Idioma, Textos>;
es satisfies typeof en;

type Plano = Map<string, string>;

function aplanar(valor: unknown, ruta = '', plano: Plano = new Map()): Plano {
  if (typeof valor === 'string') {
    plano.set(ruta, valor);
  } else if (Array.isArray(valor)) {
    valor.forEach((v, i) => aplanar(v, `${ruta}[${i}]`, plano));
  } else if (valor !== null && typeof valor === 'object') {
    for (const [clave, v] of Object.entries(valor)) {
      aplanar(v, ruta ? `${ruta}.${clave}` : clave, plano);
    }
  } else {
    plano.set(ruta, String(valor));
  }
  return plano;
}

/**
 * Nombres de los huecos de un texto ICU: {temp} y {dias, plural, ...} dan
 * "temp" y "dias". Las opciones del plural ({# día}) no cuentan.
 */
function huecos(texto: string): string[] {
  return [
    ...new Set(
      [...texto.matchAll(/\{\s*([A-Za-z_]\w*)\s*[,}]/g)].map((m) => m[1]),
    ),
  ].sort();
}

function comprobarTextos(): void {
  const planos = { es: aplanar(es), en: aplanar(en) };
  const errores: string[] = [];

  for (const [idioma, otro] of [
    ['es', 'en'],
    ['en', 'es'],
  ] as const) {
    for (const [clave, texto] of planos[idioma]) {
      if (!planos[otro].has(clave)) {
        errores.push(
          `${clave}: está en ${idioma}.json y falta en ${otro}.json`,
        );
      }
      if (texto.trim() === '') {
        errores.push(`${clave}: está vacío en ${idioma}.json`);
      }
    }
  }

  for (const idioma of idiomas) {
    for (const [clave, texto] of planos[idioma]) {
      try {
        piezas(texto);
      } catch (error) {
        errores.push(`${clave} (${idioma}): ${(error as Error).message}`);
      }
    }
  }

  for (const [clave, textoEs] of planos.es) {
    const textoEn = planos.en.get(clave);
    if (textoEn === undefined) continue;
    const a = huecos(textoEs).join(', ');
    const b = huecos(textoEn).join(', ');
    if (a !== b) {
      errores.push(`${clave}: huecos distintos (es: {${a}}, en: {${b}})`);
    }
  }

  if (errores.length > 0) {
    throw new Error(
      `Los textos de src/i18n no cuadran:\n- ${errores.join('\n- ')}`,
    );
  }
}

/*
 * Mensajes ICU
 *
 * Los textos siguen el formato de mensajes ICU (ICU MessageFormat), el
 * estándar de Unicode para traducir: huecos {nombre} y plurales como
 * {n, plural, one {# forfait} other {# forfaits}}. La categoría (one,
 * other...) la elige Intl.PluralRules según el idioma, y # se cambia por
 * el número ya formateado. También vale =0, =1... para un número exacto.
 *
 * Se implementa la parte de ICU que usa Valserra (huecos y plurales), sin
 * librería: un analizador pequeño convierte cada texto en una lista de
 * piezas y se guarda en caché. No admite comillas de escape ni select.
 */

type Pieza =
  | string
  | { tipo: 'hueco'; nombre: string }
  | { tipo: 'almohadilla' }
  | { tipo: 'plural'; nombre: string; opciones: Map<string, Pieza[]> };

/** Posición de la llave que cierra la que abre en `inicio`. */
function cierre(texto: string, inicio: number): number {
  let nivel = 0;
  for (let i = inicio; i < texto.length; i++) {
    if (texto[i] === '{') nivel++;
    else if (texto[i] === '}' && --nivel === 0) return i;
  }
  throw new Error(`Llave sin cerrar en "${texto}"`);
}

function analizar(texto: string, enPlural = false): Pieza[] {
  const piezas: Pieza[] = [];
  let literal = '';
  let i = 0;

  while (i < texto.length) {
    const c = texto[i];
    if (c === '}') throw new Error(`Llave de más en "${texto}"`);
    if (c === '#' && enPlural) {
      if (literal) piezas.push(literal);
      literal = '';
      piezas.push({ tipo: 'almohadilla' });
      i++;
    } else if (c === '{') {
      if (literal) piezas.push(literal);
      literal = '';
      const fin = cierre(texto, i);
      piezas.push(analizarHueco(texto.slice(i + 1, fin), texto));
      i = fin + 1;
    } else {
      literal += c;
      i++;
    }
  }

  if (literal) piezas.push(literal);
  return piezas;
}

function analizarHueco(cuerpo: string, texto: string): Pieza {
  const simple = /^\s*([A-Za-z_]\w*)\s*$/.exec(cuerpo);
  if (simple?.[1]) return { tipo: 'hueco', nombre: simple[1] };

  const plural = /^\s*([A-Za-z_]\w*)\s*,\s*plural\s*,/.exec(cuerpo);
  if (!plural?.[1])
    throw new Error(`Hueco no válido "{${cuerpo}}" en "${texto}"`);

  const opciones = new Map<string, Pieza[]>();
  const resto = cuerpo.slice(plural[0].length);
  let i = 0;
  while (i < resto.length) {
    const selector = /^\s*(=\d+|zero|one|two|few|many|other)\s*\{/.exec(
      resto.slice(i),
    );
    if (!selector?.[1]) {
      if (resto.slice(i).trim() === '') break;
      throw new Error(`Plural no válido en "${texto}"`);
    }
    const abre = i + selector[0].length - 1;
    const fin = cierre(resto, abre);
    opciones.set(selector[1], analizar(resto.slice(abre + 1, fin), true));
    i = fin + 1;
  }

  if (!opciones.has('other')) {
    throw new Error(`Al plural le falta la opción other en "${texto}"`);
  }
  return { tipo: 'plural', nombre: plural[1], opciones };
}

const analizados = new Map<string, Pieza[]>();

function piezas(texto: string): Pieza[] {
  let resultado = analizados.get(texto);
  if (!resultado) {
    resultado = analizar(texto);
    analizados.set(texto, resultado);
  }
  return resultado;
}

const reglasPlural = new Map<Idioma, Intl.PluralRules>();

function categoriaPlural(idioma: Idioma, n: number): string {
  let reglas = reglasPlural.get(idioma);
  if (!reglas) {
    reglas = new Intl.PluralRules(idioma);
    reglasPlural.set(idioma, reglas);
  }
  return reglas.select(n);
}

export type Valores = Record<string, string | number>;

function componer(
  idioma: Idioma,
  lista: Pieza[],
  valores: Valores,
  numero?: number,
): string {
  return lista
    .map((pieza) => {
      if (typeof pieza === 'string') return pieza;

      if (pieza.tipo === 'almohadilla') {
        return numero === undefined ? '#' : formatearNumero(idioma, numero);
      }

      const valor = valores[pieza.nombre];

      if (pieza.tipo === 'hueco') {
        if (valor === undefined) return `{${pieza.nombre}}`;
        return typeof valor === 'number'
          ? formatearNumero(idioma, valor)
          : valor;
      }

      if (typeof valor !== 'number') {
        throw new Error(`El plural {${pieza.nombre}} necesita un número`);
      }
      const opcion =
        pieza.opciones.get(`=${valor}`) ??
        pieza.opciones.get(categoriaPlural(idioma, valor)) ??
        pieza.opciones.get('other') ??
        [];
      return componer(idioma, opcion, valores, valor);
    })
    .join('');
}

/**
 * Rellena un texto ICU. Los números se formatean con Intl según el idioma
 * (2263 → "2.263" o "2,263"); las cadenas se insertan tal cual, así que un
 * año que no deba llevar punto se pasa como cadena. Un hueco sin valor se
 * deja como está, para que se vea en la página.
 */
export function formatear(
  idioma: Idioma,
  texto: string,
  valores: Valores = {},
): string {
  return componer(idioma, piezas(texto), valores);
}

/**
 * Claves de los textos con puntos: "nav.mapa", "forfaits.comprar"...
 * Solo las que llevan a un texto; las listas (forfaits.faq) se leen
 * directamente de `textos`.
 */
type Claves<T, Prefijo extends string = ''> = {
  [K in keyof T & string]: T[K] extends string
    ? `${Prefijo}${K}`
    : T[K] extends readonly unknown[]
      ? never
      : Claves<T[K], `${Prefijo}${K}.`>;
}[keyof T & string];

export type ClaveTexto = Claves<Textos>;

function buscar(idioma: Idioma, clave: ClaveTexto): string {
  let valor: unknown = textos[idioma];
  for (const parte of clave.split('.')) {
    valor = (valor as Record<string, unknown>)[parte];
  }
  if (typeof valor !== 'string') {
    throw new Error(`No hay texto "${clave}" en ${idioma}.json`);
  }
  return valor;
}

/**
 * Devuelve la función t() de un idioma:
 *
 *   const t = traductor('es');
 *   t('forfaits.comprar', { n: 3 }); // "Comprar 3 forfaits"
 *
 * La clave se comprueba con tipos: una clave que no existe no compila.
 */
export function traductor(idioma: Idioma) {
  return (clave: ClaveTexto, valores?: Valores): string =>
    formatear(idioma, buscar(idioma, clave), valores);
}

/**
 * Nombre de cada idioma en su propia lengua (endónimo). No se traduce:
 * el selector siempre dice "English" y "Español", estés en la página que
 * estés, para que cada cual encuentre el suyo.
 */
export const nombresIdioma: Record<Idioma, string> = {
  es: 'Español',
  en: 'English',
};

export function esIdioma(valor: unknown): valor is Idioma {
  return idiomas.includes(valor as Idioma);
}

// Al final del módulo: la comprobación usa el analizador de arriba
comprobarTextos();
