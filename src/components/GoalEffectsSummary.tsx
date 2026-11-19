import { EffectPill } from '@/components/EffectPill';
import { goalIcons } from '@/lib/iconHelpers';
import { projectGoalOptions } from '@/projectDetails';
import type { ImpactEffect, ImpactGoalKey } from '@/suggestedEdits';

export type GoalEffect = {
  goal: ImpactGoalKey;
  label: string;
  effect: ImpactEffect;
};

export function GoalEffectsSummary({
  positiveEffects,
  adverseEffects,
  neutralGoals,
}: {
  positiveEffects: GoalEffect[];
  adverseEffects: GoalEffect[];
  neutralGoals: ImpactGoalKey[];
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2">
      <span className="text-xs text-muted-foreground">Positives</span>
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

      <span className="text-xs text-muted-foreground">Neutral</span>
      <div className="flex flex-wrap gap-1.5">
        {neutralGoals.length ? (
          neutralGoals.map((goal) => {
            const label =
              projectGoalOptions.find((option) => option.name === goal)
                ?.label ?? goal;
            return (
              <span
                key={`${goal}-neutral`}
                title={`${label}: No significant effect`}
                className="inline-flex h-8 min-w-28 items-center justify-center gap-1 rounded-md border border-border bg-muted px-2 text-xs font-medium text-muted-foreground"
              >
                <span className="[&_svg]:size-3.5">{goalIcons[goal]}</span>
                <span className="truncate">No significant effect</span>
              </span>
            );
          })
        ) : (
          <span className="text-xs text-muted-foreground">None</span>
        )}
      </div>

      <span className="text-xs text-muted-foreground">Negatives</span>
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
  );
}
