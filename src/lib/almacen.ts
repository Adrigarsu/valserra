/*
 * Lectura y escritura en localStorage sin romper la página. localStorage
 * puede lanzar un error (navegación privada, cookies bloqueadas, cuota
 * llena): entonces se lee null y no se guarda nada, y la preferencia dura
 * hasta cambiar de página.
 */

/** Devuelve el valor guardado si es uno de los permitidos; si no, null. */
export function leer<T extends string>(
  clave: string,
  permitidos: readonly T[],
): T | null {
  try {
    const valor = localStorage.getItem(clave);
    return permitidos.find((p) => p === valor) ?? null;
  } catch {
    return null;
  }
}

export function guardar(clave: string, valor: string): void {
  try {
    localStorage.setItem(clave, valor);
  } catch {
    // Sin almacenamiento, la elección no se recuerda
  }
}
