import clsxLite from "clsx/lite";
import { createEffect, type Accessor, type JSX } from "solid-js";
import { tryOnCleanup, type Directive } from "@solid-primitives/utils";

export type ClassValue = string | boolean | null | undefined;

/**
 * Ideal for applications that only use the string-builder pattern.
 *
 * Any non-string arguments are ignored!
 *
 * @see [`clsx/lite`](https://github.com/lukeed/clsx?tab=readme-ov-file#clsxlite)
 */
export const clsx = clsxLite as (...inputs: ClassValue[]) => string;

// export const clsx: Directive<ClassValue[]> = (target, classList) => {
//   createEffect(() => {
//     const classes = clsx(...classList());
//     target.classList.add()
//     tryOnCleanup()
//   });
// }
