import { z } from 'zod'

// ---- Overview (high → low) ----
// Types are listed here as an outline; the schemas they come from are
// defined below, bottom-up, since a schema must exist before it is used.

export type ProjectInputs = z.infer<typeof projectInputsSchema>
export type LandUseContext = z.infer<typeof landUseContextSchema>
export type RoadFunction = z.infer<typeof roadFunctionSchema>

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

