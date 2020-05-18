import {VariableComplexity} from './variable-complexity';
import {MethodComplexity} from './method-complexity';

export interface Line {
  lineNo: number;
  data: string;
  cs: number;
  ctc: number;
  cnc: number;
  ci: number;
  cps: number;
  tw: number;
  cr: number;
  variableComplexity: VariableComplexity;
  methodComplexity: MethodComplexity;
}
