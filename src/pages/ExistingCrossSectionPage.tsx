import { useAtom } from 'jotai';
import { Ruler } from 'lucide-react';
import { roadwayWidthFtAtom } from '@/atoms';
import { Input } from '@/components/ui/input';

export function ExistingCrossSectionPage() {
  const [width, setWidth] = useAtom(roadwayWidthFtAtom);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold tracking-tight">
        Existing Cross Section
      </h1>
      <p className="mt-2 text-muted-foreground">
        Use the widgets below to build your existing cross section.
      </p>
      <div className="mt-6 flex justify-center">
        <label
          htmlFor="roadway-width"
          className="inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-sm shadow-xs"
        >
          <Ruler className="size-4 text-muted-foreground" aria-hidden />
          <Input
            id="roadway-width"
            type="number"
            inputMode="decimal"
            min={1}
            step="any"
            className="h-7 w-16 border-0 bg-transparent px-1 text-center shadow-none focus-visible:ring-0"
            value={width ?? ''}
            onChange={(event) => {
              const value = event.target.value;
              setWidth(value === '' ? null : Number(value));
            }}
            aria-label="Roadway width in feet"
          />
          <span className="text-muted-foreground">' width</span>
        </label>
      </div>
    </div>
  );
}
