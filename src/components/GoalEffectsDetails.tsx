import { cn } from 'cn';
import type { GoalEffect } from '@/components/GoalEffectsSummary';
import { goalIcons } from '@/lib/iconHelpers';
import {
  ImpactGradeToLabel,
  isPositiveImpactGrade,
} from '@/suggestedEdits';

export function GoalEffectsDetails({
  goalEffects,
}: {
  goalEffects: GoalEffect[];
}) {
  if (!goalEffects.length) {
    return (
      <p className="text-sm text-muted-foreground">
        No scored effects for the selected project goals.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {goalEffects.map(({ goal, label, effect }, index) => {
        const positive = isPositiveImpactGrade(effect.score);
        return (
          <div
            key={`${goal}-detail-${index}`}
            className={cn(
              'rounded-lg border-1 px-3 py-2 text-sm',
              positive ? 'border-emerald-600' : 'border-destructive',
            )}
          >
            <p className="flex items-center gap-2 font-medium">
              <span
                className={cn(
                  positive ? 'text-emerald-600' : 'text-destructive',
                )}
              >
                {goalIcons[goal]}
              </span>{' '}
              {label}
              {' · '}
              {ImpactGradeToLabel[effect.score]}
            </p>
            <p className="mt-1 text-pretty">
              {effect.description || 'No description provided.'}
            </p>
            {effect.additionalMarkers?.length ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {effect.additionalMarkers.map((marker) => (
                  <span
                    key={marker.label}
                    title={marker.helperText}
                    className="rounded-full border border-border bg-background/70 px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {marker.label}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
