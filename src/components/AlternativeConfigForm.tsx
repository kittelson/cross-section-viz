import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { Controller, useForm } from 'react-hook-form';
import { projectDetailsAtom } from '@/atoms';
import {
  alternativeConfigSchema,
  type AlternativeConfigFormValues,
} from '@/alternativeConfig';
import { NumberField } from '@/components/ui/number-field';
import { YesNoField } from '@/components/ui/yes-no-field';
import { TextField } from './ui/text-field';

export function AlternativeConfigForm() {
  const [projectDetails] = useAtom(projectDetailsAtom);
  const form = useForm<AlternativeConfigFormValues>({
    resolver: zodResolver(alternativeConfigSchema),
    mode: 'onBlur',
    defaultValues: {
      alternativeName: 'Alternative 1',
      postedSpeedLimitMph: projectDetails.postedSpeedLimitMph,
      hasParallelBikeFacility: false,
      averageDailyTraffic: projectDetails.averageDailyTraffic || 6000,
    },
  });

  return (
    <form className="flex flex-col gap-4" noValidate>
      <Controller
        name="alternativeName"
        control={form.control}
        render={({ field, fieldState }) => (
          <TextField
            name={field.name}
            label="Alternative name"
            value={field.value}
            invalid={fieldState.invalid}
            error={fieldState.error}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="postedSpeedLimitMph"
        control={form.control}
        render={({ field, fieldState }) => (
          <NumberField
            name={field.name}
            label="Posted speed limit"
            endAdornment="mph"
            step={5}
            min={5}
            max={90}
            value={field.value}
            invalid={fieldState.invalid}
            error={fieldState.error}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />
      {/* if the user entered 85th percentile speed on the project details page, show this field */}
      {projectDetails.percentileSpeed85Mph && (
        <Controller
          name="eightyFifthPctSpeedMph"
          control={form.control}
          render={({ field, fieldState }) => (
            <NumberField
              name={field.name}
              label="Target 85th percentile speed"
              value={field.value}
              invalid={fieldState.invalid}
              error={fieldState.error}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
      )}
      <Controller
        name="hasParallelBikeFacility"
        control={form.control}
        render={({ field, fieldState }) => (
          <YesNoField
            name={field.name}
            label="Is there a parallel bike facility?"
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
            value={field.value}
            invalid={fieldState.invalid}
            error={fieldState.error}
            onChange={field.onChange}
          />
        )}
      />
    </form>
  );
}
