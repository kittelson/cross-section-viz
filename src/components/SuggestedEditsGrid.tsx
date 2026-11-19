import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { projectDetailsAtom } from '@/atoms';
import { SuggestedEditCard } from '@/components/SuggestedEditCard';
import { Carousel } from '@/components/ui/carousel';
import { projectGoalOptions } from '@/projectDetails';
import {
  getSuggestedEditTotalScore,
  suggestedEditRows,
  type ImpactGoalKey,
} from '@/suggestedEdits';

function getSelectedGoals(goals: Record<ImpactGoalKey, boolean>) {
  return projectGoalOptions
    .map((goal) => goal.name)
    .filter((goal) => goals[goal]);
}

export function SuggestedEditsGrid() {
  const projectDetails = useAtomValue(projectDetailsAtom);
  const selectedGoals = useMemo(
    () => getSelectedGoals(projectDetails.goals),
    [projectDetails.goals],
  );

  const rankedRows = useMemo(() => {
    return suggestedEditRows
      .filter((row) => getSuggestedEditTotalScore(row, selectedGoals) > 0)
      .sort((left, right) => {
        return (
          getSuggestedEditTotalScore(right, selectedGoals) -
          getSuggestedEditTotalScore(left, selectedGoals)
        );
      });
  }, [selectedGoals]);

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight">Suggested Edits</h2>

      {selectedGoals.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Select at least one project goal on the Project Details page to see
          scored suggested edits.
        </p>
      ) : rankedRows.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          No suggested edits have a positive score for the selected project
          goals.
        </p>
      ) : (
        <Carousel
          className="mt-4"
          items={rankedRows}
          getKey={(row) => row.measure}
          previousLabel="Previous suggested edits"
          nextLabel="Next suggested edits"
          pagesLabel="Suggested edits pages"
          renderItem={(row, index) => (
            <SuggestedEditCard
              row={row}
              selectedGoals={selectedGoals}
              applied={index === 0}
            />
          )}
        />
      )}
    </section>
  );
}
