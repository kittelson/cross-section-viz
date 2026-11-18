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
      {/* add a new component here called SuggestedEdits 
        it can be a a grid of cards that each have a collapsed and expanded view.
        when expanded they show some lorem ipsum text. each card can have an icon related to its relevant mode (bike, ped, car, lamp), a title.
        on the bottom is a row of 5 scores that correspond to the project goals. they should have an
        icon, a small label, and a score from -3 to 3. 3 can be 3 green boxes in a col. 0 can be a gray dash, -2 can be 2 red outlined
        boxes in a col going into negative territory. -3 can be 3 red outlined boxes in a col going into negative territory. etc.
        only show scores for goals that the person selected to show in the project goals section.
        at the top there should be a sort by score select that lists total, environment, safety, etc. and a button for asc and desc.
        the cards can then be sorted by score with positive to negative with no impact and mixed in the middle.
        the grid can have a suggested edits header that says "Suggested Edits"
        there can be a down chevron icon at the right side of each card that when clicked expands the card. when clicked again it collapses the card.
        there can also be a expand all button and a collapse all btn.
        instead of the checkmark in the upper right, let's use a pill with a checkmark inside that says "Applied" when someone
        has added that edit to the cross section. for now the logic for determining that can be a placeholder.

        the suggestions can be those that are in the suggested edits dialog. 
        */}
      <BottomNavButtons
        backTo={paths.minSafeDimension}
        continueTo={paths.output}
      />
    </div>
  );
}
