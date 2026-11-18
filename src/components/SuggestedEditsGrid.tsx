import { cn } from 'cn';
import { useAtomValue } from 'jotai';
import { Check, ChevronDown, Minus, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { projectDetailsAtom } from '@/atoms';
import { Button } from '@/components/ui/button';
import { goalIcons, measureModeIcons } from '@/lib/iconHelpers';
import { projectGoalOptions } from '@/projectDetails';
import {
  getSuggestedEditMode,
  getSuggestedEditTotalScore,
  impactGradeMagnitude,
  ImpactGradeToLabel,
  isPositiveImpactGrade,
  suggestedEditRows,
  type ImpactEffect,
  type ImpactGoalKey,
  type SuggestedEditRow,
} from '@/suggestedEdits';

const pillWidthClass: Record<number, string> = {
  1: 'w-10',
  1.5: 'w-14',
  2: 'w-16',
  2.5: 'w-20',
  3: 'w-24',
};

type GoalEffect = {
  goal: ImpactGoalKey;
  label: string;
  effect: ImpactEffect;
};

function getSelectedGoals(goals: Record<ImpactGoalKey, boolean>) {
  return projectGoalOptions
    .map((goal) => goal.name)
    .filter((goal) => goals[goal]);
}

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

function EffectPill({
  goal,
  label,
  effect,
  variant,
}: {
  goal: ImpactGoalKey;
  label: string;
  effect: ImpactEffect;
  variant: 'positive' | 'adverse';
}) {
  const magnitude = impactGradeMagnitude(effect.score);

  return (
    <span
      title={`${label}: ${ImpactGradeToLabel[effect.score]}`}
      className={cn(
        'inline-flex h-8 items-center justify-center gap-1 rounded-md px-2 text-xs font-medium',
        pillWidthClass[magnitude] ?? 'w-16',
        variant === 'positive' &&
          'bg-emerald-600 text-white dark:bg-emerald-500',
        variant === 'adverse' &&
          'border-2 border-destructive bg-background text-destructive',
      )}
    >
      <span className="[&_svg]:size-3.5">{goalIcons[goal]}</span>
    </span>
  );
}

function SuggestedEditCard({
  row,
  selectedGoals,
  expanded,
  applied,
  onToggle,
}: {
  row: SuggestedEditRow;
  selectedGoals: ImpactGoalKey[];
  expanded: boolean;
  applied: boolean;
  onToggle: () => void;
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
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      className="w-full rounded-2xl border bg-card p-4 text-left shadow-sm transition-colors hover:bg-muted/30"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-muted-foreground">
          {measureModeIcons[mode]}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold tracking-tight">
              {row.measure}
            </h3>
            <div className="flex shrink-0 items-center gap-2">
              {applied ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-gray-600 px-2.5 py-1 text-xs font-medium">
                  <Check className="size-3.5" aria-hidden />
                  Applied
                </span>
              ) : null}
              <ChevronDown
                className={cn(
                  'size-5 text-muted-foreground transition-transform',
                  expanded && 'rotate-180',
                )}
                aria-hidden
              />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <Plus
                className="size-4 shrink-0 text-emerald-600"
                aria-label="Positive effects"
              />
              <div className="flex flex-wrap gap-1.5">
                {positiveEffects.length ? (
                  positiveEffects.map(({ goal, label, effect }, index) => (
                    <EffectPill
                      key={`${goal}-positive-${index}`}
                      goal={goal}
                      label={label}
                      effect={effect}
                      variant="positive"
                    />
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">None</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Minus
                className="size-4 shrink-0 text-destructive"
                aria-label="Adverse effects"
              />
              <div className="flex flex-wrap gap-1.5">
                {adverseEffects.length ? (
                  adverseEffects.map(({ goal, label, effect }, index) => (
                    <EffectPill
                      key={`${goal}-adverse-${index}`}
                      goal={goal}
                      label={label}
                      effect={effect}
                      variant="adverse"
                    />
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">None</span>
                )}
              </div>
            </div>
            {neutralGoals.length ? (
              <div className="flex flex-wrap gap-1.5 pl-6">
                {neutralGoals.map((goal) => {
                  const label =
                    projectGoalOptions.find((option) => option.name === goal)
                      ?.label ?? goal;
                  return (
                    <span
                      key={`${goal}-neutral`}
                      title={`${label}: No significant effect`}
                      className="inline-flex h-8 min-w-28 items-center justify-center gap-1 rounded-md border border-border bg-muted px-2 text-xs font-medium text-muted-foreground"
                    >
                      <span className="[&_svg]:size-3.5">
                        {goalIcons[goal]}
                      </span>
                      <span className="truncate">No significant effect</span>
                    </span>
                  );
                })}
              </div>
            ) : null}
          </div>

          {expanded ? (
            <div className="mt-4 space-y-2 border-t pt-4">
              {goalEffects.length ? (
                goalEffects.map(({ goal, label, effect }, index) => {
                  const positive = isPositiveImpactGrade(effect.score);
                  return (
                    <div
                      key={`${goal}-detail-${index}`}
                      className={cn(
                        'rounded-lg px-3 py-2 text-sm',
                        positive ? 'bg-emerald-600/10' : 'bg-destructive/10',
                      )}
                    >
                      <p className="font-medium">
                        {label}
                        {effect.term
                          ? ` (${effect.term === 'nearTerm' ? 'Near term' : 'Long term'})`
                          : ''}
                        {' · '}
                        {ImpactGradeToLabel[effect.score]}
                      </p>
                      <p className="mt-1 text-pretty">
                        {effect.description || 'No description provided.'}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-muted-foreground">
                  No scored effects for the selected project goals.
                </p>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </button>
  );
}

export function SuggestedEditsGrid() {
  const projectDetails = useAtomValue(projectDetailsAtom);
  const selectedGoals = useMemo(
    () => getSelectedGoals(projectDetails.goals),
    [projectDetails.goals],
  );
  const [expandedMeasures, setExpandedMeasures] = useState<Set<string>>(
    () => new Set(),
  );

  const sortedRows = useMemo(() => {
    return [...suggestedEditRows].sort((left, right) => {
      return (
        getSuggestedEditTotalScore(right, selectedGoals) -
        getSuggestedEditTotalScore(left, selectedGoals)
      );
    });
  }, [selectedGoals]);

  function expandAll() {
    setExpandedMeasures(new Set(sortedRows.map((row) => row.measure)));
  }

  function collapseAll() {
    setExpandedMeasures(new Set());
  }

  function toggleMeasure(measure: string) {
    setExpandedMeasures((current) => {
      const next = new Set(current);
      if (next.has(measure)) {
        next.delete(measure);
      } else {
        next.add(measure);
      }
      return next;
    });
  }

  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold tracking-tight">
          Suggested Edits
        </h2>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm" onClick={expandAll}>
            Expand all
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={collapseAll}
          >
            Collapse all
          </Button>
        </div>
      </div>

      {selectedGoals.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Select at least one project goal on the Project Details page to see
          scored suggested edits.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {sortedRows.map((row, index) => (
            <SuggestedEditCard
              key={row.measure}
              row={row}
              selectedGoals={selectedGoals}
              expanded={expandedMeasures.has(row.measure)}
              applied={index === 0}
              onToggle={() => toggleMeasure(row.measure)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
