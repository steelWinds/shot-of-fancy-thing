import { useLocaleContent } from '~/shared/composables';

export async function useHomePageContent() {
  const { data } = await useLocaleContent('home_root', { key: 'home-root-content' });

  const hero = computed(() => data.value?.hero);
  const sections = computed(() => data.value?.sections);

  return {
    hero,
    sections,
  };
}
