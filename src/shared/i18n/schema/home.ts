import { z } from 'zod/v4';

export const HomePageSchema = z.object({
  hero: z.object({
    title: z.string(),
    description: z.array(z.string()),
  }),
  sections: z.object({
    my_projects: z.object({
      title: z.string(),
      description: z.array(z.string()),
      list: z.array(z.object({
        title: z.array(z.string()),
        link: z.object({
          to: z.string(),
          title: z.string(),
        }),
        image: z.string(),
        color_preset: z.string(),
      })),
    }),
    visit_github: z.object({
      title: z.string(),
      description: z.string(),
      link: z.object({
        title: z.string(),
        to: z.string(),
      }),
      image: z.string(),
    }),
    contact_me: z.object({
      title: z.string(),
      description: z.array(z.string()),
    }),
  }),
});
