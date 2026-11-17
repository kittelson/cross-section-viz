import { useAtomValue } from 'jotai';
import { alternativesAtom } from '@/atoms';
import finalAlternative1 from '@/images/streetmixPlaceholders/finalAlternative1.png';
import finalExisting from '@/images/streetmixPlaceholders/finalExisting.png';

export function ComparisonTab() {
  const alternatives = useAtomValue(alternativesAtom);

  return (
    <div className="grid grid-cols-1 gap-8 sm:gap-6 xl:grid-cols-2">
      <figure className="min-w-0">
        <figcaption className="text-center text-base font-medium">
          Existing
        </figcaption>
        <img
          src={finalExisting}
          alt="Existing cross section"
          className="mt-3 w-full"
        />
      </figure>
      {alternatives.map((alternative) => (
        <figure key={alternative.id} className="min-w-0">
          <figcaption className="text-center text-base font-medium">
            {alternative.alternativeName}
          </figcaption>
          <img
            src={finalAlternative1}
            alt={`${alternative.alternativeName} cross section`}
            className="mt-3 w-full"
          />
        </figure>
      ))}
    </div>
  );
}
