/*
 * Hook de React para las islas: devuelve la moneda elegida y vuelve a
 * pintar el componente cuando cambia (src/lib/moneda.ts).
 *
 * useSyncExternalStore es la forma estándar de React de leer un estado que
 * vive fuera de React. En el servidor, y al hidratar, usa CHF (lo mismo
 * que el HTML generado); justo después pinta la moneda real, sin avisos de
 * hidratación.
 */
import { useSyncExternalStore } from 'react';
import {
  alCambiarMoneda,
  monedaActual,
  monedaPorDefecto,
  type Moneda,
} from './moneda.ts';

export function useMoneda(): Moneda {
  return useSyncExternalStore(
    alCambiarMoneda,
    monedaActual,
    () => monedaPorDefecto,
  );
}
