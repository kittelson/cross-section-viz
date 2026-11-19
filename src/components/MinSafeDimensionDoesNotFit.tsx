import { MinSafeDimensionIdeas } from '@/components/MinSafeDimensionIdeas';
import { MinSafeDimensionSummaryTable } from '@/components/MinSafeDimensionSummaryTable';
import minSafeDimension from '@/images/streetmixPlaceholders/minSafeDimension.png';

export function MinSafeDimensionDoesNotFit({
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
        right-of-way and the existing right-of-way is only{' '}
        <span className="font-semibold">{rightOfWayFt}'</span>. That&apos;s a
        difference of{' '}
        <span className="font-semibold">
          {Math.abs(remainingRightOfWayFt)}'
        </span>
        .
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
        Here are some options for how to design a smaller cross section that
        still works for all modes. Select one of these ideas to continue.
      </p>
      <MinSafeDimensionIdeas />
    </div>
  );
}
