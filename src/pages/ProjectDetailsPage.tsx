import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { Controller, useForm, type Resolver } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { projectDetailsAtom } from '@/atoms';
import { Button } from '@/components/ui/button';
import { CheckboxField } from '@/components/ui/checkbox-field';
import { FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field';
import { NumberField } from '@/components/ui/number-field';
import { SelectField } from '@/components/ui/select-field';
import { TextField } from '@/components/ui/text-field';
import { YesNoField } from '@/components/ui/yes-no-field';
import { paths } from '@/paths';
import {
  defaultProjectDetails,
  intersectionTypeOptions,
  landUseContextOptions,
  projectDetailsSchema,
  projectGoalOptions,
  roadwayFunctionOptions,
  type ProjectDetailsFormValues,
} from '@/projectDetails';

export function ProjectDetailsPage() {
  const [projectDetails, setProjectDetails] = useAtom(projectDetailsAtom);
  const navigate = useNavigate();

  const form = useForm<ProjectDetailsFormValues>({
    resolver: zodResolver(
      projectDetailsSchema,
    ) as Resolver<ProjectDetailsFormValues>,
    defaultValues: projectDetails,
  });

  function onSubmit(values: ProjectDetailsFormValues) {
    setProjectDetails(values);
    navigate(paths.minSafeDimension);
  }

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-semibold tracking-tight">Project Details</h1>
      <p className="mt-2 text-muted-foreground">
        Enter project information and goals.
      </p>

      <form className="mt-8" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="gap-10">
          <FieldSet>
            <FieldLegend>Basic Project Information</FieldLegend>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Controller
                name="community"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    name={field.name}
                    label="Community"
                    placeholder="Anywhere, USA"
                    value={field.value}
                    invalid={fieldState.invalid}
                    error={fieldState.error}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="roadwayName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    name={field.name}
                    label="Roadway Name"
                    placeholder="Main Street"
                    value={field.value}
                    invalid={fieldState.invalid}
                    error={fieldState.error}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="projectExtents"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    name={field.name}
                    label="Project Extents"
                    placeholder="1st Avenue to 6th Avenue"
                    value={field.value}
                    invalid={fieldState.invalid}
                    error={fieldState.error}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="corridorLengthMiles"
                control={form.control}
                render={({ field, fieldState }) => (
                  <NumberField
                    name={field.name}
                    label="Project Corridor Length"
                    placeholder="0.5"
                    inputMode="decimal"
                    step="any"
                    value={field.value}
                    invalid={fieldState.invalid}
                    error={fieldState.error}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="alternativeName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    name={field.name}
                    label="Alternative Name"
                    placeholder="Alternative 1"
                    value={field.value}
                    invalid={fieldState.invalid}
                    error={fieldState.error}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </FieldSet>

          <FieldSet>
            <FieldLegend>Project Details</FieldLegend>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Controller
                name="canMoveCurbLines"
                control={form.control}
                render={({ field, fieldState }) => (
                  <YesNoField
                    name={field.name}
                    label="Can you move curb lines?"
                    tooltip="Can you move curb lines (reconstruction) or must you stay within the existing curb lines (repaving)?"
                    value={field.value}
                    invalid={fieldState.invalid}
                    error={fieldState.error}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="isFreightCorridor"
                control={form.control}
                render={({ field, fieldState }) => (
                  <YesNoField
                    name={field.name}
                    label="Is this a freight corridor?"
                    tooltip="Used to adjust lane widths. Click on freight cell for further definition."
                    value={field.value}
                    invalid={fieldState.invalid}
                    error={fieldState.error}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="isBusCorridor"
                control={form.control}
                render={({ field, fieldState }) => (
                  <YesNoField
                    name={field.name}
                    label="Is there frequent bus activity on this corridor?"
                    tooltip="Used to adjust lane widths. Click on bus cell for further definition."
                    value={field.value}
                    invalid={fieldState.invalid}
                    error={fieldState.error}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="existingLandUseContext"
                control={form.control}
                render={({ field, fieldState }) => (
                  <SelectField
                    name={field.name}
                    label="What is the existing land use context?"
                    tooltip="Refer to Guidebook Chapter 3 for a discussion of applicable land use contexts. This entry is provided for reference but is not used in tool calculations."
                    placeholder="Select a land use context"
                    value={field.value}
                    invalid={fieldState.invalid}
                    error={fieldState.error}
                    options={landUseContextOptions}
                    onValueChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="roadwayFunction"
                control={form.control}
                render={({ field, fieldState }) => (
                  <SelectField
                    name={field.name}
                    label="What is the desired function of the road?"
                    tooltip="Refer to Guidebook Chapter 5 for a discussion on roadway primary function. This selection will not affect minimum safe dimension recommendations but will prompt you to consider appropriate design decisions (e.g., speeds)."
                    placeholder="Select a roadway function"
                    value={field.value}
                    invalid={fieldState.invalid}
                    error={fieldState.error}
                    options={roadwayFunctionOptions}
                    onValueChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="plannedLandUseContext"
                control={form.control}
                render={({ field, fieldState }) => (
                  <SelectField
                    name={field.name}
                    label="What is the planned land use context?"
                    tooltip="Refer to Guidebook Chapter 3 for a discussion of applicable land use contexts. This entry is used to provide minimum safe recommendations regarding pedestrian facilities."
                    placeholder="Select a land use context"
                    value={field.value}
                    invalid={fieldState.invalid}
                    error={fieldState.error}
                    options={landUseContextOptions}
                    onValueChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="downstreamIntersectionType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <SelectField
                    name={field.name}
                    label="What is the controlling downstream intersection type?"
                    placeholder="Select an intersection type"
                    value={field.value}
                    invalid={fieldState.invalid}
                    error={fieldState.error}
                    options={intersectionTypeOptions}
                    onValueChange={field.onChange}
                  />
                )}
              />
            </div>
          </FieldSet>

          <div className="grid gap-10 lg:grid-cols-2">
            <FieldSet>
              <FieldLegend>Existing Condition & Data</FieldLegend>
              <div className="grid gap-4">
                <Controller
                  name="postedSpeedLimitMph"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <NumberField
                      name={field.name}
                      label="What is the posted speed limit?"
                      placeholder="30"
                      value={field.value}
                      invalid={fieldState.invalid}
                      error={fieldState.error}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Controller
                  name="percentileSpeed85Mph"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <NumberField
                      name={field.name}
                      label="What is the 85th percentile speed (if known)?"
                      placeholder="32"
                      inputMode="decimal"
                      value={field.value}
                      invalid={fieldState.invalid}
                      error={fieldState.error}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Controller
                  name="averageDailyTraffic"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <NumberField
                      name={field.name}
                      label="What is the average daily traffic?"
                      placeholder="6000"
                      value={field.value}
                      invalid={fieldState.invalid}
                      error={fieldState.error}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </FieldSet>

            <FieldSet>
              <FieldLegend>Project Goals</FieldLegend>
              <div className="grid gap-3">
                {projectGoalOptions.map((goal) => (
                  <div
                    key={goal.name}
                    className="cursor-pointer rounded-lg border p-2 hover:bg-muted/50"
                  >
                    <Controller
                      name={`goals.${goal.name}`}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <CheckboxField
                          name={field.name}
                          label={goal.label}
                          value={field.value}
                          invalid={fieldState.invalid}
                          error={fieldState.error}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                ))}
              </div>
            </FieldSet>
          </div>
        </FieldGroup>

        <div className="mt-8 flex gap-2">
          <Button type="submit">Continue</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset(defaultProjectDetails);
              setProjectDetails({
                ...defaultProjectDetails,
                goals: { ...defaultProjectDetails.goals },
              });
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
