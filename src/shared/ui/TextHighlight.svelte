<script lang="ts">
import type { ComponentProps } from 'svelte';
import Highligher from './Highligher.svelte';

type HighlighterProps = ComponentProps<typeof Highligher>;

interface TextPart {
  text: string
  highlighter?: Pick<HighlighterProps, 'action' | 'strokeWidth' | 'duration' | 'delay' | 'padding'>
}

interface Props {
  items: TextPart[]
  class?: string
}

const { items, class: className }: Props = $props();
</script>

<span class={className}>
  {#each items as item}
    {#if item.highlighter}
      <Highligher
        {...item.highlighter}
        color="var(--color-accent-green)"
        class="relative inline-block whitespace-nowrap"
      >
        {item.text}
      </Highligher>
    {:else}
      {item.text}
    {/if}
  {/each}
</span>
