import { z } from 'zod'

// ---- Overview (high → low) ----
// Types are listed here as an outline; the schemas they come from are
// defined below, bottom-up, since a schema must exist before it is used.

export type Analysis = z.infer<typeof analysisSchema>

// Project outputs are a view of the analysis, not a separate copy.
export type ProjectOutputs = Pick<
  Analysis,
  'existing' | 'alternatives' | 'measureGoalMatrix' | 'capacityAnalysis'
>

export type ProjectInputs = z.infer<typeof projectInputsSchema>
export type LandUseContext = z.infer<typeof landUseContextSchema>
export type RoadFunction = z.infer<typeof roadFunctionSchema>
export type CrossSection = z.infer<typeof crossSectionSchema>
export type MeasureGoalMatrix = z.infer<typeof measureGoalMatrixSchema>
export type MeasureGoalCell = z.infer<typeof measureGoalCellSchema>
export type MeasureValue = z.infer<typeof measureValueSchema>
export type MeasureEffect = z.infer<typeof measureEffectSchema>
export type Measure = z.infer<typeof measureSchema>
export type CapacityAnalysis = z.infer<typeof capacityAnalysisSchema>

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
  eightyFifthPercentileSpeedMph: z
    .number()
    .int()
    .min(5)
    .max(85)
    .multipleOf(5)
    .nullable(),
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

// ---- Measure × goal matrix ----

// Rows of the measure × goal matrix
export const measureSchema = z.enum([
  'addBusLanes',
  'removeBikeLanes',
  'widenBikeLanes',
  'removePedestrianInfrastructure',
  'addPedestrianInfrastructure',
  'removeTravelLanes',
  'narrowTravelLanes',
  'addParking',
])

// TODO: replace with an enum of glyph meanings; the UI maps each to an icon
export const glyphSchema = z.string()

export const measureEffectSchema = z.enum([
  'lowAdverseEffect',
  'mediumAdverseEffect',
  'highAdverseEffect',
  'lowPositiveEffect',
  'mediumPositiveEffect',
  'highPositiveEffect',
  'noSignificantEffect',
])

export const measureValueSchema = z.object({
  effect: measureEffectSchema,
  value: z.string(),
})

// One cell: the glyphs shown in suggested edits, and the values shown
// in the impact summary.
export const measureGoalCellSchema = z.object({
  values: z.array(measureValueSchema).min(1).max(2),
  valueGlyphs: z.array(glyphSchema).min(1).max(2),
})

// Measure × goal matrix for one cross-section, read as matrix[measure]?.[goal]
export const measureGoalMatrixSchema = z.partialRecord(
  measureSchema,
  z.partialRecord(projectGoalSchema, measureGoalCellSchema),
)

// ---- Capacity analysis ----

export const downstreamIntersectionSchema = z.enum([
  'signalTwoLane',
  'signalFourLane',
  'signalSixLane',
  'signalEightLane',
])

// Capacity results for one cross-section. Percents are stored as fractions
// (0.25 = 25%), as in Excel.
export const capacityAnalysisSchema = z.object({
  aadt: z.number().int().min(0),
  controllingDownstreamIntersection: downstreamIntersectionSchema,
  dFactor: z.number().nonnegative(),
  gcRatio: z.number().nonnegative().min(0).max(1),
  maxDCRatio: z.number().nonnegative().min(0).max(1),
  efficiency16hr: z.number().min(0).max(1), // percent
  excessCapacity16hr: z.number(),
  ttlHoursBelowCapacity: z.number().min(0).max(24),
})

// ---- Analysis ----

// Units: lengths in feet, speeds in mph. Convert only at the Streetmix boundary.
// A step is null until the user completes it.
export const analysisSchema = z.object({
  id: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  projectInputs: projectInputsSchema.nullable(),
  existing: crossSectionSchema.nullable(),
  // Existing right of way minus a value TBD
  minimumSafeDimensionFt: z.number().nonnegative().nullable(),
  alternatives: z.array(crossSectionSchema),
  // Suggested edits (glyphs) and impact summary (values).
  // Keyed by cross-section id (existing or an alternative)
  measureGoalMatrix: z.record(z.uuid(), measureGoalMatrixSchema),
  // Keyed by cross-section id (existing or an alternative)
  capacityAnalysis: z.record(z.uuid(), capacityAnalysisSchema),
})
