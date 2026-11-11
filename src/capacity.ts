import { z } from 'zod';
import { intersectionTypeValues } from '@/projectDetails';

export const capacityScenarioSchema = z.object({
  id: z.string(),
  label: z.string(),
  averageDailyTraffic: z
    .number({ error: 'Enter an average daily traffic.' })
    .int({ error: 'Average daily traffic must be a whole number.' })
    .min(0)
    .max(1000000),
  downstreamIntersectionType: z.enum(intersectionTypeValues, {
    error: 'Select the controlling downstream intersection type.',
  }),
  dFactor: z.number({ error: 'Enter a D factor.' }).min(0).max(1),
  gcRatio: z.number({ error: 'Enter a g/C ratio.' }).min(0).max(1),
});

export const capacityFormSchema = z.object({
  scenarios: z.array(capacityScenarioSchema),
});

export type CapacityScenario = z.infer<typeof capacityScenarioSchema>;
export type CapacityFormValues = z.infer<typeof capacityFormSchema>;

export type CapacityResults = {
  peakHourDcRatio: number;
  sixteenHourEfficiency: number;
  sixteenHourExcessCapacity: number;
  hoursBelowCapacity: number;
};

export const defaultCapacityScenarios: CapacityScenario[] = [
  {
    id: 'existing',
    label: 'Existing Cross Section',
    averageDailyTraffic: 6000,
    downstreamIntersectionType: 'signalFourLane',
    dFactor: 0.5,
    gcRatio: 0.1,
  },
  {
    id: 'alternative1',
    label: 'Alternative 1',
    averageDailyTraffic: 6000,
    downstreamIntersectionType: 'signalTwoLane',
    dFactor: 0.5,
    gcRatio: 0.1,
  },
];

export const capacityResultsById: Record<string, CapacityResults> = {
  existing: {
    peakHourDcRatio: 0.16,
    sixteenHourEfficiency: 0,
    sixteenHourExcessCapacity: 28.3,
    hoursBelowCapacity: 24,
  },
  alternative1: {
    peakHourDcRatio: 0.31,
    sixteenHourEfficiency: 0,
    sixteenHourExcessCapacity: 12.3,
    hoursBelowCapacity: 24,
  },
};
