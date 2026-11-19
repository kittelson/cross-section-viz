import { cn } from 'cn';
import { goalIcons } from '@/lib/iconHelpers';
import {
  impactGradeMagnitude,
  ImpactGradeToLabel,
  type ImpactEffect,
  type ImpactGoalKey,
} from '@/suggestedEdits';

const pillWidthClass: Record<number, string> = {
  1: 'w-10',
  1.5: 'w-14',
  2: 'w-16',
  2.5: 'w-20',
  3: 'w-24',
};

export function EffectPill({
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
          'border-1 border-emerald-600 bg-background text-emerald-600',
        variant === 'adverse' &&
          'border-1 border-destructive bg-background text-destructive',
      )}
    >
      <span className="[&_svg]:size-4">{goalIcons[goal]}</span>
    </span>
  );
}
