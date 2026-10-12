import process from 'node:process';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { defineConfig, fontProviders } from 'astro/config';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://steelcore.space',
  output: 'static',
  trailingSlash: 'ignore',
  session: false,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ru',
        locales: {
          en: 'en-US',
          ru: 'ru-RU',
        },
      },
      xslURL: '/sitemap.xsl',
      changefreq: ChangeFreqEnum.WEEKLY,
      priority: 1,
    }),
    svelte({
      extensions: ['.svelte'],
    }),
    icon(),
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
  security: {
    allowedDomains: [
      {
        hostname: 'steelcore.space',
        protocol: 'https',
      },
    ],
    csp: {
      directives: [
        "default-src 'self'",
        "connect-src 'self' data: https://vercel.live https://vercel.com https://vitals.vercel-insights.com wss://ws-us3.pusher.com",
        "img-src 'self' data: blob: https://vercel.live https://vercel.com",
        "font-src 'self' https://vercel.live https://assets.vercel.com",
        "media-src 'self'",
        "frame-src 'self' https://vercel.live https://vercel.com",
        "manifest-src 'self' https://vercel.com",
        "object-src 'none'",
        "base-uri 'self'",
      ],
      scriptDirective: {
        resources: [
          "'self'",
          "'wasm-unsafe-eval'",
          {
            resource: 'https://vercel.live',
            kind: 'element',
          },
          {
            resource: 'https://va.vercel-scripts.com',
            kind: 'element',
          },
          {
            resource: "'self'",
            kind: 'element',
          },
        ],
      },
      styleDirective: {
        resources: [
          { resource: "'self'", kind: 'element' },
          { resource: 'https://vercel.live', kind: 'element' },
          { resource: "'unsafe-inline'", kind: 'element' },
          { resource: "'unsafe-inline'", kind: 'attribute' },
        ],
      },
    },
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
  adapter: vercel({ staticHeaders: isProd }),
});
