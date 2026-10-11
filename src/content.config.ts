import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const highlightedText = z.array(z.object({
  text: z.string(),
  highlighter: z.object({
    action: z.enum([
      'underline',
      'box',
      'circle',
      'highlight',
      'strike-through',
      'crossed-off',
      'bracket',
    ]),
    strokeWidth: z.number().optional(),
    duration: z.number().optional(),
    delay: z.number().optional(),
    padding: z.number().optional(),
  }).optional(),
}));

const home = defineCollection({
  loader: glob({ base: './content/home', pattern: '**/*.json' }),
  schema: z.object({
    hero: z.object({
      titleFlat: z.string(),
      title: highlightedText,
      description: z.array(z.string()),
    }),
    projects: z.object({
      title: z.string(),
      subtitleFlat: z.string(),
      subtitle: highlightedText,
      items: z.array(z.object({
        title: z.string(),
        subtitle: z.string(),
        lottie: z.string(),
        lottieClass: z.string(),
        color: z.enum(['green', 'light', 'dark']),
        link: z.string().optional(),
      })),
    }),
    githubCard: z.object({
      title: z.string(),
      subtitle: z.string(),
      link: z.string(),
    }),
    contacts: z.object({
      title: z.string(),
      subtitleFlat: z.string(),
      subtitle: highlightedText,
      items: z.array(z.object({
        title: z.string(),
        subtitle: z.string(),
        link: z.string(),
        color: z.enum(['green', 'light', 'dark']),
      })),
    }),
  }),
});

export const collections = { home };
