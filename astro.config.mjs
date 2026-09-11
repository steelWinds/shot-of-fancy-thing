import process from 'node:process';

import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField, fontProviders } from 'astro/config';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  // site: 'https://example.com',
  output: 'static',

  trailingSlash: 'always',

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ru',
        locales: {
          en: 'en',
          ru: 'ru',
        },
      },
    }),
  ],

  i18n: {
    defaultLocale: 'ru',
    locales: ['en', 'ru'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Onest',
      cssVariable: '--font-onest',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: [
        'latin',
        'cyrillic',
      ],
      formats: ['woff2'],
      fallbacks: ['sans-serif'],
      display: 'swap',
    },
  ],

  env: {
    schema: {
      API_URL: envField.string({ context: 'server', access: 'secret', url: true, startsWith: 'https://' }),
    },
    validateSecrets: true,
  },

  security: {
    csp: isProd
      ? {
        directives: [
          "default-src 'self'",
          "style-src 'self'",
          "img-src 'self' data: blob:",
          "font-src 'self'",
          "connect-src 'self'",
          "media-src 'self'",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
        ],
      }
      : undefined,
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],

    build: {
      sourcemap: false,
    },
  },

  adapter: vercel({ staticHeaders: true }),
});
