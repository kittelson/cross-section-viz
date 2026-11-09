import { z } from 'zod'

// ---- Overview (high → low) ----
// Types are listed here as an outline; the schemas they come from are
// defined below, bottom-up, since a schema must exist before it is used.

export type ProjectInputs = z.infer<typeof projectInputsSchema>
export type LandUseContext = z.infer<typeof landUseContextSchema>
export type RoadFunction = z.infer<typeof roadFunctionSchema>
export type CrossSection = z.infer<typeof crossSectionSchema>

// ---- Project inputs ----

export const projectGoalSchema = z.enum([
  'safety',
  'economic',
  'environmental',
  'accessToDestinations',
  'modeShift',
])

export const basicProjectInfoSchema = z.object({
  community: z.string().trim().min(1).max(100),
  roadwayName: z.string().trim().min(1).max(100),
  projectExtents: z.string().trim().min(1).max(100),
  projectCorridorLengthMiles: z.number().int().min(0),
})

export const landUseContextSchema = z.enum([
  'rural',
  'ruralTown',
  'suburban',
  'urban',
  'urbanCore',
])

export const roadFunctionSchema = z.enum(['access', 'distributor'])

export const projectDetailsSchema = z.object({
  canMoveCurbLine: z.boolean(),
  existingLandUseContext: landUseContextSchema,
  plannedLandUseContext: landUseContextSchema,
  desiredFunctionOfRoad: roadFunctionSchema,
  isFreightCorridor: z.boolean(),
  hasFrequentBusActivity: z.boolean(),
})

export const existingConditionsSchema = z.object({
  postedSpeedMph: z.number().int().min(5).max(85).multipleOf(5),
  eightyFifthPercentileSpeedMph: z.number().int().min(5).max(85).multipleOf(5).nullable(),
  aadt: z.number().int().min(0),
})

export const projectGoalsSchema = z.record(projectGoalSchema, z.boolean())

export const backgroundPlanningSchema = z.object({
  climateActionPlan: z.boolean(),
  activeTransportationPlan: z.boolean(),
  longTermTransitServicePlan: z.boolean(),
  safetyActionPlan: z.boolean(),
  completeStreetsPolicy: z.boolean(),
  visionZeroPolicy: z.boolean(),
  freightCorridorPlan: z.boolean(),
})

export const projectInputsSchema = z.object({
  basicProjectInfo: basicProjectInfoSchema,
  projectDetails: projectDetailsSchema,
  existingConditions: existingConditionsSchema,
  projectGoals: projectGoalsSchema,
  backgroundPlanning: backgroundPlanningSchema,
})

// ---- Cross section ----

// Minimal slice of Streetmix's StreetJson (packages/types in streetmix/streetmix).
// Loose objects keep fields we don't model, so a street round-trips intact.
export const streetmixSegmentSchema = z.looseObject({
  type: z.string(),
  variantString: z.string(),
  width: z.number(),
})

export const streetmixStreetSchema = z.looseObject({
  schemaVersion: z.number().int(),
  width: z.number(),
  segments: z.array(streetmixSegmentSchema),
})

export const crossSectionSchema = z.object({
  id: z.uuid(),
  name: z.string().trim().min(1).max(100),
  street: streetmixStreetSchema,
})

