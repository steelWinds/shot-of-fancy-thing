<script lang='ts'>
  interface Props {
    src: string
    autoplay: boolean
    loop: boolean
  }

  const { src, loop, autoplay }: Props = $props();
</script>

<div
  data-testid='dot-lottie-svelte'
  data-src={src}
  data-loop={loop}
  data-autoplay={autoplay}
></div>
