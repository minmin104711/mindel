import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORIES } from './categories';

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum(CATEGORIES.map((c) => c.ko) as [string, ...string[]]),
      year: z.coerce.number(),
      cover: image(),
      images: z.array(image()).nullish().transform((v) => v ?? []),
      description: z.string().nullish().transform((v) => v ?? ''),
      // 대표 이미지 아래 정보 (비워도 돼요)
      period: z.coerce.string().nullish().transform((v) => v ?? ''),
      contribution: z.coerce.string().nullish().transform((v) => v ?? ''),
      tools: z.coerce.string().nullish().transform((v) => v ?? ''),
      model: z.coerce.string().nullish().transform((v) => v ?? ''),
    }),
});

export const collections = { works };
