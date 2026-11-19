import { MinSafeDimensionSummaryTable } from '@/components/MinSafeDimensionSummaryTable';
import minSafeDimension from '@/images/streetmixPlaceholders/minSafeDimension.png';

export function MinSafeDimensionFits({
  minDimensionWidthFt,
  rightOfWayFt,
  remainingRightOfWayFt,
}: {
  minDimensionWidthFt: number;
  rightOfWayFt: number;
  remainingRightOfWayFt: number;
}) {
  return (
    <div>
      <p className="mt-4 text-muted-foreground">
        The minimum safe dimension cross-section takes up{' '}
        <span className="font-semibold">{minDimensionWidthFt}'</span> of
        right-of-way and the existing right-of-way is{' '}
        <span className="font-semibold">{rightOfWayFt}'</span>. You have{' '}
        <span className="font-semibold">{remainingRightOfWayFt}'</span>{' '}
        remaining.
      </p>
      <MinSafeDimensionSummaryTable
        minDimensionWidthFt={minDimensionWidthFt}
        rightOfWayFt={rightOfWayFt}
        remainingRightOfWayFt={remainingRightOfWayFt}
      />
      <img
        src={minSafeDimension}
        alt="Minimum safe dimension cross section"
        className="mt-6 w-full max-w-5xl"
      />
      <p className="mt-4 text-muted-foreground">
        Next, let's edit our cross section to fill in the remaining space and
        achieve our project goals.
      </p>
    </div>
  );
}
