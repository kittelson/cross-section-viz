import { lazy, Suspense, type ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const LazyStreetEditor = lazy(() =>
  import('@/streetmix/StreetEditor').then((m) => ({ default: m.StreetEditor })),
);

type StreetEditorProps = ComponentProps<typeof LazyStreetEditor> & {
  className?: string;
};

// Sets the editor's size for every step that shows it.
export function StreetEditor({ className, ...props }: StreetEditorProps) {
  return (
    <div className={cn('h-[clamp(480px,55vh,640px)] w-full', className)}>
      <Suspense
        fallback={
          <div className="h-full w-full animate-pulse rounded-lg border bg-muted" />
        }
      >
        <LazyStreetEditor {...props} />
      </Suspense>
    </div>
  );
}
