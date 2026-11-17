import type { AlternativeConfigFormValues } from '@/alternativeConfig';
import {
  intersectionTypeValues,
  type ProjectDetailsFormValues,
} from '@/projectDetails';
import { z } from 'zod';

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

const defaultIntersectionType =
  intersectionTypeValues[1] satisfies CapacityScenario['downstreamIntersectionType'];

export const defaultCapacityScenarios: CapacityScenario[] = [
  {
    id: 'existing',
    label: 'Existing Cross Section',
    averageDailyTraffic: 6000,
    downstreamIntersectionType: 'signalFourLane',
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
};

const placeholderAlternativeResults: CapacityResults = {
  peakHourDcRatio: 0.31,
  sixteenHourEfficiency: 0,
  sixteenHourExcessCapacity: 12.3,
  hoursBelowCapacity: 24,
};

export function getCapacityResults(id: string): CapacityResults {
  return capacityResultsById[id] ?? placeholderAlternativeResults;
}

export function buildCapacityScenarios(
  alternatives: AlternativeConfigFormValues[],
  projectDetails: ProjectDetailsFormValues,
  previous: CapacityScenario[] = [],
): CapacityScenario[] {
  const previousById = new Map(
    previous.map((scenario) => [scenario.id, scenario]),
  );
  const existingPrevious = previousById.get('existing');
  const projectIntersection =
    projectDetails.downstreamIntersectionType || defaultIntersectionType;

  return [
    {
      id: 'existing',
      label: 'Existing Cross Section',
      averageDailyTraffic:
        existingPrevious?.averageDailyTraffic ??
        projectDetails.averageDailyTraffic,
      downstreamIntersectionType:
        existingPrevious?.downstreamIntersectionType ?? projectIntersection,
      dFactor: existingPrevious?.dFactor ?? 0.5,
      gcRatio: existingPrevious?.gcRatio ?? 0.1,
    },
    ...alternatives.map((alternative) => {
      const previousScenario = previousById.get(alternative.id);
      return {
        id: alternative.id,
        label: alternative.alternativeName,
        averageDailyTraffic:
          previousScenario?.averageDailyTraffic ??
          alternative.averageDailyTraffic,
        downstreamIntersectionType:
          previousScenario?.downstreamIntersectionType ?? projectIntersection,
        dFactor: previousScenario?.dFactor ?? 0.5,
        gcRatio: previousScenario?.gcRatio ?? 0.1,
      };
    }),
  ];
}
