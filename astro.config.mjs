import process from 'node:process';

import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

import { defineConfig, envField, fontProviders } from 'astro/config';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://steelcore.space',
  output: 'static',
  trailingSlash: 'ignore',
  session: false,
  integrations: [sitemap({
    i18n: {
      defaultLocale: 'ru',
      locales: {
        en: 'en',
        ru: 'ru',
      },
    },
  }), svelte({
    extensions: ['.svelte'],
  }), icon()],
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
    allowedDomains: [
      {
        hostname: 'steelcore.space',
        protocol: 'https',
      },
    ],
    csp: isProd
      ? {
        directives: [
          "default-src 'self'",
          "connect-src 'self' data:",
          "img-src 'self' data: blob:",
          "font-src 'self'",
          "media-src 'self'",
          "object-src 'none'",
          "base-uri 'self'",
        ],
        scriptDirective: {
          resources: ["'self'", "'wasm-unsafe-eval'"],
        },
        styleDirective: {
          resources: [
            { resource: "'self'", kind: 'element' },
            { resource: "'unsafe-inline'", kind: 'element' },
            { resource: "'unsafe-inline'", kind: 'attribute' },
          ],
        },
      }
      : undefined,
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],

    build: {
      sourcemap: false,
      rolldownOptions: {
        output: {
          minify: {
            compress: {
              dropConsole: true,
            },
          },
        },
      },
    },
  },
  adapter: vercel({ staticHeaders: true }),
});
