'use client';

import { z } from 'zod';
import { CardGradient, CARD_GRADIENTS } from '@/constants/card-gradients';

const gradientEnum = z.enum(
  CARD_GRADIENTS.map((gradient) => gradient.id) as [
    CardGradient,
    ...CardGradient[],
  ]
);

export const createCardSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  category: z.string().min(1, 'Category is required.'),
  mediaFiles: z.array(z.any()).optional(),
  selectedGradient: gradientEnum,
  tags: z.array(z.string()).optional(),
  selectedVisibility: z.enum(
    ['public', 'unlisted', 'private'],
    'Visibility is required.'
  ),
  allowComments: z.boolean().optional(),
  allowDownloads: z.boolean().optional(),
});

export type CreateCardFormType = z.infer<typeof createCardSchema>;
