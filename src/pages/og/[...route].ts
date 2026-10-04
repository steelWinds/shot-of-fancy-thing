import { OGImageRoute } from 'astro-og-canvas';
import { useTranslations } from '~/shared/lib';

const tRu = useTranslations('ru');
const tEn = useTranslations('en');

const pages = {
  'ru/home': {
    title: tRu('seo.index.title'),
    description: tRu('seo.index.description'),
  },
  'en/home': {
    title: tEn('seo.index.title'),
    description: tEn('seo.index.description'),
  },
  'ru/404': {
    title: tRu('seo.404.title'),
    description: tRu('seo.404.description'),
  },
  'en/404': {
    title: tEn('seo.404.title'),
    description: tEn('seo.404.description'),
  },
  'ru/500': {
    title: tRu('seo.500.title'),
    description: tRu('seo.500.description'),
  },
  'en/500': {
    title: tEn('seo.500.title'),
    description: tEn('seo.500.description'),
  },
};

// eslint-disable-next-line antfu/no-top-level-await
export const { getStaticPaths, GET } = await OGImageRoute({
  pages,

  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,

    fonts: [
      './src/shared/assets/fonts/Onest.ttf',
    ],

    logo: {
      path: './public/favicon-96x96.png',
      size: [90, 90],
    },

    font: {
      title: {
        families: ['Onest'],
        weight: 'Bold',
        size: 64,
      },

      description: {
        families: ['Onest'],
        weight: 'Normal',
        size: 32,
      },
    },
  }),
});
