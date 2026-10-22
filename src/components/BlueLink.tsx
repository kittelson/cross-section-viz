import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export function BlueLink({ className, ...props }: ComponentProps<'a'>) {
  return (
    <a
      className={cn(
        'font-medium text-primary underline-offset-4 hover:underline',
        className,
      )}
      {...props}
    />
  );
}
