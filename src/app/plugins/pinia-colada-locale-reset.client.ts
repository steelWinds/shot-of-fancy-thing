import { useQueryCache } from '@pinia/colada';
import { PINIA_COLADA_CACHE_KEY, PINIA_COLADA_LOCALE_KEY } from '~/shared/api';

function clearAllQueries(queryCache: ReturnType<typeof useQueryCache>) {
  for (const entry of queryCache.getEntries()) {
    queryCache.remove(entry);
  }
}

function clearInactiveQueries(queryCache: ReturnType<typeof useQueryCache>) {
  for (const entry of queryCache.getEntries({ active: false })) {
    queryCache.remove(entry);
  }
}

export default defineNuxtPlugin(() => {
  const { $i18n } = useNuxtApp();
  const queryCache = useQueryCache();

  const resolveLocale = (locale: string | undefined) =>
    String(locale || $i18n.defaultLocale || '');

  const syncPersistedLocale = (locale: string) => {
    localStorage.setItem(PINIA_COLADA_LOCALE_KEY, locale);
  };

  const clearPersistedCache = () => {
    localStorage.removeItem(PINIA_COLADA_CACHE_KEY);
  };

  const currentLocale = resolveLocale($i18n.locale.value);
  const persistedLocale = localStorage.getItem(PINIA_COLADA_LOCALE_KEY);
  const hasPersistedCache = localStorage.getItem(PINIA_COLADA_CACHE_KEY) !== null;

  if (hasPersistedCache && persistedLocale !== currentLocale) {
    clearPersistedCache();
    clearAllQueries(queryCache);
  }

  syncPersistedLocale(currentLocale);

  watch(
    () => $i18n.locale.value,
    async (nextLocale, previousLocale) => {
      const normalizedNextLocale = resolveLocale(nextLocale);

      if (normalizedNextLocale === resolveLocale(previousLocale)) {
        syncPersistedLocale(normalizedNextLocale);

        return;
      }

      clearPersistedCache();
      syncPersistedLocale(normalizedNextLocale);

      queryCache.cancelQueries();

      clearInactiveQueries(queryCache);

      await queryCache.invalidateQueries();
    },
  );
});
