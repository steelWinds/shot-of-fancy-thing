import { useLocaleContent } from '~/shared/composables';

export async function useFooterContent() {
  const { data } = await useLocaleContent('footer_root', { key: 'footer-root-content' });

  const title = computed(() => data.value?.title);
  const links = computed(() => data.value?.links);

  return {
    title,
    links,
  };
}
