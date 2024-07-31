import { kebabCase } from "scule";

export const getVarName = (variable: string) => {
  const matches = variable.match(/^var\((.*)\)$/);
  return matches ? matches[1] : variable;
}


type CSSVarFunction = `var(--${string})` | `var(--${string}, ${string | number})`;
type Contract = {
    [key: string]: CSSVarFunction | Contract;
};

export const scopedToGlobal = (contract: Contract): Record<string, string> => {
  const vars: Record<string, string> = {};
  const recursive = (record: Contract, ...prefixes: string[]) => {
    for(const key in record) {
      const value = record[key];
      if(value === null || typeof value === "string") {
        const name = `--${prefixes.join("-")}-${kebabCase(key)}`;
        vars[name] = value;
      } else {
        recursive(value, ...prefixes, key);
      }
    }
  }
  recursive(contract);
  return vars;
}
