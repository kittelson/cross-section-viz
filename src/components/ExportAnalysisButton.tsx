import type { ComponentProps } from 'react';
import { Save } from 'lucide-react';
import { cn } from 'cn';

export function ExportAnalysisButton({
  className,
  ...props
}: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={cn(
        'flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/15',
        className,
      )}
      {...props}
    >
      <Save className="size-4" />
      Export Analysis
    </button>
  );
}
