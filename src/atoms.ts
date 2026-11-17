import { atom } from 'jotai';
import {
  defaultAlternatives,
  type AlternativeConfigFormValues,
} from '@/alternativeConfig';
import { defaultCapacityScenarios, type CapacityScenario } from '@/capacity';
import {
  defaultMinSafeDimension,
  type MinSafeDimensionState,
} from '@/minSafeDimension';
import {
  defaultProjectDetails,
  type ProjectDetailsFormValues,
} from '@/projectDetails';

export const projectDetailsAtom = atom<ProjectDetailsFormValues>({
  ...defaultProjectDetails,
  goals: { ...defaultProjectDetails.goals },
});

export const roadwayRightOfWayFtAtom = atom<number | null>(82);

export const minSafeDimensionAtom = atom<MinSafeDimensionState>({
  ...defaultMinSafeDimension,
});

export const capacityScenariosAtom = atom<CapacityScenario[]>(
  defaultCapacityScenarios.map((scenario) => ({ ...scenario })),
);

export const alternativesAtom = atom<AlternativeConfigFormValues[]>(
  defaultAlternatives.map((alternative) => ({ ...alternative })),
);

export const activeAlternativeIdAtom = atom<string>(defaultAlternatives[0].id);

export const furthestStepIndexAtom = atom(0);
