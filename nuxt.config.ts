import process from 'node:process';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { locales } from './src/shared/i18n/locales';

const POSTCSS_PX_TO_REM_ROOT_VALUE = 16;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  /* =======================
    Nuxt settings
  ======================= */

  compatibilityDate: '2026-05-06',

  devtools: { enabled: true },

  devServer: {
    port: Number(process.env.NITRO_PORT ?? 3000),
    host: process.env.NITRO_HOST ?? '',
  },

  /* =======================
    App settings
  ======================= */

  app: {
    head: {
      titleTemplate: '%s',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover',
        },
        {
          name: 'theme-color',
          content: '#ff3737',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png' },
        { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' },
      ],
    },
  },

  routeRules: {
    '/api/v1/**': {
      cors: true,
      headers: {
        'access-control-allow-methods': 'GET, POST, PUT, DELETE',
      },
    },

    '/ru': { swr: 3600 },
    '/en': { swr: 3600 },
  },

  nitro: {
    prerender: {
      routes: [
        '/ru',
        '/en',
      ],
    },
  },

  /* =======================
    CSS settings
  ======================= */

  css: [
    './assets/css/tailwind.css',
    // *The preflight styles are imported separately because they would otherwise conflict with our styles.
    './assets/css/preflight.css',
  ],

  postcss: {
    plugins: {
      '@csstools/postcss-global-data': {
        files: [
          './src/app/assets/css/tailwind.css',
        ],
      },
      'postcss-preset-env': {
        stage: 2,
        features: {
          'nesting-rules': true,
          'color-mix': {
            preserve: true,
          },
          'oklab-function': {
            preserve: true,
          },
          'custom-media-queries': true,
        },
      },
      // *postcss-pxtorem is required for fluid typography
      'postcss-pxtorem': {
        rootValue: POSTCSS_PX_TO_REM_ROOT_VALUE,
        propList: ['*'],
      },
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        'dayjs',
        'dayjs/plugin/updateLocale',
        'dayjs/locale/ru',
        'dayjs/locale/en',
        'dayjs/plugin/localizedFormat',
        'dayjs/plugin/relativeTime',
        'dayjs/plugin/utc',
        '@pinia/colada-devtools',
        '@pinia/colada-plugin-cache-persister',
      ],
    },
    resolve: {
      alias: {
        pinia: fileURLToPath(new URL('./node_modules/pinia/dist/pinia.mjs', import.meta.url)),
      },
    },
    plugins: [
      tailwindcss(),
    ],
  },

  /* =======================
    FSD structure settings
  ======================= */

  alias: {
    '~': fileURLToPath(new URL('./src', import.meta.url)),
    '~server': fileURLToPath(new URL('./server', import.meta.url)),
  },

  srcDir: './src',

  serverDir: './server',

  dir: {
    assets: './app/assets',
    layouts: './app/layouts',
    middleware: './app/middleware',
    modules: './app/modules',
    pages: './app/routes',
    plugins: './app/plugins',
    shared: './shared',
  },

  /* =======================
    Modules settings
  ======================= */

  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxtjs/seo',
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
    '@morev/vue-transitions/nuxt',
    'dayjs-nuxt',
  ],

  dayjs: {
    locales: ['ru', 'en'],
    plugins: ['localizedFormat'],
    defaultLocale: 'ru',
  },

  hints: {
    devtools: true,
    features: {
      lazyLoad: false,
      hydration: true,
      webVitals: true,
      thirdPartyScripts: true,
      htmlValidate: true,
    },
  },

  vueTransitions: {
    defaultProps: {
      duration: 150,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  robots: {
    mergeWithRobotsTxtPath: 'public/_robots.txt',
    robotsTxt: true,
  },

  fonts: {
    defaults: {
      weights: [300, 400, 500, 600, 700],
      styles: ['normal', 'italic', 'oblique'],
    },
  },

  // *Disabling the default config for forwarding @antfu/eslint-config
  eslint: {
    config: {
      standalone: false,
    },
  },

  image: {
    provider: 'ipx',
    format: ['webp'],
    quality: 90,
    ipx: {
      modifiers: {
        format: 'webp',
        quality: 90,
      },
    },
  },

  sitemap: {
    autoLastmod: false,
    cacheMaxAgeSeconds: 3600,
    excludeAppSources: ['nuxt:route-rules'],
    includeAppSources: true,
    defaults: {
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
    },
  },

  ogImage: {
    security: {
      strict: true,
    },
    buildCache: true,
  },

  i18n: {
    locales,
    restructureDir: './src/shared/i18n',
    langDir: './locales',
    defaultLocale: 'ru',
    strategy: 'prefix',
    vueI18n: './src/shared/i18n/i18n.config.ts',
  },
});
