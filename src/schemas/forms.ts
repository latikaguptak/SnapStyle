import { z } from 'zod';

export const clothingItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.enum(['tops', 'bottoms', 'dresses', 'shoes', 'accessories'] as const, {
    required_error: 'Category is required',
  }),
  season: z.array(z.string()).min(1, 'Select at least one season'),
});

export type ClothingItemFormData = z.infer<typeof clothingItemSchema>;

export const outfitSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  label: z.string().min(1, 'Label is required'),
  plannedDate: z.string().optional(),
});

export type OutfitFormData = z.infer<typeof outfitSchema>;