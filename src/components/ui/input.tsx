import * as React from 'react';
import { cn } from 'cn';

const inputClassName =
  'h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40';

function Input({
  className,
  type,
  startAdornment,
  endAdornment,
  ...props
}: React.ComponentProps<'input'> & {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}) {
  const input = (
    <input
      type={type}
      data-slot="input"
      className={cn(
        inputClassName,
        (startAdornment || endAdornment) &&
          'h-auto flex-1 rounded-none border-0 bg-transparent px-2 shadow-none focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent',
        className,
      )}
      {...props}
    />
  );

  if (!startAdornment && !endAdornment) {
    return input;
  }

  return (
    <div
      data-slot="input-with-adornment"
      className={cn(
        'flex h-8 w-full min-w-0 items-center rounded-lg border border-input transition-colors outline-none has-disabled:bg-input/50 has-disabled:opacity-50 has-[[data-slot=input]:focus-visible]:border-ring has-[[data-slot=input]:focus-visible]:ring-3 has-[[data-slot=input]:focus-visible]:ring-ring/50 has-[[data-slot=input][aria-invalid=true]]:border-destructive has-[[data-slot=input][aria-invalid=true]]:ring-3 has-[[data-slot=input][aria-invalid=true]]:ring-destructive/20 dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot=input][aria-invalid=true]]:ring-destructive/40',
      )}
    >
      {startAdornment ? (
        <span className="flex shrink-0 items-center pl-2.5 text-sm text-muted-foreground select-none">
          {startAdornment}
        </span>
      ) : null}
      {input}
      {endAdornment ? (
        <span className="flex shrink-0 items-center pr-2.5 text-sm text-muted-foreground select-none">
          {endAdornment}
        </span>
      ) : null}
    </div>
  );
}

export { Input };
