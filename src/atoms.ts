import { atom } from 'jotai';
import {
  defaultProjectDetails,
  type ProjectDetailsFormValues,
} from '@/projectDetails';

export const projectDetailsAtom = atom<ProjectDetailsFormValues>({
  ...defaultProjectDetails,
  goals: { ...defaultProjectDetails.goals },
});

export const roadwayWidthFtAtom = atom<number | null>(82);

export const furthestStepIndexAtom = atom(0);
