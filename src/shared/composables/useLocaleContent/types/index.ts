/// <reference path="../../../../../.nuxt/nuxt.d.ts" />

import type {
  CollectionQueryBuilder as ContentCollectionQueryBuilder,
  Collections as ContentCollections,
} from '@nuxt/content';

type LocaleSuffix = 'ru' | 'en';

type UnprefixKeys<T> = {
  [K in keyof T as K extends `${infer P}_${LocaleSuffix}` ? P : never]: T[K]
};

export type UnprefixedCollection = UnprefixKeys<ContentCollections>;
export type LocaleContentCollection = keyof UnprefixedCollection;
export type LocaleContentResult<Collection extends LocaleContentCollection> = UnprefixedCollection[Collection] | null;

export type UseLocaleContentQueryCallback<Collection extends LocaleContentCollection> = (options: {
  builder: ContentCollectionQueryBuilder<UnprefixedCollection[Collection]>
  path: string
}) => Promise<LocaleContentResult<Collection>>;

export interface UseLocaleContentOptions<Collection extends LocaleContentCollection> {
  document?: string
  key?: string
  query?: UseLocaleContentQueryCallback<Collection>
}
