import { useAtom, useAtomValue } from 'jotai';
import { Plus, Trash } from 'lucide-react';
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
import { SuggestedEditsGrid } from '@/components/SuggestedEditsGrid';
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

  const deleteAlternative = useCallback(
    (id: string) => {
      if (window.confirm('Are you sure you want to delete this alternative?')) {
        setAlternatives((current) =>
          current.filter((alternative) => alternative.id !== id),
        );
      }
    },
    [setAlternatives],
  );

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Edit Cross Section
        </h1>
      </div>
      <p className="mt-3 text-muted-foreground">
        Add alternatives and customize their cross sections using the given
        cross section elements. Enter AADT, target speed and other inputs to
        reflect future conditions.
      </p>
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
            aria-label="Add alternative"
            onClick={addAlternative}
          >
            Add Alternative <Plus className="ml-2 h-4 w-4" />
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
            <Button
              type="button"
              variant="destructive"
              aria-label="Delete alternative"
              onClick={() => deleteAlternative(alternative.id)}
            >
              Delete <Trash className="ml-2 h-4 w-4" />
            </Button>
            <StreetEditor />
          </TabsContent>
        ))}
      </Tabs>
      <SuggestedEditsGrid />
      <BottomNavButtons
        backTo={paths.minSafeDimension}
        continueTo={paths.output}
      />
    </div>
  );
}
