/*
 * Textos de la web en src/i18n/{es,en}.json.
 * Las dos lenguas tienen que tener las mismas claves. Se comprueba dos veces:
 * - Con tipos: cada archivo tiene que encajar en el tipo del otro, así que
 *   una clave que falte en cualquiera de los dos rompe `npm run check`.
 * - Al importar el módulo: mismas claves (también dentro de las listas),
 *   ningún texto vacío y los mismos huecos {nombre} en las dos lenguas.
 */
import es from '../i18n/es.json' with { type: 'json' };
import en from '../i18n/en.json' with { type: 'json' };

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

comprobarTextos();
