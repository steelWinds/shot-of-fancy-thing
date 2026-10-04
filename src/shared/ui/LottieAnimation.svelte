<script lang="ts">
import type { Config } from '@lottiefiles/dotlottie-svelte';
import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';
  import { onMount } from 'svelte';

interface Props {
  name: string
  loop?: Config['loop']
  autoplay?: Config['autoplay']
  duration?: number
}

const {name, autoplay, loop, ...otherProps}: Props = $props();

const src = $derived(new URL(`../assets/lottie/${name}.lottie`, import.meta.url).href);

let isReducedMotion = $state(false);

const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

isReducedMotion = mediaQuery.matches;

onMount(() => {
  const handleChange = (event: MediaQueryListEvent) => {
    isReducedMotion = event.matches;
  };

  mediaQuery.addEventListener('change', handleChange);

  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
});
</script>

<DotLottieSvelte
  {src}
  autoplay={autoplay && !isReducedMotion}
  loop={loop && !isReducedMotion}
  {...otherProps}
  layout={{ fit: 'contain', align: [0.5, 0.5] }}
  renderConfig={{
    autoResize: true,
    devicePixelRatio: window.devicePixelRatio,
  }}
/>
