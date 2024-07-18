export * from "./refs";
export * from "./multi-provider";
export * from "./create-accumulating-animation";

export const getVarName = (variable: string) => {
  const matches = variable.match(/^var\((.*)\)$/);
  return matches ? matches[1] : variable;
}


