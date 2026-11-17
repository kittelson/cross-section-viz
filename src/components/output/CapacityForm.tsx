import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useMemo } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import {
  alternativesAtom,
  capacityScenariosAtom,
  projectDetailsAtom,
} from '@/atoms';
import {
  buildCapacityScenarios,
  capacityFormSchema,
  getCapacityResults,
  type CapacityFormValues,
} from '@/capacity';
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
  const alternatives = useAtomValue(alternativesAtom);
  const projectDetails = useAtomValue(projectDetailsAtom);
  const [scenarios, setScenarios] = useAtom(capacityScenariosAtom);
  const structureKey = useMemo(
    () =>
      ['existing', ...alternatives.map((alternative) => alternative.id)].join(
        '|',
      ),
    [alternatives],
  );
  const labelsKey = useMemo(
    () =>
      alternatives
        .map(
          (alternative) => `${alternative.id}:${alternative.alternativeName}`,
        )
        .join('|'),
    [alternatives],
  );

  const form = useForm<CapacityFormValues>({
    resolver: zodResolver(capacityFormSchema),
    mode: 'onBlur',
    defaultValues: {
      scenarios: buildCapacityScenarios(
        alternatives,
        projectDetails,
        scenarios,
      ),
    },
  });
  const formScenarios = useWatch({
    control: form.control,
    name: 'scenarios',
  });

  useEffect(() => {
    const next = buildCapacityScenarios(
      alternatives,
      projectDetails,
      form.getValues('scenarios'),
    );
    form.reset({ scenarios: next });
    setScenarios(next);
  }, [structureKey]); // eslint-disable-line react-hooks/exhaustive-deps -- rebuild only when scenario ids change

  useEffect(() => {
    alternatives.forEach((alternative) => {
      const index = form
        .getValues('scenarios')
        .findIndex((scenario) => scenario.id === alternative.id);
      if (index === -1) {
        return;
      }
      form.setValue(`scenarios.${index}.label`, alternative.alternativeName, {
        shouldDirty: false,
      });
    });
  }, [form, labelsKey, alternatives]);

  useEffect(() => {
    if (!formScenarios?.length) {
      return;
    }

    setScenarios(form.getValues('scenarios'));
  }, [form, formScenarios, setScenarios]);

  return (
    <form className="flex gap-8 overflow-x-auto" noValidate>
      {(formScenarios ?? scenarios).map((scenario, index) => {
        const results = getCapacityResults(scenario.id);

        return (
          <section
            key={scenario.id}
            className="min-w-80 flex-1 flex-shrink-0 space-y-4"
          >
            <div>
              <h2 className="text-lg font-medium">{scenario.label}</h2>
            </div>
            <Controller
              name={`scenarios.${index}.averageDailyTraffic`}
              control={form.control}
              render={({ field, fieldState }) => (
                <NumberField
                  name={field.name}
                  label="ADT"
                  endAdornment="vehicles per day"
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
            <div>
              <h3 className="mb-2 font-medium">Analysis Results</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-normal">Measure</TableHead>
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
          </section>
        );
      })}
    </form>
  );
}
