import { atom } from 'jotai';
import { defaultCapacityScenarios, type CapacityScenario } from '@/capacity';
import {
  defaultProjectDetails,
  type ProjectDetailsFormValues,
} from '@/projectDetails';

export const projectDetailsAtom = atom<ProjectDetailsFormValues>({
  ...defaultProjectDetails,
  goals: { ...defaultProjectDetails.goals },
});

export const roadwayWidthFtAtom = atom<number | null>(82);

export const capacityScenariosAtom = atom<CapacityScenario[]>(
  defaultCapacityScenarios.map((scenario) => ({ ...scenario })),
);

export const furthestStepIndexAtom = atom(0);
