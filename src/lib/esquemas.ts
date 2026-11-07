/*
 * Esquemas de los datos de src/data.
 * Cada esquema valida su JSON y da el tipo TypeScript con z.infer, así
 * que el tipo y la validación no pueden contradecirse.
 * z.strictObject rechaza claves que no estén en el esquema: una clave mal
 * escrita sale como "sobra esta" y "falta aquella".
 */
import { z } from 'astro/zod';

/* Piezas comunes */

const texto = z.string().trim().min(1);

/** Texto en los dos idiomas de la web. */
export const esquemaTraducido = z.strictObject({ es: texto, en: texto });

const cota = z.int().min(0).max(5000);
const fecha = z.iso.date();

export const idsSector = [
  'sunnegga',
  'gornergrat',
  'glacier-paradise',
] as const;
export const dificultades = ['azul', 'roja', 'negra', 'freeride'] as const;

const idSector = z.enum(idsSector);
const dificultad = z.enum(dificultades);

/* Pistas */

export const esquemaPista = z
  .strictObject({
    numero: z.int().positive(),
    nombre: texto,
    dificultad,
    sector: idSector,
    longitudKm: z.number().positive(),
    salida: z.strictObject({ lugar: texto, cota }),
    llegada: z.strictObject({ lugar: texto, cota }),
    desnivel: z.int().positive(),
    estadoDemo: z.enum(['abierta', 'cerrada']),
  })
  .refine((p) => p.salida.cota - p.llegada.cota === p.desnivel, {
    message: 'El desnivel tiene que ser la cota de salida menos la de llegada',
    path: ['desnivel'],
  });

export const esquemaPistas = z
  .array(esquemaPista)
  .min(1)
  .refine((pistas) => sinRepetidos(pistas.map((p) => p.numero)), {
    message: 'Hay números de pista repetidos',
  });

/* Remontes */

export const esquemaRemonte = z
  .strictObject({
    id: z
      .string()
      .regex(
        /^[a-z0-9]+(-[a-z0-9]+)*$/,
        'El id va en minúsculas y con guiones',
      ),
    nombre: texto,
    tipo: z.enum([
      'funicular',
      'combinado',
      'teleferico',
      'telesilla',
      'telecabina',
      'tren',
    ]),
    // "puente": remonte que une dos sectores
    sector: z.enum([...idsSector, 'puente']),
    cotaBase: cota,
    cotaCima: cota,
    estadoDemo: z.enum(['abierto', 'cerrado']),
  })
  .refine((r) => r.cotaCima > r.cotaBase, {
    message: 'La cota de la cima tiene que ser mayor que la de la base',
    path: ['cotaCima'],
  });

export const esquemaRemontes = z
  .array(esquemaRemonte)
  .min(1)
  .refine((remontes) => sinRepetidos(remontes.map((r) => r.id)), {
    message: 'Hay ids de remonte repetidos',
  });

/* Sectores */

export const esquemaSector = z.strictObject({
  id: idSector,
  numero: z.int().positive(),
  nombre: texto,
  cotaMax: cota,
  descripcion: esquemaTraducido,
});

export const esquemaSectores = z.array(esquemaSector).refine(
  (sectores) =>
    mismosElementos(
      sectores.map((s) => s.id),
      idsSector,
    ),
  {
    message: `Tiene que haber un sector por id: ${idsSector.join(', ')}`,
  },
);

/* Resumen de la estación */

export const esquemaResumen = z.strictObject({
  pistas: z.int().positive(),
  km: z.number().positive(),
  remontes: z.int().positive(),
  desnivel: z.int().positive(),
  cotaMin: cota,
  cotaMax: cota,
  porDificultad: z.record(dificultad, z.int().min(0)),
});

/* Tarifas. Importes en céntimos de CHF. */

const importe = z.int().positive();

