import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { Controller, useForm, type Resolver } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { projectDetailsAtom } from '@/atoms';
import { LabelWithTooltip } from '@/components/LabelWithTooltip';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Community</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Anywhere, USA"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="roadwayName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Roadway Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Main Street"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="projectExtents"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Project Extents
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="1st Avenue to 6th Avenue"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="corridorLengthMiles"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Project Corridor Length
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step="any"
                      placeholder="0.5"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="alternativeName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Alternative Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Alternative 1"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
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
                  <Field data-invalid={fieldState.invalid}>
                    <LabelWithTooltip
                      htmlFor={field.name}
                      label="What is the existing land use context?"
                      tooltip="Refer to Guidebook Chapter 3 for a discussion of applicable land use contexts. This entry is provided for reference but is not used in tool calculations."
                    />
                    <Select
                      value={field.value || undefined}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id={field.name}
                        className="w-full"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select a land use context" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {landUseContextOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="roadwayFunction"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <LabelWithTooltip
                      htmlFor={field.name}
                      label="What is the desired function of the road?"
                      tooltip="Refer to Guidebook Chapter 5 for a discussion on roadway primary function. This selection will not affect minimum safe dimension recommendations but will prompt you to consider appropriate design decisions (e.g., speeds)."
                    />
                    <Select
                      value={field.value || undefined}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id={field.name}
                        className="w-full"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select a roadway function" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {roadwayFunctionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="plannedLandUseContext"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <LabelWithTooltip
                      htmlFor={field.name}
                      label="What is the planned land use context?"
                      tooltip="Refer to Guidebook Chapter 3 for a discussion of applicable land use contexts. This entry is used to provide minimum safe recommendations regarding pedestrian facilities."
                    />
                    <Select
                      value={field.value || undefined}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id={field.name}
                        className="w-full"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select a land use context" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {landUseContextOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="downstreamIntersectionType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      What is the controlling downstream intersection type?
                    </FieldLabel>
                    <Select
                      value={field.value || undefined}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id={field.name}
                        className="w-full"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select an intersection type" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {intersectionTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
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
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        What is the posted speed limit?
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="number"
                        inputMode="numeric"
                        min={0}
                        placeholder="30"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="percentileSpeed85Mph"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        What is the 85th percentile speed (if known)?
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="number"
                        inputMode="decimal"
                        min={0}
                        placeholder="32"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="averageDailyTraffic"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        What is the average daily traffic?
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="number"
                        inputMode="numeric"
                        min={0}
                        placeholder="6000"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </FieldSet>

            <FieldSet>
              <FieldLegend>Project Goals</FieldLegend>
              <div className="grid gap-3">
                {projectGoalOptions.map((goal) => (
                  <Controller
                    key={goal.name}
                    name={`goals.${goal.name}`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        orientation="horizontal"
                        className="justify-between"
                        data-invalid={fieldState.invalid}
                      >
                        <FieldLabel htmlFor={`goal-${goal.name}`}>
                          {goal.label}
                        </FieldLabel>
                        <Checkbox
                          id={`goal-${goal.name}`}
                          checked={field.value}
                          onCheckedChange={(checked) =>
                            field.onChange(checked === true)
                          }
                          aria-invalid={fieldState.invalid}
                        />
                      </Field>
                    )}
                  />
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
