import type { LocaleContentCollection, UseLocaleContentOptions } from './types';
import { loadLocaleContent } from './utils';

export async function useLocaleContent<Collection extends LocaleContentCollection>(
  collection: Collection,
  options: UseLocaleContentOptions<Collection> = {},
) {
  const { locale, defaultLocale } = useI18n();
  const { document = 'data', key } = options;

  const query = options.query
    ?? (({ builder, path }) => builder.where('stem', '=', `${path}/${document}`).first());

  const baseAsyncKey = key
    ?? (options.query
      ? `content:${String(collection)}:${useId()}`
      : `content:${String(collection)}:${document}`);
  const asyncKey = `${baseAsyncKey}:${locale.value}`;

  const asyncData = useAsyncData(
    asyncKey,
    async () => loadLocaleContent(collection, query, locale.value, defaultLocale),
  );

  watch(locale, () => asyncData.refresh({ dedupe: 'cancel' }));

  return asyncData;
}
