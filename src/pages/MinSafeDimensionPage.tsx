import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { minSafeDimensionAtom, roadwayRightOfWayFtAtom } from '@/atoms';
import { BottomNavButtons } from '@/components/BottomNavButtons';
import { MinSafeDimensionIdeas } from '@/components/MinSafeDimensionIdeas';
import { StreetEditor } from '@/components/StreetEditor';
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

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Minimum Safe Dimension
      </h1>
      <p className="mt-2 max-w-5xl text-muted-foreground">
        This cross section provides the minimum safe travel width for
        pedestrians, cyclists, and motorists. It does not include turn lanes or
        parking lanes, just the minimum space needed for all modes to travel
        safely. Next you can decide how to use the remaining right-of-way.
      </p>
      {remainingRightOfWayFt > 0 ? (
        <div>
          <p className="mt-4 max-w-5xl text-muted-foreground">
            The minimum safe dimension cross-section takes up{' '}
            <span className="font-semibold">{minDimensionWidthFt}'</span> of
            right-of-way and the existing right-of-way is{' '}
            <span className="font-semibold">{rightOfWayFt}'</span>. You have{' '}
            <span className="font-semibold">{remainingRightOfWayFt}'</span>{' '}
            remaining.
          </p>
          <StreetEditor readOnly className="mt-6" />
        </div>
      ) : (
        <div>
          <p className="mt-4 max-w-5xl text-muted-foreground">
            The minimum safe dimension cross-section takes up{' '}
            <span className="font-semibold">{minDimensionWidthFt}'</span> of
            right-of-way and the existing right-of-way is only{' '}
            <span className="font-semibold">{rightOfWayFt}'</span>. That&apos;s
            a difference of{' '}
            <span className="font-semibold">
              {Math.abs(remainingRightOfWayFt)}'
            </span>{' '}
            .
          </p>
          <StreetEditor readOnly className="mt-6" />
          <p className="mt-4 max-w-5xl text-muted-foreground">
            Here are some options for how to design a smaller cross section that
            still works for all modes. Select one of these ideas to continue.
          </p>
          <MinSafeDimensionIdeas />
        </div>
      )}
      <BottomNavButtons
        backTo={paths.projectDetails}
        continueTo={paths.editCrossSection}
        continueDisabled={requiresIdeaSelection && selectedOption == null}
      />
    </div>
  );
}
