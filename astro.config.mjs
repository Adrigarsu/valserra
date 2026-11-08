// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { idiomas, idiomaPorDefecto } from './src/lib/i18n.ts';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://adrigarsu.github.io',
  base: '/valserra',
  integrations: [react()],
  // Rutas por idioma: /valserra/es/ y /valserra/en/. Las dos llevan el
  // prefijo; la raíz (/valserra/) redirige al español desde
  // src/pages/index.astro.
  i18n: {
    locales: [...idiomas],
    defaultLocale: idiomaPorDefecto,
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
