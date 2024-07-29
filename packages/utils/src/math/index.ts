export const normalize = (
  value: number,
  min: number,
  max: number
) => (value - min) / (max - min);

export const clamp = (
  value: number,
  min: number,
  max: number,
) =>  Math.min(Math.max(value, min), max);

export const normalizeClamp = (
  value: number,
  min: number,
  max: number,
) => normalize(clamp(value, min, max), min, max);
