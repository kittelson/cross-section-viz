import finalAlternative1 from '@/images/streetmixPlaceholders/finalAlternative1.png';
import finalExisting from '@/images/streetmixPlaceholders/finalExisting.png';

export function ComparisonTab() {
  return (
    <div className="space-y-10">
      <figure>
        <figcaption className="text-center text-base font-medium">
          Existing
        </figcaption>
        <img
          src={finalExisting}
          alt="Existing cross section"
          className="mt-3 w-full"
        />
      </figure>
      <figure>
        <figcaption className="text-center text-base font-medium">
          Alternative 1
        </figcaption>
        <img
          src={finalAlternative1}
          alt="Alternative 1 cross section"
          className="mt-3 w-full"
        />
      </figure>
    </div>
  );
}
