<script setup lang="ts">
import type { NuxtError } from '#app';

interface Props {
  error: NuxtError
}

const props = defineProps<Props>();

const localePath = useLocalePath();
const { t } = useI18n();
const statusCode = computed(() => {
  const rawStatusCode = Number(props.error?.statusCode ?? props.error?.status ?? 500);

  return Number.isFinite(rawStatusCode) && rawStatusCode > 0 ? rawStatusCode : 500;
});
const isNotFound = computed(() => statusCode.value === 404);
const errorMessageKey = computed(() => isNotFound.value ? 'notFound' : 'default');
const title = computed(() => t(`errors.${errorMessageKey.value}.title`));
const description = computed(() => t(`errors.${errorMessageKey.value}.description`));

async function handleNavigateHome() {
  await clearError({ redirect: localePath('/') });
}

useSeoMeta({
  title: () => `${statusCode.value} | ${title.value}`,
  description: () => description.value,
  robots: 'noindex, nofollow',
});
</script>

<template>
  <main class="min-h-dvh flex items-center">
    <section class="container py-16 md:py-24">
      <p class="text-m-32 md:text-32 font-bold mb-4 opacity-80">
        {{ statusCode }}
      </p>
      <h1 class="text-m-h2 md:text-h2 font-bold uppercase mb-6 max-w-[900px]">
        {{ title }}
      </h1>
      <p class="text-m-24 md:text-24 max-w-[720px] mb-10">
        {{ description }}
      </p>
      <button
        class="
          inline-flex
          min-h-14
          items-center
          justify-center
          rounded-md
          bg-white
          px-8
          py-4
          text-m-18
          md:text-18
          font-bold
          text-black
          transition
          hover:bg-yellow
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-2
          focus-visible:outline-white
        "
        type="button"
        @click="handleNavigateHome"
      >
        {{ t('errors.actions.home') }}
      </button>
      <p class="mt-8 text-m-18 md:text-18 opacity-70">
        {{ t('nuxtSiteConfig.name') }}
      </p>
    </section>
  </main>
</template>
