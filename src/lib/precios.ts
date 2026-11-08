/*
 * Importes en la moneda elegida. Los datos guardan los precios en céntimos
 * de CHF; los euros salen del tipo de cambio fijo de demostración de
 * tarifas.json (cambioDemo.EUR: euros por cada franco).
 */
import { tarifas } from './datos.ts';
import { formatearMoneda, type Moneda } from './formato.ts';
import type { Idioma } from './i18n.ts';

/** Céntimos de CHF → céntimos de la moneda pedida, redondeados. */
export function convertir(centimosChf: number, moneda: Moneda): number {
  if (moneda === 'CHF') return centimosChf;
  return Math.round(centimosChf * tarifas.cambioDemo.EUR);
}

/** 78570 → "785,70 CHF", o "840,70 €" en euros. */
export function formatearPrecio(
  idioma: Idioma,
  centimosChf: number,
  moneda: Moneda,
): string {
  return formatearMoneda(idioma, convertir(centimosChf, moneda), moneda);
}
