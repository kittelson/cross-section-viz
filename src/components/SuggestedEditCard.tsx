import { Check } from 'lucide-react';
import { GoalEffectsDetails } from '@/components/GoalEffectsDetails';
import {
  GoalEffectsSummary,
  type GoalEffect,
} from '@/components/GoalEffectsSummary';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { measureModeIcons } from '@/lib/iconHelpers';
import { projectGoalOptions } from '@/projectDetails';
import {
  getSuggestedEditMode,
  isPositiveImpactGrade,
  type ImpactGoalKey,
  type SuggestedEditRow,
} from '@/suggestedEdits';

function getGoalEffects(
  row: SuggestedEditRow,
  selectedGoals: ImpactGoalKey[],
): GoalEffect[] {
  return selectedGoals.flatMap((goal) => {
    const label =
      projectGoalOptions.find((option) => option.name === goal)?.label ?? goal;
    return row[goal].map((effect) => ({ goal, label, effect }));
  });
}

export function SuggestedEditCard({
  row,
  selectedGoals,
  applied,
}: {
  row: SuggestedEditRow;
  selectedGoals: ImpactGoalKey[];
  applied: boolean;
}) {
  const mode = getSuggestedEditMode(row.measure);
  const goalEffects = getGoalEffects(row, selectedGoals);
  const positiveEffects = goalEffects.filter(({ effect }) =>
    isPositiveImpactGrade(effect.score),
  );
  const adverseEffects = goalEffects.filter(
    ({ effect }) => !isPositiveImpactGrade(effect.score),
  );
  const neutralGoals = selectedGoals.filter((goal) => row[goal].length === 0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`${row.measure}. Click to open more details.`}
          className="flex h-full w-full flex-col rounded-2xl border bg-card p-4 text-left shadow-sm transition-colors hover:bg-muted/40 hover:shadow-md focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-muted-foreground" aria-hidden>
              {measureModeIcons[mode]}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold tracking-tight">
                  {row.measure}
                </h3>
                {applied ? (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-gray-600 px-2.5 py-1 text-xs font-medium">
                    <Check className="size-3.5" aria-hidden />
                    Applied
                  </span>
                ) : null}
              </div>

              <div className="mt-4">
                <GoalEffectsSummary
                  positiveEffects={positiveEffects}
                  adverseEffects={adverseEffects}
                  neutralGoals={neutralGoals}
                />
              </div>
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg" showCloseButton>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 pr-8">
            <span className="text-muted-foreground" aria-hidden>
              {measureModeIcons[mode]}
            </span>
            {row.measure}
          </DialogTitle>
          <DialogDescription>
            Detailed goal effects for this suggested edit.
          </DialogDescription>
        </DialogHeader>
        <GoalEffectsSummary
          positiveEffects={positiveEffects}
          adverseEffects={adverseEffects}
          neutralGoals={neutralGoals}
        />
        <div className="border-t pt-4">
          <GoalEffectsDetails goalEffects={goalEffects} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
