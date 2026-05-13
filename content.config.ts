import { defineCollection, defineContentConfig } from '@nuxt/content';
import {
  FooterSchema,
  HeaderSchema,
  HomePageSchema,
} from './src/shared/i18n';

function getLocaleContentSource(collection: string, locale: 'ru' | 'en') {
  return `${collection.replaceAll('_', '/')}/${locale}/**/*.json`;
}

export default defineContentConfig({
  collections: {
    // Home
    home_root_ru: defineCollection({
      type: 'data',
      source: getLocaleContentSource('home_root', 'ru'),
      schema: HomePageSchema,
    }),
    home_root_en: defineCollection({
      type: 'data',
      source: getLocaleContentSource('home_root', 'en'),
      schema: HomePageSchema,
    }),
    // Header
    header_root_ru: defineCollection({
      type: 'data',
      source: getLocaleContentSource('header_root', 'ru'),
      schema: HeaderSchema,
    }),
    header_root_en: defineCollection({
      type: 'data',
      source: getLocaleContentSource('header_root', 'en'),
      schema: HeaderSchema,
    }),
    // Footer
    footer_root_ru: defineCollection({
      type: 'data',
      source: getLocaleContentSource('footer_root', 'ru'),
      schema: FooterSchema,
    }),
    footer_root_en: defineCollection({
      type: 'data',
      source: getLocaleContentSource('footer_root', 'en'),
      schema: FooterSchema,
    }),
  },
});
