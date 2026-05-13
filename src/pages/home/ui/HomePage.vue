<script setup lang="ts">
import { useHomePageContent } from '../model/content';

const { hero } = await useHomePageContent();
</script>

<template>
  <div class="w-full overflow-hidden">
    {{ hero }}
  </div>
</template>
