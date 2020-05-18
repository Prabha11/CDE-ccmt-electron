import {Injectable} from '@angular/core';
import {VariableComplexity} from '../model/variable-complexity';
import {MethodComplexity} from '../model/method-complexity';

@Injectable({
  providedIn: 'root',
})
export class WeightService {
  static weightValuesForSize = {
    Keyword: 1,
    Identifier: 1,
    Operator: 1,
    NumericalValue: 1,
    StringLiteral: 1,
  };

  private static _weightValuesForVariables = {
    GlobalVariable: 2,
    LocalVariable: 1,
    PrimitiveDataTypeVariable: 1,
    CompositeDataTypeVariable: 2,
  };

  private static _weightValuesForMethods = {
    MethodWithAPrimitiveReturnType: 1,
    MethodWithACompositeReturnType: 2,
    MethodWithAVoidReturnType: 0,
    PrimitiveDataTypeParameter: 1,
    CompositeDataTypeParameter: 2,
  };

  static weightValuesForInheritance = {
    no: 0,
    one: 1,
    two: 2,
    three: 3,
    more: 4,
  };

  static weightValuesForCoupling = {
    Arecursivecall: 2,
    Aregularmethodcallinganotherregularmethodinthesamefile: 2,
    Aregularmethodcallinganotherregularmethodinadifferentfile: 3,
    Aregularmethodcallingarecursivemethodinthesamefile: 3,
    Aregularmethodcallingarecursivemethodinadifferentfile: 4,
    Arecursivemethodcallinganotherrecursivemethodinthesamefile: 4,
    Arecursivemethodcallinganotherrecursivemethodinadifferentfile: 5,
    Arecursivemethodcallingaregularmethodinthesamefile: 3,
    Arecursivemethodcallingaregularmethodinadifferentfile: 4,
    Aregularmethodreferencingaglobalvariableinthesamefile: 1,
    Aregularmethodreferencingaglobalvariableinadifferentfile: 2,
    Arecursivemethodreferencingaglobalvariableinthesamefile: 1,
    Arecursivemethodreferencingaglobalvariableinadifferentfile: 2,
  };

  static weightValuesForControlStructure = {
    Aconditionalcontrolstructuresuchasaniforelseifcondition: 2,
    Aniterativecontrolstructuresuchasaforwhileordowhileloop: 3,
    Theswitchstatementinaswitchcasecontrolstructure: 2,
    Eachcasestatementinaswitchcasecontrolstructure: 1,
  };

  constructor() {
  }

  static setWeightValuesForVariables(weightValuesForVariables) {
    this._weightValuesForVariables.GlobalVariable = weightValuesForVariables.GlobalVariable;
    this._weightValuesForVariables.LocalVariable = weightValuesForVariables.LocalVariable;
    this._weightValuesForVariables.PrimitiveDataTypeVariable = weightValuesForVariables.PrimitiveDataTypeVariable;
    this._weightValuesForVariables.CompositeDataTypeVariable = weightValuesForVariables.CompositeDataTypeVariable;
  }


  static setWeightValuesForMethods(value:
                                      {
                                        MethodWithACompositeReturnType: number;
                                        CompositeDataTypeParameter: number;
                                        MethodWithAPrimitiveReturnType: number;
                                        PrimitiveDataTypeParameter: number;
                                        MethodWithAVoidReturnType: number
                                      }) {
    this._weightValuesForMethods = value;
  }


  static get weightValuesForVariables():
    {
      GlobalVariable: number;
      PrimitiveDataTypeVariable: number;
      CompositeDataTypeVariable: number;
      LocalVariable: number
    } {
    return this._weightValuesForVariables;
  }

  static get weightValuesForMethods():
    {
      MethodWithACompositeReturnType: number;
      CompositeDataTypeParameter: number;
      MethodWithAPrimitiveReturnType: number;
      PrimitiveDataTypeParameter: number;
      MethodWithAVoidReturnType: number
    } {
    return this._weightValuesForMethods;
  }

  static getComplexityDueToVariable(variableComplexity: VariableComplexity): number {
    let Wvs = 0;
    if (variableComplexity.scopeGlobal === 1) Wvs = this._weightValuesForVariables.GlobalVariable;
    else if (variableComplexity.scopeLocal === 1) Wvs = this._weightValuesForVariables.LocalVariable;

    return Wvs * (
      this._weightValuesForVariables.CompositeDataTypeVariable * variableComplexity.numberOfCompositeDataTypeVariables
      +
      this._weightValuesForVariables.PrimitiveDataTypeVariable * variableComplexity.numberOfPrimitiveDataTypeVariables);
  }

  static getComplexityDueToMethod(methodComplexity: MethodComplexity): number {
    let Wmrt: number = 0;
    if (methodComplexity.returnType === 0) Wmrt = this._weightValuesForMethods.MethodWithAVoidReturnType;
    else if (methodComplexity.returnType === 1) Wmrt = this._weightValuesForMethods.MethodWithAPrimitiveReturnType;
    else if (methodComplexity.returnType === -1) Wmrt = this._weightValuesForMethods.MethodWithACompositeReturnType;

    return (Wmrt +
      (this._weightValuesForMethods.PrimitiveDataTypeParameter * methodComplexity.numberOfPrimitiveDataTypeParameters)
      +
      (this._weightValuesForMethods.CompositeDataTypeParameter * methodComplexity.numberOfCompositeDataTypeParameters));
  }
}
