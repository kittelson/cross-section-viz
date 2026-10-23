import { z } from 'zod';

export const landUseContextValues = [
  'rural',
  'ruralTown',
  'suburban',
  'urban',
  'urbanCore',
] as const;

export const roadwayFunctionValues = ['access', 'distributor'] as const;

export const intersectionTypeValues = [
  'signalTwoLane',
  'signalFourLane',
  'signalSixLane',
  'signalEightLane',
] as const;

export const landUseContextOptions = [
  { value: 'rural', label: 'Rural' },
  { value: 'ruralTown', label: 'Rural Town' },
  { value: 'suburban', label: 'Suburban' },
  { value: 'urban', label: 'Urban' },
  { value: 'urbanCore', label: 'Urban Core' },
] as const;

export const roadwayFunctionOptions = [
  { value: 'access', label: 'Access' },
  { value: 'distributor', label: 'Distributor' },
] as const;

export const intersectionTypeOptions = [
  { value: 'signalTwoLane', label: 'Signal - Two Lane' },
  { value: 'signalFourLane', label: 'Signal - Four Lane' },
  { value: 'signalSixLane', label: 'Signal - Six Lane' },
  { value: 'signalEightLane', label: 'Signal - Eight Lane' },
] as const;

export const projectGoalOptions = [
  { name: 'safety', label: 'Safety' },
  { name: 'economic', label: 'Economic' },
  { name: 'environmental', label: 'Environmental' },
  { name: 'social', label: 'Social' },
  { name: 'modeShift', label: 'Mode Shift' },
] as const;

export const projectDetailsSchema = z.object({
  community: z.string(),
  roadwayName: z.string(),
  projectExtents: z.string(),
  corridorLengthMiles: z.string(),
  alternativeName: z.string(),
  canMoveCurbLines: z.boolean(),
  isFreightCorridor: z.boolean(),
  isBusCorridor: z.boolean(),
  existingLandUseContext: z.enum(landUseContextValues, {
    error: 'Select the existing land use context.',
  }),
  plannedLandUseContext: z.enum(landUseContextValues, {
    error: 'Select the planned land use context.',
  }),
  roadwayFunction: z.enum(roadwayFunctionValues, {
    error: 'Select the desired function of the road.',
  }),
  downstreamIntersectionType: z.enum(intersectionTypeValues, {
    error: 'Select the controlling downstream intersection type.',
  }),
  postedSpeedLimitMph: z.string(),
  percentileSpeed85Mph: z.string(),
  averageDailyTraffic: z.string(),
  goals: z.object({
    safety: z.boolean(),
    economic: z.boolean(),
    environmental: z.boolean(),
    social: z.boolean(),
    modeShift: z.boolean(),
  }),
});

export type ProjectDetails = z.infer<typeof projectDetailsSchema>;

export type ProjectDetailsFormValues = Omit<
  ProjectDetails,
  | 'existingLandUseContext'
  | 'plannedLandUseContext'
  | 'roadwayFunction'
  | 'downstreamIntersectionType'
> & {
  existingLandUseContext: ProjectDetails['existingLandUseContext'] | '';
  plannedLandUseContext: ProjectDetails['plannedLandUseContext'] | '';
  roadwayFunction: ProjectDetails['roadwayFunction'] | '';
  downstreamIntersectionType: ProjectDetails['downstreamIntersectionType'] | '';
};

export const defaultProjectDetails: ProjectDetailsFormValues = {
  community: '',
  roadwayName: '',
  projectExtents: '',
  corridorLengthMiles: '',
  alternativeName: '',
  canMoveCurbLines: false,
  isFreightCorridor: false,
  isBusCorridor: false,
  existingLandUseContext: '',
  plannedLandUseContext: '',
  roadwayFunction: '',
  downstreamIntersectionType: '',
  postedSpeedLimitMph: '',
  percentileSpeed85Mph: '',
  averageDailyTraffic: '',
  goals: {
    safety: true,
    economic: true,
    environmental: true,
    social: true,
    modeShift: false,
  },
};
