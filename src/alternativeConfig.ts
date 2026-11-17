import { z } from 'zod';
import {
  defaultProjectDetails,
  type ProjectDetailsFormValues,
} from '@/projectDetails';

export const alternativeConfigSchema = z.object({
  id: z.string(),
  alternativeName: z.string().min(1, { error: 'Enter an alternative name.' }),
  postedSpeedLimitMph: z
    .number({ error: 'Enter a posted speed limit.' })
    .int({ error: 'Speed limit must be a whole number.' })
    .min(5, { error: 'Speed limit must be at least 5 mph.' })
    .max(90, { error: 'Speed limit must be at most 90 mph.' }),
  eightyFifthPctSpeedMph: z
    .number({ error: 'Enter the 85th percentile speed.' })
    .min(0)
    .optional()
    .nullable(),
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

export function nextAlternativeName(
  alternatives: AlternativeConfigFormValues[],
) {
  let nextNumber = alternatives.length + 1;
  const names = new Set(alternatives.map((alt) => alt.alternativeName));
  while (names.has(`Alternative ${nextNumber}`)) {
    nextNumber += 1;
  }
  return `Alternative ${nextNumber}`;
}

export function createAlternativeConfig(
  alternativeName: string,
  projectDetails: ProjectDetailsFormValues = defaultProjectDetails,
): AlternativeConfigFormValues {
  return {
    id: crypto.randomUUID(),
    alternativeName,
    postedSpeedLimitMph: projectDetails.postedSpeedLimitMph,
    eightyFifthPctSpeedMph: projectDetails.percentileSpeed85Mph,
    hasParallelBikeFacility: false,
    averageDailyTraffic: projectDetails.averageDailyTraffic || 6000,
  };
}

export const defaultAlternatives: AlternativeConfigFormValues[] = [
  createAlternativeConfig('Alternative 1'),
];
