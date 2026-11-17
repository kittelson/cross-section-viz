import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { minSafeDimensionAtom, roadwayRightOfWayFtAtom } from '@/atoms';
import { BottomNavButtons } from '@/components/BottomNavButtons';
import { MinSafeDimensionDoesNotFit } from '@/components/MinSafeDimensionDoesNotFit';
import { MinSafeDimensionFits } from '@/components/MinSafeDimensionFits';
import { minDimensionWidthFt } from '@/lib/utils';
import { paths } from '@/paths';

export function MinSafeDimensionPage() {
  const navigate = useNavigate();
  const rightOfWayFt = useAtomValue(roadwayRightOfWayFtAtom);
  const { selectedOption } = useAtomValue(minSafeDimensionAtom);

  if (!rightOfWayFt) {
    alert('You must enter a right-of-way width to continue.');
    navigate(paths.existingCrossSection);
    return null;
  }

  const remainingRightOfWayFt = rightOfWayFt - minDimensionWidthFt;
  const requiresIdeaSelection = remainingRightOfWayFt <= 0;
  const summaryProps = {
    minDimensionWidthFt,
    rightOfWayFt,
    remainingRightOfWayFt,
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Minimum Safe Dimension
      </h1>
      <p className="mt-2 max-w-5xl text-muted-foreground">
        This cross section provides the minimum safe travel width for
        pedestrians, cyclists, and motorists. It does not include turn lanes or
        parking lanes, just the minimum space needed for all modes to travel
        safely. Now let&apos;s decide how to use the remaining right-of-way.
      </p>
      {remainingRightOfWayFt > 0 ? (
        <MinSafeDimensionFits {...summaryProps} />
      ) : (
        <MinSafeDimensionDoesNotFit {...summaryProps} />
      )}
      <BottomNavButtons
        backTo={paths.projectDetails}
        continueTo={paths.editCrossSection}
        continueDisabled={requiresIdeaSelection && selectedOption == null}
      />
    </div>
  );
}
