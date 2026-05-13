<script lang="ts" setup>
import { PiniaColadaDevtools } from '@pinia/colada-devtools';

const { t } = useI18n();
const localeHead = useLocaleHead({ dir: true, lang: true, seo: true });

useSchemaOrg([
  defineLocalBusiness({
    name: t('$schemaOrg.name'),
    logo: '',
    telephone: t('$schemaOrg.telephone'),
    email: t('$schemaOrg.email'),
    address: {
      streetAddress: t('$schemaOrg.address.streetAddress'),
      addressLocality: t('$schemaOrg.address.addressLocality'),
      addressRegion: t('$schemaOrg.address.addressRegion'),
      postalCode: t('$schemaOrg.address.postalCode'),
      addressCountry: t('$schemaOrg.address.addressCountry'),
    },
    image: [],
    sameAs: [],
  }),
]);

useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  link: localeHead.value.link,
  meta: localeHead.value.meta,
}));
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <DevOnly>
    <PiniaColadaDevtools />
  </DevOnly>
</template>
