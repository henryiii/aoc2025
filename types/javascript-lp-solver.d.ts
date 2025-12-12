declare module "javascript-lp-solver" {
  export interface LPModel {
    optimize: string;
    opType: "min" | "max";
    constraints: Record<string, { equal?: number; min?: number; max?: number }>;
    variables: Record<string, Record<string, number>>;
    ints?: Record<string, 1>;
  }
  export interface LPSolution {
    feasible: boolean;
    result: number;
    bounded?: boolean;
    isIntegral?: boolean;
    [key: string]: number | boolean | undefined;
  }
  export function Solve(model: LPModel): LPSolution;
  const _default: { Solve: typeof Solve };
  export default _default;
}

declare interface LPModel {
  optimize: string;
  opType: "min" | "max";
  constraints: Record<string, { equal?: number; min?: number; max?: number }>;
  variables: Record<string, Record<string, number>>;
  ints: Record<string, 1>;
}
