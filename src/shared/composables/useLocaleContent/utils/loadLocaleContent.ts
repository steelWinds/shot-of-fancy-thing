import type { LocaleContentCollection, UseLocaleContentQueryCallback } from '../types';
import { joinURL } from 'ufo';

function getLocaleContentPath(collection: string) {
  return collection.replaceAll('_', '/');
}

export async function loadLocaleContent<Collection extends LocaleContentCollection>(
  collection: Collection,
  query: UseLocaleContentQueryCallback<Collection>,
  currentLocale: string,
  defaultLocale: string,
) {
  const contentPath = getLocaleContentPath(String(collection));
  const localePathBuilder = (path: string, locale: string) => `${path}_${locale}` as Collection;

  let content = await query({
    builder: queryCollection(localePathBuilder(collection, currentLocale) as any),
    path: joinURL(contentPath, currentLocale),
  });

  if (!content && currentLocale !== defaultLocale) {
    content = await query({
      builder: queryCollection(localePathBuilder(collection, defaultLocale) as any),
      path: joinURL(contentPath, defaultLocale),
    });
  }

  return content;
}
