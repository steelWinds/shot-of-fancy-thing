import { en, ru } from '~/shared/i18n';

const locales = [en, ru];

export function useTranslations(locale: string = 'ru') {
  const currentLocale = locales.find(translation => translation.key === locale) ?? {};

  return (key: string) => Object.keys(currentLocale).includes(key) ? currentLocale[key] : key;
}
