import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum(['그래픽', '사진', '패키지']),
      year: z.coerce.number(),
      cover: image(),
      images: z.array(image()).nullish().transform((v) => v ?? []),
      description: z.string().nullish().transform((v) => v ?? ''),
    }),
});

export const collections = { works };
