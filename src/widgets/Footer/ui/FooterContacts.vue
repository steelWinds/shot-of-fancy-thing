<script setup lang="ts">
import type { FooterSchemaType } from '~/shared/i18n';

interface Props {
  links: FooterSchemaType['links']
}

defineProps<Props>();
</script>

<template>
  <ul class="text-white space-y-3 md:space-y-5">
    <li v-for="{ title, to } of links" :key="title" class="text-m-p md:text-p">
      <NuxtLinkLocale :to external target="_blank">
        {{ title }}
      </NuxtLinkLocale>
    </li>
  </ul>
</template>
