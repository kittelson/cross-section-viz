import { useAtom, useAtomValue } from 'jotai';
import { Plus } from 'lucide-react';
import { useCallback } from 'react';
import {
  createAlternativeConfig,
  nextAlternativeName,
  type AlternativeConfigFormValues,
} from '@/alternativeConfig';
import {
  activeAlternativeIdAtom,
  alternativesAtom,
  projectDetailsAtom,
} from '@/atoms';
import { AlternativeConfigForm } from '@/components/AlternativeConfigForm';
import { BottomNavButtons } from '@/components/BottomNavButtons';
import { StreetEditor } from '@/components/StreetEditor';
import { SuggestedEditsDialog } from '@/components/SuggestedEditsDialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { paths } from '@/paths';

export function EditCrossSectionPage() {
  const projectDetails = useAtomValue(projectDetailsAtom);
  const [alternatives, setAlternatives] = useAtom(alternativesAtom);
  const [activeAlternativeId, setActiveAlternativeId] = useAtom(
    activeAlternativeIdAtom,
  );
  const activeAlternative =
    alternatives.find(
      (alternative) => alternative.id === activeAlternativeId,
    ) ?? alternatives[0];

  const updateAlternative = useCallback(
    (next: AlternativeConfigFormValues) => {
      setAlternatives((current) =>
        current.map((alternative) =>
          alternative.id === next.id ? next : alternative,
        ),
      );
    },
    [setAlternatives],
  );

  function addAlternative() {
    const next = createAlternativeConfig(
      nextAlternativeName(alternatives),
      projectDetails,
    );
    setAlternatives((current) => [...current, next]);
    setActiveAlternativeId(next.id);
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Cross Section Creator
        </h1>
        <SuggestedEditsDialog />
      </div>
      <ol className="mt-3 grid list-decimal gap-x-10 gap-y-1 pl-5 text-muted-foreground lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-2">
        <li>
          Review the suggested edits (top right) for changes that support your
          goals.
        </li>
        <li>
          Starting from the minimum safe dimension, add elements until you reach
          the right-of-way.
        </li>
        <li>Hover over an element to see its recommended width.</li>
        <li>
          Update the inputs above the editor to reflect future conditions.
        </li>
      </ol>

      <Tabs
        value={activeAlternative?.id}
        onValueChange={setActiveAlternativeId}
        className="mt-5 gap-0"
      >
        <div className="flex flex-wrap items-center gap-2">
          <TabsList variant="line" className="h-auto flex-wrap">
            {alternatives.map((alternative) => (
              <TabsTrigger key={alternative.id} value={alternative.id}>
                {alternative.alternativeName}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Add alternative"
            onClick={addAlternative}
          >
            <Plus />
          </Button>
        </div>

        {alternatives.map((alternative) => (
          <TabsContent
            key={alternative.id}
            value={alternative.id}
            className="mt-1 space-y-3 rounded-lg border bg-muted/30 p-3"
          >
            <AlternativeConfigForm
              value={alternative}
              onChange={updateAlternative}
            />
            <StreetEditor />
          </TabsContent>
        ))}
      </Tabs>

      <BottomNavButtons
        backTo={paths.minSafeDimension}
        continueTo={paths.output}
      />
    </div>
  );
}
