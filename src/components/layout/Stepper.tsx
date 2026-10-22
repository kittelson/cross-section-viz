import { useAtom } from 'jotai';
import { Check } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { furthestStepIndexAtom } from '@/atoms';
import { cn } from '@/lib/utils';
import { paths } from '@/paths';

export const steps = [
  { to: paths.home, label: 'Home' },
  { to: paths.existingCrossSection, label: 'Existing Cross Section' },
  { to: paths.projectDetails, label: 'Project Details' },
  { to: paths.minSafeDimension, label: 'Min Safe Dimension' },
  { to: paths.editCrossSection, label: 'Edit Cross Section' },
  { to: paths.output, label: 'Output' },
] as const;

function getStepIndex(pathname: string) {
  return steps.findIndex((step) => step.to === pathname);
}

export function Stepper() {
  const { pathname } = useLocation();
  const currentIndex = getStepIndex(pathname);
  const [furthestIndex, setFurthestIndex] = useAtom(furthestStepIndexAtom);

  const reachedIndex = Math.max(furthestIndex, currentIndex);

  useEffect(() => {
    if (currentIndex > furthestIndex) {
      setFurthestIndex(currentIndex);
    }
  }, [currentIndex, furthestIndex, setFurthestIndex]);

  return (
    <nav aria-label="Workflow steps">
      <ol className="flex flex-col">
        {steps.map((step, index) => {
          const isCurrent = index === currentIndex;
          const isFuture = index > reachedIndex;
          const isCompleted = index <= reachedIndex;
          const isClickable = !isCurrent && !isFuture;

          return (
            <li key={step.to} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  aria-hidden
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium',
                    isCurrent &&
                      'bg-primary text-primary-foreground ring-4 ring-primary/20',
                    !isCurrent &&
                      isCompleted &&
                      'bg-secondary text-secondary-foreground',
                    isFuture && 'bg-muted text-muted-foreground',
                  )}
                >
                  {isCompleted && !isCurrent ? (
                    <Check className="size-4" />
                  ) : (
                    index + 1
                  )}
                </span>
                {index < steps.length - 1 && (
                  <span
                    aria-hidden
                    className={cn(
                      'my-1 min-h-6 w-px flex-1',
                      index < reachedIndex ? 'bg-secondary' : 'bg-border',
                    )}
                  />
                )}
              </div>
              <div className="pt-1 pb-6">
                {isClickable ? (
                  <Link
                    to={step.to}
                    className="text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {step.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isCurrent ? 'step' : undefined}
                    aria-disabled={isFuture || undefined}
                    className={cn(
                      'text-sm',
                      isCurrent && 'font-semibold text-primary',
                      isFuture && 'text-muted-foreground',
                    )}
                  >
                    {step.label}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
