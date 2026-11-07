// @ts-check
// Configuración plana de ESLint: https://eslint.org/docs/latest/use/configure/
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist/', '.astro/']),

  // JavaScript y TypeScript
  js.configs.recommended,
  tseslint.configs.recommended,

  // Plantillas .astro, con sus reglas de accesibilidad
  astro.configs['flat/recommended'],
  astro.configs['flat/jsx-a11y-recommended'],

  // Islas de React
  {
    files: ['**/*.{jsx,tsx}'],
    ...jsxA11y.configs.recommended,
  },

  // Código que se ejecuta en el navegador y en Node (configuración, scripts)
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // Siempre al final: desactiva las reglas de estilo que ya resuelve Prettier
  prettier,
]);
