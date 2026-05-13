import { useLocaleContent } from '~/shared/composables';

export async function useHeaderContent() {
  const { data } = await useLocaleContent('header_root', { key: 'header-root-content' });

  const title = computed(() => data.value?.title);
  const link = computed(() => data.value?.link);

  return {
    title,
    link,
  };
}
