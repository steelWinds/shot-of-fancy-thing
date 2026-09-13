import { en, ru } from '~/shared/i18n';

const locales = [en, ru] as const;

type LocaleKeys = Exclude<keyof typeof locales[number], 'key'>;

export function useTranslations(locale: string = 'ru') {
  const currentLocale = locales.find(translation => translation.key === locale);

  return (key: string) => currentLocale?.[key as LocaleKeys] ?? 'jopa';
}
