<script lang="ts">
import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';
import sftHeroAnimation from '~/shared/assets/lottie/sft-hero-animation.lottie?url'
</script>

<DotLottieSvelte
  src={sftHeroAnimation}
  loop
  autoplay
  layout={{ fit: 'contain' }}
  renderConfig={{
    autoResize: true,
    devicePixelRatio: window.devicePixelRatio,
  }}
/>
