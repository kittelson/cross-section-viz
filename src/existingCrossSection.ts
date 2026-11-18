import { z } from 'zod';

export const existingCrossSectionSchema = z.object({
  rightOfWayFt: z
    .number({ error: 'Enter the right-of-way width.' })
    .min(1, { error: 'Right-of-way must be at least 1 ft.' }),
  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .nullable()
    .refine((value) => value != null, {
      error: 'Select a cross section location on the map or from search.',
    }),
});

export type ExistingCrossSectionFormValues = {
  rightOfWayFt: number | null;
  location: { lat: number; lng: number } | null;
};

export type ExistingCrossSection = z.infer<typeof existingCrossSectionSchema>;
