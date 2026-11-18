import { Check, CircleMinus, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  suggestedEditRows,
  type ImpactEffect,
  type ImpactGrade,
} from '@/suggestedEdits';

function intensityFromScore(score: ImpactGrade) {
  if (score.startsWith('low_medium_')) {
    return 2;
  }
  if (score.startsWith('medium_high_')) {
    return 3;
  }
  if (score.startsWith('low_')) {
    return 1;
  }
  if (score.startsWith('medium_')) {
    return 2;
  }
  if (score.startsWith('high_')) {
    return 3;
  }
  return 0;
}

function marksFromEffects(effects: ImpactEffect[]) {
  let positives = 0;
  let negatives = 0;

  for (const effect of effects) {
    const intensity = intensityFromScore(effect.score);
    if (effect.score.includes('positive')) {
      positives = Math.max(positives, intensity);
    } else if (effect.score.includes('adverse')) {
      negatives = Math.max(negatives, intensity);
    }
  }

  return { positives, negatives };
}

function MarksRow({ effects }: { effects: ImpactEffect[] }) {
  const { positives, negatives } = marksFromEffects(effects);
  const neutral = positives === 0 && negatives === 0;
  const summary = [
    positives ? `${positives} positive` : null,
    negatives ? `${negatives} negative` : null,
    neutral ? 'neutral' : null,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <div
      className="flex min-w-24 items-center justify-between gap-3"
      aria-label={summary || 'No impact marked'}
    >
      <span className="flex items-center gap-0.5">
        {neutral ? (
          <CircleMinus className="size-4 text-muted-foreground" aria-hidden />
        ) : null}
        {Array.from({ length: positives }, (_, index) => (
          <Check
            key={`positive-${index}`}
            className="size-4 text-secondary"
            aria-hidden
          />
        ))}
      </span>
      <span className="flex items-center gap-0.5">
        {Array.from({ length: negatives }, (_, index) => (
          <X
            key={`negative-${index}`}
            className="size-4 text-destructive"
            aria-hidden
          />
        ))}
      </span>
    </div>
  );
}

function ImpactCell({ effects }: { effects: ImpactEffect[] }) {
  const nearTerm = effects.filter((effect) => effect.term === 'nearTerm');
  const longTerm = effects.filter((effect) => effect.term === 'longTerm');
  const untimed = effects.filter((effect) => effect.term == null);

  if (nearTerm.length || longTerm.length) {
    return (
      <div className="space-y-2">
        {nearTerm.length ? (
          <div>
            <p className="text-xs text-muted-foreground">Near term</p>
            <MarksRow effects={nearTerm} />
          </div>
        ) : null}
        {longTerm.length ? (
          <div>
            <p className="text-xs text-muted-foreground">Long term</p>
            <MarksRow effects={longTerm} />
          </div>
        ) : null}
        {untimed.length ? <MarksRow effects={untimed} /> : null}
      </div>
    );
  }

  return <MarksRow effects={effects} />;
}

export function SuggestedEditsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            rowSpan={2}
            className="min-w-40 align-bottom whitespace-normal"
          >
            Measure to increase cross section
          </TableHead>
          <TableHead rowSpan={2} className="align-bottom">
            Feasible?
          </TableHead>
          <TableHead colSpan={5} className="text-center">
            Impacts
          </TableHead>
        </TableRow>
        <TableRow>
          <TableHead>Safety</TableHead>
          <TableHead>Economic</TableHead>
          <TableHead>Environmental</TableHead>
          <TableHead>Access to destinations</TableHead>
          <TableHead>Mode Shift</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {suggestedEditRows.map((row) => (
          <TableRow key={row.measure}>
            <TableCell className="max-w-48 font-medium whitespace-normal">
              {row.measure}
            </TableCell>
            <TableCell>{row.feasible ? 'Y' : 'N'}</TableCell>
            <TableCell>
              <ImpactCell effects={row.safety} />
            </TableCell>
            <TableCell>
              <ImpactCell effects={row.economic} />
            </TableCell>
            <TableCell>
              <ImpactCell effects={row.environmental} />
            </TableCell>
            <TableCell>
              <ImpactCell effects={row.accessToDestinations} />
            </TableCell>
            <TableCell>
              <ImpactCell effects={row.modeShift} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
