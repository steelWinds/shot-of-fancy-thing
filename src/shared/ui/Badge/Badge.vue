<script setup lang="ts">
type BadgeColor = 'green' | 'grey';

interface Props {
  color?: BadgeColor
}

const props = withDefaults(defineProps<Props>(), {
  color: 'green',
});

const modificators = computed(() => ({
  [`badge--color-${props.color}`]: props.color,
}));
</script>

<template>
  <span class="badge" :class="modificators">
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 0 7px;
  border-radius: 7px;
}

.badge--color-green {
  background-color: var(--color-green);
}

.badge--color-grey {
  background-color: var(--color-grey);
}
</style>
