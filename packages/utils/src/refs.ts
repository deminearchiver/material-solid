export type Ref<T> = T | RefCallback<T>;

export type RefCallback<T> = (value: T) => void;

/**
 * Assigns the provided value to a SolidJS ref
 *
 * @example
 * ```tsx
 * import type { Component, ParentComponent } from "solid-js";
 * import { type Ref, assignRef } from "@material-solid/utils"
 *
 * type LoggerElement = {
 *   info: (message: string) => void;
 *   warn: (message: string) => void;
 * }
 * type LoggerProps = {
 *   ref: Ref<LoggerElement>;
 * }
 *
 * const Logger: ParentComponent<LoggerProps> = (props) => {
 *   assignRef(props.ref, {
 *     info: (message) => console.info(message),
 *     warn: (message) => console.warn(message),
 *   });
 *   return props.children;
 * }
 *
 * const App: Component = () => {
 *   let logger!: LoggerElement;
 *
 *   onMount(() => logger.warn("Hello world!"));
 *
 *   return (
 *     <div>
 *       <Logger ref={logger} />
 *     </div>
 *   );
 * }
 * ```
 */
export const assignRef = <T>(
  ref: Ref<T> | undefined,
  value: T,
) => {
  (ref as RefCallback<T> | undefined)?.(value);
}
