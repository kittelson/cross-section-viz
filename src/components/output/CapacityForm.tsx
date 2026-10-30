import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import {
  capacityFormSchema,
  capacityResultsById,
  type CapacityFormValues,
} from '@/capacity';
import { capacityScenariosAtom } from '@/atoms';
import { NumberField } from '@/components/ui/number-field';
import { SelectField } from '@/components/ui/select-field';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { intersectionTypeOptions } from '@/projectDetails';

export function CapacityForm() {
  const [scenarios, setScenarios] = useAtom(capacityScenariosAtom);
  const form = useForm<CapacityFormValues>({
    resolver: zodResolver(capacityFormSchema),
    mode: 'onBlur',
    defaultValues: { scenarios },
  });
  const formScenarios = useWatch({
    control: form.control,
    name: 'scenarios',
  });

  useEffect(() => {
    if (!formScenarios?.length) {
      return;
    }

    setScenarios(form.getValues('scenarios'));
  }, [form, formScenarios, setScenarios]);

  return (
    <form className="grid gap-8 md:grid-cols-2" noValidate>
      {(formScenarios ?? scenarios).map((scenario, index) => {
        const results = capacityResultsById[scenario.id];

        return (
          <section key={scenario.id} className="space-y-4">
            <div>
              <h2 className="text-lg font-medium">{scenario.label}</h2>
              <p className="mt-1 text-muted-foreground">
                Verify that the inputs are correct. When complete, press the
                calculate button to generate results.
              </p>
            </div>
            <Controller
              name={`scenarios.${index}.averageDailyTraffic`}
              control={form.control}
              render={({ field, fieldState }) => (
                <NumberField
                  name={field.name}
                  label="ADT"
                  value={field.value}
                  invalid={fieldState.invalid}
                  error={fieldState.error}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
            <Controller
              name={`scenarios.${index}.downstreamIntersectionType`}
              control={form.control}
              render={({ field, fieldState }) => (
                <SelectField
                  name={field.name}
                  label="Controlling Downstream Intersection"
                  placeholder="Select an intersection type"
                  value={field.value}
                  invalid={fieldState.invalid}
                  error={fieldState.error}
                  options={intersectionTypeOptions}
                  onValueChange={field.onChange}
                />
              )}
            />
            <Controller
              name={`scenarios.${index}.dFactor`}
              control={form.control}
              render={({ field, fieldState }) => (
                <NumberField
                  name={field.name}
                  label="D Factor"
                  tooltip="The D factor is the percentage of the peak hour travel in the peak direction."
                  value={field.value}
                  invalid={fieldState.invalid}
                  error={fieldState.error}
                  inputMode="decimal"
                  max={1}
                  step="0.01"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
            <Controller
              name={`scenarios.${index}.gcRatio`}
              control={form.control}
              render={({ field, fieldState }) => (
                <NumberField
                  name={field.name}
                  label="g/C Ratio"
                  tooltip="The g/C ratio is the proportion of cycle time given to the through movement of interest"
                  value={field.value}
                  invalid={fieldState.invalid}
                  error={fieldState.error}
                  inputMode="decimal"
                  max={1}
                  step="0.01"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
            {results ? (
              <div>
                <h3 className="mb-2 font-medium">Analysis Results</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-normal">
                        Measure
                      </TableHead>
                      <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="whitespace-normal">
                        Maximum peak hour volume-to-capacity (d/c) ratio
                      </TableCell>
                      <TableCell className="text-right">
                        {results.peakHourDcRatio}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="whitespace-normal">
                        16-hour efficiency
                      </TableCell>
                      <TableCell className="text-right">
                        {results.sixteenHourEfficiency}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="whitespace-normal">
                        16-hour excess capacity
                      </TableCell>
                      <TableCell className="text-right">
                        {results.sixteenHourExcessCapacity}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="whitespace-normal">
                        Total hours below capacity
                      </TableCell>
                      <TableCell className="text-right">
                        {results.hoursBelowCapacity}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            ) : null}
          </section>
        );
      })}
    </form>
  );
}
