<script setup lang="ts">
import { Footer } from '~/widgets/Footer';
import { Header } from '~/widgets/Header';
</script>

<template>
  <div>
    <Header />

    <div>
      <slot />
    </div>

    <Footer />
  </div>
</template>