export const esquemaTarifas = z
  .strictObject({
    temporada: z.strictObject({
      id: z.string().regex(/^\d{4}-\d{2}$/, 'El id de temporada es AAAA-AA'),
      inicio: fecha,
      fin: fecha,
      alta: z.array(z.strictObject({ inicio: fecha, fin: fecha })),
      factorBaja: z.number().positive().max(1),
    }),
    moneda: z.literal('CHF'),
    cambioDemo: z.strictObject({
      EUR: z.number().positive(),
      nota: esquemaTraducido,
    }),
    diasMin: z.int().positive(),
    diasMax: z.int().positive(),
    gratisMenoresDe: z.int().min(0),
    descuentoFamilia: z.strictObject({
      porcentaje: z.number().positive().max(100),
      requisito: z.strictObject({
        adultosMin: z.int().min(0),
        ninosMin: z.int().min(0),
      }),
      texto: esquemaTraducido,
    }),
    tipos: z
      .array(
        z.strictObject({
          id: z.enum(['adulto', 'joven', 'nino', 'senior']),
          edad: esquemaTraducido,
          factor: z.number().positive().max(1),
          // Clave: número de días; valor: precio total en céntimos
          precios: z.record(z.string().regex(/^\d+$/), importe),
        }),
      )
      .min(1),
  })
  .superRefine((t, ctx) => {
    // Las fechas ISO (AAAA-MM-DD) se pueden comparar como texto
    if (t.temporada.inicio >= t.temporada.fin) {
      ctx.addIssue({
        code: 'custom',
        message: 'La temporada tiene que empezar antes de acabar',
        path: ['temporada'],
      });
    }
    t.temporada.alta.forEach((tramo, i) => {
      if (
        tramo.inicio > tramo.fin ||
        tramo.inicio < t.temporada.inicio ||
        tramo.fin > t.temporada.fin
      ) {
        ctx.addIssue({
          code: 'custom',
          message:
            'El tramo de temporada alta tiene que estar dentro de la temporada',
          path: ['temporada', 'alta', i],
        });
      }
    });
    if (t.diasMin > t.diasMax) {
      ctx.addIssue({
        code: 'custom',
        message: 'diasMin no puede ser mayor que diasMax',
        path: ['diasMin'],
      });
    }
    const dias = Array.from({ length: t.diasMax - t.diasMin + 1 }, (_, i) =>
      String(t.diasMin + i),
    );
    t.tipos.forEach((tipo, i) => {
      if (!mismosElementos(Object.keys(tipo.precios), dias)) {
        ctx.addIssue({
          code: 'custom',
          message: `Faltan o sobran precios: tiene que haber uno por día, de ${t.diasMin} a ${t.diasMax}`,
          path: ['tipos', i, 'precios'],
        });
      }
    });
  });

/* Tiempo (Open-Meteo) */

export const idsEfecto = [
  'ninguno',
  'despejado',
  'niebla',
  'nieve-debil',
  'nieve',
  'nieve-fuerte',
] as const;

export const esquemaTiempo = z.strictObject({
  fuente: texto,
  licencia: texto,
  cotas: z
    .array(
      z.strictObject({
        id: z.enum(['cumbre', 'gornergrat', 'pueblo']),
        nombre: texto,
        cota,
        lat: z.number().min(-90).max(90),
        lon: z.number().min(-180).max(180),
      }),
    )
    .min(1),
  efectos: z.strictObject({
    vientoFuerteKmh: z.number().positive(),
    nieblaVisibilidadKm: z.number().positive(),
  }),
  codigos: z
    .array(
      z.strictObject({
        // Códigos WMO del tiempo que agrupa esta entrada
        wmo: z.array(z.int().min(0).max(99)).min(1),
        id: z.string().regex(/^[a-z]+(-[a-z]+)*$/),
        icono: z.enum([
          'sol',
          'solnube',
          'nube',
          'niebla',
          'nievedebil',
          'nieve',
        ]),
        efecto: z.enum(idsEfecto),
        texto: esquemaTraducido,
      }),
    )
    .min(1)
    .refine((codigos) => sinRepetidos(codigos.flatMap((c) => c.wmo)), {
      message: 'Un código WMO no puede estar en dos entradas',
    })
    .refine((codigos) => sinRepetidos(codigos.map((c) => c.id)), {
      message: 'Hay ids de código repetidos',
    }),
});

/* Tipos */

export type Traducido = z.infer<typeof esquemaTraducido>;
export type IdSector = (typeof idsSector)[number];
export type Dificultad = (typeof dificultades)[number];
export type Pista = z.infer<typeof esquemaPista>;
export type Remonte = z.infer<typeof esquemaRemonte>;
export type Sector = z.infer<typeof esquemaSector>;
export type Resumen = z.infer<typeof esquemaResumen>;
export type Tarifas = z.infer<typeof esquemaTarifas>;
export type TipoForfait = Tarifas['tipos'][number];
export type Tiempo = z.infer<typeof esquemaTiempo>;
export type CodigoTiempo = Tiempo['codigos'][number];
export type EfectoTiempo = (typeof idsEfecto)[number];

/* Utilidades */

function sinRepetidos(valores: readonly unknown[]): boolean {
  return new Set(valores).size === valores.length;
}

function mismosElementos(a: readonly string[], b: readonly string[]): boolean {
  return (
    a.length === b.length && sinRepetidos(a) && b.every((x) => a.includes(x))
  );
}
