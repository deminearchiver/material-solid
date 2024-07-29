import { type JSX, type Context, type Component } from "solid-js";
export type MultiProviderItem<T extends unknown> = T extends Component<infer U extends {
    children?: JSX.Element;
}> ? Partial<U> extends U ? Omit<U, "children"> extends Record<string, never> ? T : T | [provider: T, props?: Omit<U, "children">] : [provider: T, props: Omit<U, "children">] : T extends Context<infer V> ? [context: T, value: V] : never;
/**
 * @interface
 */
export type MultiProviderProps<T extends readonly [unknown, ...unknown[]]> = {
    providers: {
        [K in keyof T]: MultiProviderItem<T[K]>;
    };
    children: JSX.Element;
};
export declare const MultiProvider: <T extends readonly [unknown, ...unknown[]]>(props: MultiProviderProps<T>) => JSX.Element;
