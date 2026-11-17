import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { cn } from 'cn';

function formatFeet(value: number) {
  return value.toFixed(1).replace(/\.0$/, '');
}

export function MinSafeDimensionSummaryTable({
  minDimensionWidthFt,
  rightOfWayFt,
  remainingRightOfWayFt,
  className = 'mt-6 border max-w-140',
}: {
  minDimensionWidthFt: number;
  rightOfWayFt: number;
  remainingRightOfWayFt: number;
  className?: string;
}) {
  const minSafeDimensionFits = remainingRightOfWayFt >= 0;
  return (
    <Table className={className}>
      <TableBody>
        <TableRow className="hover:bg-transparent">
          <TableCell className="w-1/2 border text-center font-medium whitespace-normal">
            Minimum Safe Dimension
          </TableCell>
          <TableCell className="border text-center whitespace-normal">
            {formatFeet(minDimensionWidthFt)}'
          </TableCell>
        </TableRow>
        <TableRow className="hover:bg-transparent">
          <TableCell className="border text-center font-medium whitespace-normal">
            Existing Right-of-Way
          </TableCell>
          <TableCell className="border text-center whitespace-normal">
            {formatFeet(rightOfWayFt)}'
          </TableCell>
        </TableRow>
        <TableRow className="hover:bg-transparent">
          <TableCell className="border text-center font-medium whitespace-normal">
            Available Space
          </TableCell>
          <TableCell className="border text-center whitespace-normal">
            {formatFeet(remainingRightOfWayFt)}'
          </TableCell>
        </TableRow>
        <TableRow className="hover:bg-transparent">
          <TableCell className="border text-center font-medium whitespace-normal">
            Does minimum safe dimension fit?
          </TableCell>
          <TableCell
            className={cn(
              'border text-center whitespace-normal',
              minSafeDimensionFits ? 'bg-green-500/10' : 'bg-red-500/10',
            )}
          >
            {minSafeDimensionFits ? (
              <>
                Yes, the minimum safe dimension fits within the right-of-way.
                There {remainingRightOfWayFt === 1 ? 'is' : 'are'}{' '}
                <span className="font-semibold">
                  {formatFeet(remainingRightOfWayFt)}'
                </span>{' '}
                remaining.
              </>
            ) : (
              <>
                No, the minimum safe dimension does not fit within the
                right-of-way. There{' '}
                {Math.abs(remainingRightOfWayFt) === 1 ? 'is' : 'are'}{' '}
                <span className="font-semibold">
                  {formatFeet(Math.abs(remainingRightOfWayFt))}
                </span>
                ' missing.
              </>
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
