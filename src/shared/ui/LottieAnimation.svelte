<script lang='ts'>
  import type { Config, DotLottie } from '@lottiefiles/dotlottie-svelte';
  import { DotLottieSvelte, setWasmUrl } from '@lottiefiles/dotlottie-svelte';
  import { onDestroy } from 'svelte';

  setWasmUrl('/vendor/dotlottie-player.wasm');

  interface Props {
    name: string
    loop?: Config['loop']
    autoplay?: Config['autoplay']

    oninit?: (ref: DotLottie) => void
  }

  const { name, autoplay, loop, oninit, ...otherProps }: Props = $props();

  const src = $derived(new URL(`../assets/lottie/${name}.lottie`, import.meta.url).href);

  let mediaQuery: MediaQueryList | null = null;
  let dotLottie: DotLottie | null = null;

  function toggleLottiePlayer(state: boolean) {
    if (state || !autoplay) {
      dotLottie?.stop();
    }
    else {
      dotLottie?.play();
    }
  }

  function handleChangeReducedMotion(event: MediaQueryListEvent) {
    toggleLottiePlayer(event.matches);
  }

  function handleLoadLottie() {
    if (autoplay) {
      toggleLottiePlayer(mediaQuery?.matches ?? false);
    }
  }

  function setupDotLottie(ref: DotLottie) {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    dotLottie = ref;

    dotLottie.addEventListener('load', handleLoadLottie);
    mediaQuery.addEventListener('change', handleChangeReducedMotion);

    oninit?.(dotLottie);
  }

  function cleanup() {
    mediaQuery?.removeEventListener('change', handleChangeReducedMotion);
    dotLottie?.removeEventListener('load', handleLoadLottie);
  }

  onDestroy(cleanup);
</script>

<DotLottieSvelte
  {src}
  loop={loop}
  layout={{ fit: 'contain', align: [0.5, 0.5] }}
  renderConfig={{
    autoResize: true,
    devicePixelRatio: globalThis?.devicePixelRatio ?? 1,
    quality: 100,
  }}
  dotLottieRefCallback={setupDotLottie}
  {...otherProps}
/>
