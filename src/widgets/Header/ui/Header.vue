<script setup lang="ts">
import { useHeaderContent } from '../model/content';
import HeaderLink from './HeaderLink.vue';

const { title, link } = await useHeaderContent();
</script>

<template>
  <header
    class="
      w-full
      flex
      flex-col
      md:flex-row
      md:justify-between
      items-center
      space-y-4
      md:space-y-0
      py-4
      px-2
      pt-6
      md:py-5
      md:px-18
      md:pt-15
      max-w-1440
      mx-auto
    "
  >
    <h1 class="font-medium text-m-h4 md:text-m-h3">
      {{ title }}
    </h1>

    <HeaderLink v-bind="link" />
  </header>
</template>
