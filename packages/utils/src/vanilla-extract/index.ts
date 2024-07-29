
export const getVarName = (variable: string) => {
  const matches = variable.match(/^var\((.*)\)$/);
  return matches ? matches[1] : variable;
}

export const fontVariationSettings = (settings: Record<string, string | number>) => {
  return Object.entries(settings)
    .map(([axis, value]) => `"${axis}" ${value}`)
    .join(", ");
}
