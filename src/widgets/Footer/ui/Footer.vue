<script setup lang="ts">
import { Badge } from '~/shared/ui/Badge';
import { Divider } from '~/shared/ui/Divider';
import { useFooterContent } from '../model/content';
import FooterContacts from './FooterContacts.vue';

const { title, links } = await useFooterContent();

const { t } = useI18n();
const dayjs = useDayjs();
</script>

<template>
  <footer
    class="
      w-full
      max-w-1240
      mx-auto
      pt-13.75
      pb-12.5
      px-15
      bg-black
      rounded-t-[45px]
    "
  >
    <div>
      <Badge class="text-p md:text-h4">
        <h2>
          {{ title }}
        </h2>
      </Badge>

      <FooterContacts
        v-if="links?.length"
        :links
        class="mt-6.75"
      />
    </div>

    <Divider class="mt-6 md:mt-12.5" />

    <span class="text-white text-p mt-6 md:mt-12.5 inline-block">
      {{ t('shared.copyright', { year: dayjs().year() }) }}
    </span>
  </footer>
</template>
