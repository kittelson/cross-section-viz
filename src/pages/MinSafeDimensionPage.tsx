import { BottomNavButtons } from '@/components/BottomNavButtons';
import minSafeDimension from '@/images/streetmixPlaceholders/minSafeDimension.png';
import { paths } from '@/paths';

export function MinSafeDimensionPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-semibold tracking-tight">
        Minimum Safe Dimension
      </h1>
      <p className="mt-2 text-muted-foreground">
        The following cross section provides the minimum safe dimension for your
        existing conditions.
      </p>
      <p className="mt-4 text-muted-foreground">
        This cross-section takes up <span className="font-semibold">68'</span>{' '}
        of right-of-way and the existing right-of-way is{' '}
        <span className="font-semibold">80'</span>. Therefore, you have{' '}
        <span className="font-semibold">12'</span> remaining.
      </p>
      <img
        src={minSafeDimension}
        alt="Minimum safe dimension cross section"
        className="mt-6 w-full"
      />
      <BottomNavButtons
        backTo={paths.projectDetails}
        continueTo={paths.editCrossSection}
      />
    </div>
  );
}
