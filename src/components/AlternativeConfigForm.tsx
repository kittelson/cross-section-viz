import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { projectDetailsAtom } from '@/atoms';
import {
  alternativeConfigSchema,
  type AlternativeConfigFormValues,
} from '@/alternativeConfig';
import { NumberField } from '@/components/ui/number-field';
import { TextField } from '@/components/ui/text-field';
import { YesNoField } from '@/components/ui/yes-no-field';

export function AlternativeConfigForm({
  value,
  onChange,
}: {
  value: AlternativeConfigFormValues;
  onChange: (value: AlternativeConfigFormValues) => void;
}) {
  const projectDetails = useAtomValue(projectDetailsAtom);
  const form = useForm<AlternativeConfigFormValues>({
    resolver: zodResolver(alternativeConfigSchema),
    mode: 'onBlur',
    defaultValues: value,
  });

  useEffect(() => {
    const subscription = form.watch(() => {
      onChange(form.getValues());
    });
    return () => subscription.unsubscribe();
  }, [form, onChange]);

  return (
    <form
      className="grid items-start gap-x-4 gap-y-3 sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-[minmax(0,1.5fr)]"
      noValidate
    >
      <div className="sm:col-span-2 lg:col-span-1">
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
      </div>
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
      {projectDetails.percentileSpeed85Mph != null ? (
        <Controller
          name="eightyFifthPctSpeedMph"
          control={form.control}
          render={({ field, fieldState }) => (
            <NumberField
              name={field.name}
              label="Target 85th pct speed"
              endAdornment="mph"
              value={field.value}
              invalid={fieldState.invalid}
              error={fieldState.error}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
      ) : null}
      <Controller
        name="hasParallelBikeFacility"
        control={form.control}
        render={({ field, fieldState }) => (
          <YesNoField
            name={field.name}
            label="Parallel bike facility?"
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
            label="Average daily traffic"
            endAdornment="veh/day"
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
