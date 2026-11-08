/*
 * Fila de persona del selector de forfaits (Figma: Componentes Valserra ›
 * Fila de persona): tipo, edad y precio, con los botones − / +. En la
 * calculadora se apilan cuatro (adultos, jóvenes, niños y sénior).
 *
 * Es de React porque vive dentro de la isla de Forfaits. Es un componente
 * controlado: no guarda la cantidad, la recibe en props y avisa con
 * onCambiar; la isla decide los límites y calcula el precio.
 *
 * Accesibilidad: la fila es un grupo con el nombre del tipo ("Adultos"),
 * los botones dicen qué hacen ("Añadir: Adulto") y la cantidad es un
 * <output> con aria-live, así que al pulsar se anuncia el número nuevo.
 */
import { useId } from 'react';
import type { TipoForfait } from '../lib/esquemas.ts';
import { traductor, type Idioma } from '../lib/i18n.ts';
import BotonCantidad from './BotonCantidad.tsx';
import '../styles/componentes/fila-persona.css';

interface Props {
  idioma: Idioma;
  tipo: TipoForfait['id'];
  /** Edad del tipo, de tarifas.json: "26–64 años". */
  edad: string;
  /** Precio ya formateado en la moneda elegida. */
  precio: string;
  cantidad: number;
  min?: number;
  max?: number;
  onCambiar?: (cantidad: number) => void;
}

export default function FilaPersona({
  idioma,
  tipo,
  edad,
  precio,
  cantidad,
  min = 0,
  max = Infinity,
  onCambiar,
}: Props) {
  const t = traductor(idioma);
  const id = useId();
  const singular = t(`forfaits.tiposSingular.${tipo}`);

  return (
    <div className="fila-persona" role="group" aria-labelledby={id}>
      <div className="fila-persona__info">
        <p className="fila-persona__tipo text-boton" id={id}>
          {t(`forfaits.tipos.${tipo}`)}
        </p>
        <p className="fila-persona__detalle text-cuerpo-pequeno">
          {edad} · {precio}
        </p>
      </div>
      <div className="fila-persona__contador">
        <BotonCantidad
          accion="menos"
          etiqueta={t('forfaits.uno.menos', { tipo: singular })}
          deshabilitado={cantidad <= min}
          onClick={() => onCambiar?.(cantidad - 1)}
        />
        <output
          className="fila-persona__cantidad text-dato-medio"
          aria-live="polite"
        >
          {cantidad}
        </output>
        <BotonCantidad
          accion="mas"
          etiqueta={t('forfaits.uno.mas', { tipo: singular })}
          deshabilitado={cantidad >= max}
          onClick={() => onCambiar?.(cantidad + 1)}
        />
      </div>
    </div>
  );
}
