export interface Form {
  id: string;
  name: string;
  elements: Element[];
}

export interface Element {
  id: string;
  label: string;
  type: 'text' | 'checkbox' | 'radio' | 'select';
  isRequired?: boolean;
  options?: Choice[];
  condition?: Condition;
}

export interface Choice {
  id: string;
  label: string;
}

export interface Condition {
  targetElementId: string;
  valueToMatch: any;
}


export interface ConditionGroup {
  operator: 'AND' | 'OR';
  conditions: Condition[];
}
