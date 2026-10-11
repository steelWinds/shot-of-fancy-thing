<script lang='ts'>
  import type { RoughAnnotationType } from 'rough-notation/lib/model';
  import { cn } from 'cn';
  import { onMount } from 'svelte';
  import { annotate } from 'svelte-rough-notation';

  interface Props {
    action?: RoughAnnotationType
    color?: string
    strokeWidth?: number
    duration?: number
    delay?: number
    padding?: number
    class?: string
    children?: import('svelte').Snippet
  }

  const {
    action = 'underline',
    color = '#ffd1dc',
    strokeWidth = 1.5,
    duration = 2000,
    delay = 1000,
    padding = 2,
    class: className = '',
    children,
  }: Props = $props();

  let visible = $state(false);

  onMount(() => {
    const timer = setTimeout(() => {
      const isPreferReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

      visible = !isPreferReduceMotion.matches;
    }, delay);

    return () => clearTimeout(timer);
  });
</script>

<span
  use:annotate={{
    type: action,
    visible,
    color,
    strokeWidth,
    animationDuration: duration,
    padding,
  }}
  class={cn(className)}
>
  {@render children?.()}
</span>
