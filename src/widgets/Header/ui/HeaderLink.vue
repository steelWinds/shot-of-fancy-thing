<script setup lang="ts">
interface Props {
  to?: string
  title?: string
}

defineProps<Props>();
</script>

<template>
  <NuxtLinkLocale
    class="text-m-p md:text-h4 py-5 px-8.75 border border-black rounded-[14px] inline-block"
    :to="to"
    external
  >
    {{ title }}
  </NuxtLinkLocale>
</template>
