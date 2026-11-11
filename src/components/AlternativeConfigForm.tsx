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

export function AlternativeConfigForm() {
  const [projectDetails] = useAtom(projectDetailsAtom);
  const form = useForm<AlternativeConfigFormValues>({
    resolver: zodResolver(alternativeConfigSchema),
    mode: 'onBlur',
    defaultValues: {
      postedSpeedLimitMph: projectDetails.postedSpeedLimitMph,
      hasParallelBikeFacility: false,
      averageDailyTraffic: projectDetails.averageDailyTraffic || 6000,
    },
  });

  return (
    <form className="space-y-4" noValidate>
      <Controller
        name="postedSpeedLimitMph"
        control={form.control}
        render={({ field, fieldState }) => (
          <NumberField
            name={field.name}
            label="What is the posted speed limit?"
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
