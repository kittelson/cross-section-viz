import existing from '@/images/streetmixPlaceholders/existing.png';
import finalAlternative1 from '@/images/streetmixPlaceholders/finalAlternative1.png';
import minSafeDimension from '@/images/streetmixPlaceholders/minSafeDimension.png';
import showDetails from '@/images/streetmixPlaceholders/showDetails.png';

export const minSafeDimensionOptionValues = [
  'reduceSpeedsAddSharrows',
  'twoWayCycleTrack',
  'oneWayConversion',
  'addParallelBikeFacility',
  'custom',
] as const;

export type MinSafeDimensionOption =
  (typeof minSafeDimensionOptionValues)[number];

export type MinSafeDimensionState = {
  selectedOption: MinSafeDimensionOption | null;
};

export const minSafeDimensionIdeas = [
  {
    value: 'reduceSpeedsAddSharrows',
    label: 'Reduce speeds',
    image: minSafeDimension,
  },
  {
    value: 'twoWayCycleTrack',
    label: 'Install two-way cycle track',
    image: showDetails,
  },
  {
    value: 'oneWayConversion',
    label: 'Convert to one-way street',
    image: existing,
  },
  {
    value: 'addParallelBikeFacility',
    label: 'Add parallel bike facility',
    image: finalAlternative1,
  },
  {
    value: 'custom',
    label: 'Custom',
    image: minSafeDimension,
  },
] as const satisfies ReadonlyArray<{
  value: MinSafeDimensionOption;
  label: string;
  image: string;
}>;

export const defaultMinSafeDimension: MinSafeDimensionState = {
  selectedOption: null,
};
