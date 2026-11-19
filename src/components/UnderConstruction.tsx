import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function UnderConstruction({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      {children}
      <p className="pointer-events-none absolute bottom-1/2 left-1/2 z-10 w-fit -translate-x-1/2 rotate-30 bg-white px-2 text-center text-muted-foreground">
        Under Construction
      </p>
    </div>
  );
}
