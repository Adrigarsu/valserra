/*
 * Botón − / + en React, para la isla de Forfaits (la versión para el HTML
 * estático es BotonCantidad.astro; las dos comparten la hoja
 * src/styles/componentes/boton-cantidad.css).
 *
 * Deshabilitado con aria-disabled y no con disabled: así el botón no pierde
 * el foco al llegar al mínimo o al máximo. Mientras está deshabilitado, el
 * clic no hace nada.
 */
import type { ButtonHTMLAttributes, MouseEvent } from 'react';
import '../styles/componentes/boton-cantidad.css';

type Props = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'disabled' | 'aria-disabled' | 'aria-label'
> & {
  accion: 'menos' | 'mas';
  /** Nombre accesible del botón: "Añadir: Adulto". */
  etiqueta: string;
  deshabilitado?: boolean;
};

export default function BotonCantidad({
  accion,
  etiqueta,
  deshabilitado = false,
  className,
  onClick,
  ...resto
}: Props) {
  // U+2212, el signo menos tipográfico, no el guion
  const signo = accion === 'mas' ? '+' : '−';

  function alPulsar(evento: MouseEvent<HTMLButtonElement>) {
    if (deshabilitado) return;
    onClick?.(evento);
  }

  return (
    <button
      type="button"
      className={['boton-cantidad', className].filter(Boolean).join(' ')}
      aria-label={etiqueta}
      aria-disabled={deshabilitado || undefined}
      onClick={alPulsar}
      {...resto}
    >
      <span className="text-dato-medio" aria-hidden="true">
        {signo}
      </span>
    </button>
  );
}
