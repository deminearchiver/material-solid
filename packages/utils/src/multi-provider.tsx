import { createComponent, type JSX, type Context, type Component, type ParentComponent, type FlowProps, type ContextProviderComponent } from "solid-js";

type MultiProviderItem<T extends unknown> =
  T extends Component<infer U extends { children?: JSX.Element }>
    ? Partial<U> extends U
      ? Omit<U, "children"> extends Record<string, never>
        ? T
        : T | [provider: T, props?: Omit<U, "children">]
      : [provider: T, props: Omit<U, "children">]
    : T extends Context<infer V>
      ? [context: T, value: V]
      : never;

export type MultiProviderProps<T extends readonly [unknown, ...unknown[]]> = {
  providers: {
    [K in keyof T]: MultiProviderItem<T[K]>;
  };
  children: JSX.Element;
}

const isContext = <T,>(
  item: unknown
): item is Context<T> => typeof item !== "function";

export const MultiProvider = <
  T extends readonly [unknown, ...unknown[]]
>(props: MultiProviderProps<T>): JSX.Element => {
  const { providers } = props;

  const resolveContexts = (index: number) => {
    const item: any = providers[index];

    if (!item) return props.children;

    const baseProps: FlowProps = {
      get children() {
        return resolveContexts(index + 1);
      },
    };

    if (Array.isArray(item)) {
      const contextOrProvider = item[0];
      const value = item[1];

      return isContext(contextOrProvider)
        ? createComponent(
          contextOrProvider.Provider,
          Object.assign(baseProps, { value }),
        )
        : createComponent(
          contextOrProvider,
          Object.assign(baseProps, value ?? {}),
        );
    }
    return createComponent(
      isContext(item) ? item.Provider : item,
      baseProps,
    );
  };
  return resolveContexts(0);
}
