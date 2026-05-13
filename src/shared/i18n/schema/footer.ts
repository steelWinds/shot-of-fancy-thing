import { z } from 'zod/v4';

export const FooterSchema = z.object({
  title: z.string(),
  links: z.array(z.object({
    title: z.string(),
    to: z.string(),
  })),
});

export type FooterSchemaType = z.infer<typeof FooterSchema>;
