<script setup lang="ts">
import { HomePage } from '~/pages/home';

const { t } = useI18n();

useSeoMeta({
  title: () => t('meta.home.title'),
  description: () => t('meta.home.description'),
  ogTitle: () => t('meta.home.title'),
  ogDescription: () => t('meta.home.description'),
  twitterTitle: () => t('meta.home.title'),
  twitterDescription: () => t('meta.home.description'),
});

defineOgImage('NuxtSeo', {
  colorMode: 'light',
}, {
  alt: () => t('meta.home.title'),
});
</script>

<template>
  <div>
    <HomePage />
  </div>
</template>
