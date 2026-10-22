import { atom } from 'jotai';

export const submittedNameAtom = atom<string | null>(null);

export const furthestStepIndexAtom = atom(0);
