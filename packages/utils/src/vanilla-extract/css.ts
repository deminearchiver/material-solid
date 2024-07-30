
export const fontVariationSettings = (settings: Record<string, string | number>) => {
  return Object.entries(settings)
    .map(([axis, value]) => `"${axis}" ${value}`)
    .join(", ");
}
