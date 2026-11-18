import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { roadwayRightOfWayFtAtom } from '@/atoms';
import { BottomNavButtons } from '@/components/BottomNavButtons';
import { StreetEditor } from '@/components/StreetEditor';
import { Controller, useForm, type Resolver } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { crossSectionLocationAtom } from '@/atoms';
import { CrossSectionLocationMap } from '@/components/CrossSectionLocationMap';
import { NumberField } from '@/components/ui/number-field';
import {
  existingCrossSectionSchema,
  type ExistingCrossSectionFormValues,
} from '@/existingCrossSection';
import existingCrossSection from '@/images/streetmixPlaceholders/existing.png';
import { paths } from '@/paths';

export function ExistingCrossSectionPage() {
  const navigate = useNavigate();
  const [rightOfWay, setRightOfWay] = useAtom(roadwayRightOfWayFtAtom);
  const [location, setLocation] = useAtom(crossSectionLocationAtom);

  const form = useForm<ExistingCrossSectionFormValues>({
    resolver: zodResolver(
      existingCrossSectionSchema,
    ) as Resolver<ExistingCrossSectionFormValues>,
    defaultValues: {
      rightOfWayFt: rightOfWay,
      location,
    },
  });

  function onSubmit(values: ExistingCrossSectionFormValues) {
    if (values.rightOfWayFt == null || values.location == null) {
      return;
    }

    setRightOfWay(values.rightOfWayFt);
    setLocation(values.location);
    navigate(paths.projectDetails);
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Existing Cross Section
      </h1>
      <p className="mt-2 max-w-5xl text-muted-foreground">
        Use the widgets below to build your existing cross section.
      </p>

      <form className="mt-6" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="max-w-40">
          <Controller
            name="rightOfWayFt"
            control={form.control}
            render={({ field, fieldState }) => (
              <NumberField
                name={field.name}
                label="Right-of-way"
                min={1}
                inputMode="decimal"
                step="any"
                endAdornment="ft"
                value={field.value}
                invalid={fieldState.invalid}
                error={fieldState.error}
                onChange={(nextValue) => {
                  field.onChange(nextValue);
                  setRightOfWay(nextValue);
                }}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>

        <img
          src={existingCrossSection}
          alt="Existing roadway cross section"
          className="mt-6 w-full"
        />

        <Controller
          name="location"
          control={form.control}
          render={({ field, fieldState }) => (
            <CrossSectionLocationMap
              value={field.value}
              onChange={(nextLocation) => {
                field.onChange(nextLocation);
                setLocation(nextLocation);
              }}
              invalid={fieldState.invalid}
              error={fieldState.error}
            />
          )}
        />
        <StreetEditor className="mt-6" />
        <BottomNavButtons backTo={paths.home} continueSubmit />
      </form>
    </div>
  );
}
