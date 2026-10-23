export type ImpactMarks = {
  checks?: number;
  crosses?: number;
  neutral?: boolean;
  nearTerm?: {
    checks?: number;
    crosses?: number;
  };
  longTerm?: {
    checks?: number;
    crosses?: number;
  };
};

export type SuggestedEditRow = {
  measure: string;
  feasible: boolean;
  safety: ImpactMarks;
  economic: ImpactMarks;
  environmental: ImpactMarks;
  social: ImpactMarks;
  modeShift: ImpactMarks;
};

export const suggestedEditRows: SuggestedEditRow[] = [
  {
    measure: 'Reduce speeds',
    feasible: true,
    safety: { checks: 2 },
    economic: { neutral: true },
    environmental: { checks: 2 },
    social: { checks: 1 },
    modeShift: { checks: 1 },
  },
  {
    measure: 'Reduce volumes',
    feasible: true,
    safety: { checks: 3 },
    economic: { crosses: 2 },
    environmental: { crosses: 2 },
    social: { checks: 2 },
    modeShift: { checks: 3 },
  },
  {
    measure: 'Widen pedestrian infrastructure',
    feasible: true,
    safety: { checks: 2 },
    economic: { checks: 2 },
    environmental: { checks: 2 },
    social: { checks: 3 },
    modeShift: { checks: 2 },
  },
  {
    measure: 'Widen bike lanes',
    feasible: true,
    safety: { checks: 2 },
    economic: { checks: 2 },
    environmental: { checks: 2 },
    social: { checks: 2 },
    modeShift: { checks: 2 },
  },
  {
    measure: 'Add bus lanes',
    feasible: true,
    safety: { checks: 1, crosses: 1 },
    economic: { checks: 2 },
    environmental: { checks: 2 },
    social: { checks: 2 },
    modeShift: { checks: 3 },
  },
  {
    measure: 'Add median',
    feasible: true,
    safety: { checks: 3, crosses: 3 },
    economic: { checks: 1, crosses: 1 },
    environmental: { checks: 1, crosses: 2 },
    social: { checks: 3 },
    modeShift: { neutral: true },
  },
  {
    measure: 'Add TWLTL',
    feasible: true,
    safety: { checks: 2 },
    economic: { checks: 1 },
    environmental: { crosses: 1 },
    social: { neutral: true },
    modeShift: { crosses: 1 },
  },
  {
    measure: 'Add parking',
    feasible: true,
    safety: { checks: 1, crosses: 1 },
    economic: { checks: 2 },
    environmental: {
      nearTerm: { checks: 2 },
      longTerm: { crosses: 2 },
    },
    social: { checks: 1 },
    modeShift: { crosses: 3 },
  },
  {
    measure: 'Widen travel lanes',
    feasible: true,
    safety: { crosses: 2 },
    economic: { neutral: true },
    environmental: { crosses: 2 },
    social: { crosses: 1 },
    modeShift: { crosses: 1 },
  },
  {
    measure: 'Add travel lanes',
    feasible: true,
    safety: {
      nearTerm: { crosses: 3 },
      longTerm: { crosses: 2 },
    },
    economic: {
      nearTerm: { checks: 1, crosses: 2 },
      longTerm: { crosses: 1 },
    },
    environmental: {
      nearTerm: { checks: 2 },
      longTerm: { crosses: 2 },
    },
    social: { crosses: 2 },
    modeShift: { crosses: 3 },
  },
];
