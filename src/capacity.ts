import type { ProjectDetailsFormValues } from '@/projectDetails';

export type CapacityScenario = {
  id: string;
  label: string;
  averageDailyTraffic: string;
  downstreamIntersectionType: ProjectDetailsFormValues['downstreamIntersectionType'];
  dFactor: string;
  gcRatio: string;
};

export type CapacityResults = {
  peakHourDcRatio: string;
  sixteenHourEfficiency: string;
  sixteenHourExcessCapacity: string;
  hoursBelowCapacity: string;
};

export const defaultCapacityScenarios: CapacityScenario[] = [
  {
    id: 'existing',
    label: 'Existing Cross Section',
    averageDailyTraffic: '6000',
    downstreamIntersectionType: 'signalFourLane',
    dFactor: '0.5',
    gcRatio: '0.1',
  },
  {
    id: 'alternative1',
    label: 'Alternative 1',
    averageDailyTraffic: '6000',
    downstreamIntersectionType: 'signalTwoLane',
    dFactor: '0.5',
    gcRatio: '0.1',
  },
];

export const capacityResultsById: Record<string, CapacityResults> = {
  existing: {
    peakHourDcRatio: '0.16',
    sixteenHourEfficiency: '0%',
    sixteenHourExcessCapacity: '28.30',
    hoursBelowCapacity: '24',
  },
  alternative1: {
    peakHourDcRatio: '0.31',
    sixteenHourEfficiency: '0%',
    sixteenHourExcessCapacity: '12.3',
    hoursBelowCapacity: '24',
  },
};
