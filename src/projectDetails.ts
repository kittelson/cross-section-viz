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
  {
    name: 'safety',
    label: 'Safety',
    description:
      'Safety reflects the level of crash risk and perceived comfort for all roadway users.',
  },
  {
    name: 'economic',
    label: 'Economic',
    description:
      'Economic impact reflects how roadway design influences local business activity, property value, and overall economic vitality.',
  },
  {
    name: 'environmental',
    label: 'Environmental',
    description:
      'Environmental impact reflects how roadway design affects air quality, emissions, energy use, stormwater runoff, and urban heat.',
  },
  {
    name: 'accessToDestinations',
    label: 'Access to destinations',
    description:
      'Access to destinations reflects how safely and conveniently people of all ages, abilities, and incomes can reach jobs, services, and community resources.',
  },
  {
    name: 'modeShift',
    label: 'Mode Shift',
    description:
      'Mode shift reflects the extent to which roadway design encourages travel by walking, bicycling, and transit instead of driving.',
  },
] as const;

export const projectDetailsSchema = z.object({
  community: z.string(),
  roadwayName: z.string(),
  projectExtents: z.string(),
  corridorLengthMiles: z
    .number({ error: 'Enter the project corridor length.' })
    .min(0)
    .optional(),
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
  postedSpeedLimitMph: z
    .number({ error: 'Enter a posted speed limit.' })
    .int({ error: 'Speed limit must be a whole number.' })
    .min(5, { error: 'Speed limit must be at least 5 mph.' })
    .max(90, { error: 'Speed limit must be at most 90 mph.' }),
  percentileSpeed85Mph: z
    .number({ error: 'Enter the 85th percentile speed.' })
    .min(0)
    .optional(),
  averageDailyTraffic: z
    .number({ error: 'Enter an average daily traffic.' })
    .int({ error: 'Average daily traffic must be a whole number.' })
    .min(0)
    .max(1000000),
  goals: z.object({
    safety: z.boolean(),
    economic: z.boolean(),
    environmental: z.boolean(),
    accessToDestinations: z.boolean(),
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
  corridorLengthMiles: undefined,
  alternativeName: '',
  canMoveCurbLines: false,
  isFreightCorridor: false,
  isBusCorridor: false,
  existingLandUseContext: '',
  plannedLandUseContext: '',
  roadwayFunction: '',
  downstreamIntersectionType: '',
  postedSpeedLimitMph: 25,
  percentileSpeed85Mph: undefined,
  averageDailyTraffic: 6000,
  goals: {
    safety: true,
    economic: true,
    environmental: true,
    accessToDestinations: true,
    modeShift: false,
  },
};
