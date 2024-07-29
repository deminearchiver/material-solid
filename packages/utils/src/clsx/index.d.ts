export type ClassValue = string | boolean | null | undefined;
/**
 * Ideal for applications that only use the string-builder pattern.
 *
 * Any non-string arguments are ignored!
 *
 * @see [`clsx/lite`](https://github.com/lukeed/clsx?tab=readme-ov-file#clsxlite)
 */
export declare const clsx: (...inputs: ClassValue[]) => string;
