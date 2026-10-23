import { useAtom } from 'jotai';
import { capacityResultsById, type CapacityScenario } from '@/capacity';
import { capacityScenariosAtom } from '@/atoms';
import { ExportAnalysisDialog } from '@/components/ExportAnalysisDialog';
import { LabelWithTooltip } from '@/components/LabelWithTooltip';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { intersectionTypeOptions } from '@/projectDetails';

function updateScenario(
  scenarios: CapacityScenario[],
  id: string,
  patch: Partial<CapacityScenario>,
) {
  return scenarios.map((scenario) =>
    scenario.id === id ? { ...scenario, ...patch } : scenario,
  );
}

export function CapacityTab() {
  const [scenarios, setScenarios] = useAtom(capacityScenariosAtom);

  return (
    <div>
      <div className="grid gap-8 md:grid-cols-2">
        {scenarios.map((scenario) => {
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
              <Field>
                <FieldLabel htmlFor={`${scenario.id}-adt`}>ADT</FieldLabel>
                <Input
                  id={`${scenario.id}-adt`}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={scenario.averageDailyTraffic}
                  onChange={(event) =>
                    setScenarios((current) =>
                      updateScenario(current, scenario.id, {
                        averageDailyTraffic: event.target.value,
                      }),
                    )
                  }
                />
              </Field>
              <Field>
                <FieldLabel htmlFor={`${scenario.id}-intersection`}>
                  Controlling Downstream Intersection
                </FieldLabel>
                <Select
                  value={scenario.downstreamIntersectionType || undefined}
                  onValueChange={(value) =>
                    setScenarios((current) =>
                      updateScenario(current, scenario.id, {
                        downstreamIntersectionType:
                          value as CapacityScenario['downstreamIntersectionType'],
                      }),
                    )
                  }
                >
                  <SelectTrigger
                    id={`${scenario.id}-intersection`}
                    className="w-full"
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
              </Field>
              <Field>
                <LabelWithTooltip
                  htmlFor={`${scenario.id}-d-factor`}
                  label="D Factor"
                  tooltip="The D factor is the percentage of the peak hour travel in the peak direction."
                />
                <Input
                  id={`${scenario.id}-d-factor`}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={1}
                  step="0.01"
                  value={scenario.dFactor}
                  onChange={(event) =>
                    setScenarios((current) =>
                      updateScenario(current, scenario.id, {
                        dFactor: event.target.value,
                      }),
                    )
                  }
                />
              </Field>
              <Field>
                <LabelWithTooltip
                  htmlFor={`${scenario.id}-gc-ratio`}
                  label="g/C Ratio"
                  tooltip="The g/C ratio is the proportion of cycle time given to the through movement of interest"
                />
                <Input
                  id={`${scenario.id}-gc-ratio`}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={1}
                  step="0.01"
                  value={scenario.gcRatio}
                  onChange={(event) =>
                    setScenarios((current) =>
                      updateScenario(current, scenario.id, {
                        gcRatio: event.target.value,
                      }),
                    )
                  }
                />
              </Field>
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
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t pt-6">
        <ExportAnalysisDialog triggerClassName="border hover:bg-muted" />
      </div>
    </div>
  );
}
