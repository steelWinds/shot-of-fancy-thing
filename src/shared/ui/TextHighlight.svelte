<script lang='ts'>
  import type { ComponentProps } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';
  import Highligher from './Highligher.svelte';

  type HTMLSpanAttributes = SvelteHTMLElements['span'];
  type HighlighterProps = ComponentProps<typeof Highligher>;

  interface TextPart {
    text: string
    highlighter?: Pick<HighlighterProps, 'action' | 'strokeWidth' | 'duration' | 'delay' | 'padding'>
  }

  interface Props extends HTMLSpanAttributes {
    items: TextPart[]
    class?: string
  }

  const { items, class: className, ...attrs }: Props = $props();
</script>

<span class={className} {...attrs}>
  {#each items as item, idx (idx)}
    {#if item.highlighter}
      <Highligher
        {...item.highlighter}
        color='var(--color-accent-green)'
        class='relative inline-block whitespace-nowrap'
      >
        {item.text}
      </Highligher>
    {:else}
      {item.text}
    {/if}
  {/each}
</span>
