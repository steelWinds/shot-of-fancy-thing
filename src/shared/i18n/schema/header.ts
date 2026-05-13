import { z } from 'zod/v4';

export const HeaderSchema = z.object({
  title: z.string(),
  link: z.object({
    to: z.string(),
    title: z.string(),
  }),
});
