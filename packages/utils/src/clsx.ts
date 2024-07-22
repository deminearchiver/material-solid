import clsxLite from "clsx/lite"

export type ClassValue = string | boolean | null | undefined;

/**
 * Ideal for applications that only use the string-builder pattern.
 *
 * Any non-string arguments are ignored!
 *
 * @see [`clsx/lite`](https://github.com/lukeed/clsx?tab=readme-ov-file#clsxlite)
 */
export const clsx = clsxLite as (...inputs: ClassValue[]) => string;
