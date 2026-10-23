import { Check, CircleMinus, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { suggestedEditRows, type ImpactMarks } from '@/suggestedEdits';

function MarksRow({
  checks = 0,
  crosses = 0,
  neutral = false,
}: {
  checks?: number;
  crosses?: number;
  neutral?: boolean;
}) {
  const summary = [
    checks ? `${checks} positive` : null,
    crosses ? `${crosses} negative` : null,
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
        {Array.from({ length: checks }, (_, index) => (
          <Check
            key={`check-${index}`}
            className="size-4 text-secondary"
            aria-hidden
          />
        ))}
      </span>
      <span className="flex items-center gap-0.5">
        {Array.from({ length: crosses }, (_, index) => (
          <X
            key={`cross-${index}`}
            className="size-4 text-destructive"
            aria-hidden
          />
        ))}
      </span>
    </div>
  );
}

function ImpactCell({ marks }: { marks: ImpactMarks }) {
  if (marks.nearTerm || marks.longTerm) {
    return (
      <div className="space-y-2">
        {marks.nearTerm ? (
          <div>
            <p className="text-xs text-muted-foreground">Near term</p>
            <MarksRow {...marks.nearTerm} />
          </div>
        ) : null}
        {marks.longTerm ? (
          <div>
            <p className="text-xs text-muted-foreground">Long term</p>
            <MarksRow {...marks.longTerm} />
          </div>
        ) : null}
      </div>
    );
  }

  return <MarksRow {...marks} />;
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
          <TableHead>Social</TableHead>
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
              <ImpactCell marks={row.safety} />
            </TableCell>
            <TableCell>
              <ImpactCell marks={row.economic} />
            </TableCell>
            <TableCell>
              <ImpactCell marks={row.environmental} />
            </TableCell>
            <TableCell>
              <ImpactCell marks={row.social} />
            </TableCell>
            <TableCell>
              <ImpactCell marks={row.modeShift} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
