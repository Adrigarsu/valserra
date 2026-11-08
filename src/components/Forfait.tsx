/*
 * Forfait individual con resguardo troquelado (Figma: Componentes
 * Valserra › Forfait). En la calculadora se apila uno por persona en
 * abanico y, al comprar, los resguardos se cortan por la perforación.
 *
 * Es de React porque lo usa la isla de Forfaits, pero en la home se pinta
 * desde Astro sin directiva client:, así que allí es HTML sin JavaScript.
 *
 * La perforación es decorativa (aria-hidden). El cuerpo y el resguardo son
 * dos piezas con su propio borde para que el corte se pueda animar.
 */
import type { TipoForfait } from '../lib/esquemas.ts';
import { traductor, type Idioma } from '../lib/i18n.ts';
import '../styles/componentes/forfait.css';

interface Props {
  idioma: Idioma;
  tipo: TipoForfait['id'];
  dias: number;
  /** Número del forfait; se pinta con cuatro cifras: 5 → 0005. */
  numero: number;
}

export default function Forfait({ idioma, tipo, dias, numero }: Props) {
  const t = traductor(idioma);
  const tipoYDias = t('forfaits.billete.tipoYDias', {
    tipo: t(`forfaits.tiposSingular.${tipo}`),
    dias,
  });

  return (
    <article className="forfait">
      <div className="forfait__cuerpo">
        <div className="forfait__cabecera">
          <p className="forfait__marca">Valserra</p>
          <p className="forfait__etiqueta text-etiqueta-pequena">
            {t('forfaits.billete.temporada')}
          </p>
        </div>
        <div className="forfait__datos">
          <p className="forfait__etiqueta text-etiqueta-pequena">
            {t('forfaits.billete.producto')}
          </p>
          <p className="forfait__dato text-dato-medio">{tipoYDias}</p>
          <p className="forfait__etiqueta text-etiqueta-pequena">
            {t('forfaits.billete.incluye')}
          </p>
        </div>
      </div>
      <div className="forfait__perforacion" aria-hidden="true" />
      <div className="forfait__resguardo">
        <p className="forfait__etiqueta text-etiqueta-pequena">
          {t('forfaits.billete.numero')}
        </p>
        <p className="forfait__dato text-dato-medio">
          {String(numero).padStart(4, '0')}
        </p>
        <p className="forfait__etiqueta text-etiqueta-pequena">
          {t('forfaits.billete.valido')}
        </p>
      </div>
    </article>
  );
}
