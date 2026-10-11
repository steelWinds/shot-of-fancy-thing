import { fc, test } from '@fast-check/vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useTranslations } from '~/shared/lib/useTranslations';

const translations = vi.hoisted(() => ({
  en: {
    'key': 'en',
    'lang': 'en',
    'one.two.three': 'One Two Three',
  },
  ru: {
    'key': 'ru',
    'lang': 'ru',
    'one.two.three': 'Один Два Три',
  },
} as const));

vi.mock(import('~/shared/i18n'), () => translations);

let tEn: ReturnType<typeof useTranslations>;
let tRu: ReturnType<typeof useTranslations>;

beforeEach(() => {
  tEn = useTranslations('en');
  tRu = useTranslations('ru');
});

describe('useTranslations composable', () => {
  it('should return the correct translation', () => {
    expect(tEn('lang')).toBe(translations.en.lang);
    expect(tRu('lang')).toBe(translations.ru.lang);
  });

  it('should return the correct translation if its keys is string with dots', () => {
    expect(tEn('one.two.three')).toBe(translations.en['one.two.three']);
    expect(tRu('one.two.three')).toBe(translations.ru['one.two.three']);
  });

  test.prop({
    key: fc.string()
      .filter(value => !Object.keys(translations.ru).includes(value)),
  })('should return key, if translation not found', ({ key }) => {
    expect(tEn(key)).toBe(key);
  });
});
