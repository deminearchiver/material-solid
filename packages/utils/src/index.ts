export * from "./refs";
export * from "./multi-provider";
export * from "./create-accumulating-animation";
export * from "./math";


export const getVarName = (variable: string) => {
  const matches = variable.match(/^var\((.*)\)$/);
  return matches ? matches[1] : variable;
}




