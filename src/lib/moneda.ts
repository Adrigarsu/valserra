/*
 * Moneda elegida (CHF o €), compartida por toda la página.
 *
 * El estado vive en un solo sitio: el atributo data-moneda de <html>. Sin
 * él, la moneda es CHF. Así:
 * - El script del <head> de Base.astro lo pone antes de pintar con la
 *   elección guardada, y los precios estáticos (Precio.astro) eligen con
 *   CSS cuál de sus dos importes enseñar: no hay parpadeo ni hace falta
 *   JavaScript para leerlo.
 * - Las islas de React (Forfaits y Tiempo) lo leen con useMoneda
 *   (src/lib/useMoneda.ts) y se vuelven a pintar cuando cambia.
 * - El selector del menú y del footer lo cambia con elegirMoneda.
 *
 * Al cambiar se lanza el evento "valserra:moneda" en <html>; también llega
 * el cambio hecho en otra pestaña (evento storage).
 *
 * Este módulo no importa los datos, para que pese poco en el navegador;
 * la conversión de importes está en src/lib/precios.ts.
 */
import { guardar, leer } from './almacen.ts';
import { monedas, type Moneda } from './formato.ts';

export { monedas, type Moneda };

export const monedaPorDefecto: Moneda = 'CHF';

/** Clave de localStorage donde se guarda la elección. */
export const claveMoneda = 'valserra-moneda';

const evento = 'valserra:moneda';

const esMoneda = (valor: unknown): valor is Moneda =>
  monedas.includes(valor as Moneda);

/** La moneda que se ve ahora. Solo en el navegador. */
export function monedaActual(): Moneda {
  const valor = document.documentElement.dataset.moneda;
  return esMoneda(valor) ? valor : monedaPorDefecto;
}

function aplicar(moneda: Moneda): void {
  if (moneda === monedaActual()) return;
  document.documentElement.dataset.moneda = moneda;
  document.documentElement.dispatchEvent(new Event(evento));
}

/** Cambia la moneda de toda la página y la recuerda. */
export function elegirMoneda(moneda: Moneda): void {
  guardar(claveMoneda, moneda);
  aplicar(moneda);
}

/**
 * Avisa cada vez que cambia la moneda. Devuelve la función que deja de
 * escuchar (la forma que pide useSyncExternalStore de React).
 */
export function alCambiarMoneda(aviso: () => void): () => void {
  const raiz = document.documentElement;
  raiz.addEventListener(evento, aviso);
  return () => raiz.removeEventListener(evento, aviso);
}

// Otra pestaña ha cambiado la moneda: se aplica también en esta
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (cambio) => {
    if (cambio.key !== claveMoneda) return;
    aplicar(leer(claveMoneda, monedas) ?? monedaPorDefecto);
  });
}
