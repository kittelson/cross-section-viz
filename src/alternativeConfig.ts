import { z } from 'zod';

export const alternativeConfigSchema = z.object({
  postedSpeedLimitMph: z
    .number({ error: 'Enter a posted speed limit.' })
    .int({ error: 'Speed limit must be a whole number.' })
    .min(5, { error: 'Speed limit must be at least 5 mph.' })
    .max(90, { error: 'Speed limit must be at most 90 mph.' }),
  hasParallelBikeFacility: z.boolean(),
  averageDailyTraffic: z
    .number({ error: 'Enter an average daily traffic.' })
    .int({ error: 'Average daily traffic must be a whole number.' })
    .min(0)
    .max(1000000),
});

export type AlternativeConfigFormValues = z.infer<
  typeof alternativeConfigSchema
>;
