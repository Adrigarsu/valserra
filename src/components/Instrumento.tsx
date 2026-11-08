/*
 * Instrumento retro del parte (Figma: Componentes Valserra › Instrumento).
 * - Esfera (temperatura, viento, visibilidad): la aguja gira de −135° en
 *   el mínimo a 135° en el máximo, de la primera a la última marca.
 * - Columna (nieve): el nivel sube de vacío en el mínimo a lleno en el
 *   máximo.
 *
 * Es de React porque lo usa la isla del Tiempo. Recibe el valor por props
 * y lo pinta con una variable CSS (--instrumento-valor, de 0 a 1), así que
 * la aguja y el nivel se mueven solo con transform.
 *
 * Para el lector es un medidor (role="meter"): oye la etiqueta como nombre
 * y el texto ya formateado como valor ("Temperatura, −12 °C"). El dibujo y
 * las cifras de dentro son presentacionales.
 */
import { useId, type CSSProperties } from 'react';
import '../styles/componentes/instrumento.css';

interface Props {
  tipo: 'esfera' | 'columna';
  valor: number;
  min: number;
  max: number;
  /** Valor ya formateado con su unidad: "−12 °C", "185 cm". */
  texto: string;
  /** Qué mide: "Temperatura". */
  etiqueta: string;
}

/* Marcas de la esfera: nueve, de −135° a 135° cada 33,75° */
const marcas = Array.from({ length: 9 }, (_, i) => -135 + i * 33.75);

export default function Instrumento({
  tipo,
  valor,
  min,
  max,
  texto,
  etiqueta,
}: Props) {
  const idEtiqueta = useId();
  const proporcion =
    max > min ? Math.min(Math.max((valor - min) / (max - min), 0), 1) : 0;
  const estilo = { '--instrumento-valor': proporcion } as CSSProperties;

  return (
    <div
      className="instrumento"
      data-tipo={tipo}
      role="meter"
      aria-labelledby={idEtiqueta}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={valor}
      aria-valuetext={texto}
      style={estilo}
    >
      {tipo === 'esfera' ? (
        <svg
          className="instrumento__esfera"
          viewBox="0 0 190 190"
          aria-hidden="true"
          focusable="false"
        >
          <circle className="instrumento__fondo" cx="95" cy="95" r="93.5" />
          <circle className="instrumento__aro" cx="95" cy="95" r="86.25" />
          {marcas.map((giro) => (
            <rect
              key={giro}
              className="instrumento__marca"
              x="94"
              y="14"
              width="2"
              height="10"
              transform={`rotate(${giro} 95 95)`}
            />
          ))}
          <rect
            className="instrumento__aguja"
            x="93"
            y="29"
            width="4"
            height="66"
            rx="2"
          />
          <circle className="instrumento__eje" cx="95" cy="95" r="7" />
        </svg>
      ) : (
        <div className="instrumento__columna" aria-hidden="true">
          <div className="instrumento__tubo">
            <div className="instrumento__nivel" />
          </div>
        </div>
      )}
      <p className="instrumento__valor text-dato-medio">{texto}</p>
      <p
        id={idEtiqueta}
        className="instrumento__etiqueta text-etiqueta-pequena"
      >
        {etiqueta}
      </p>
    </div>
  );
}
