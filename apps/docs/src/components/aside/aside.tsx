import { MaterialSymbol } from "@material-solid/components/icon";
import type { Simplify } from "@solid-primitives/utils";
import type { ICustomElement } from "component-register";
import { customElement, noShadowDOM } from "solid-element";
import { createMemo, For, mergeProps, Show, untrack, type Component, type FlowProps, type JSX, type ParentComponent, type ParentProps } from "solid-js";


type AsideVariant = "note" | "tip" | "important" | "warning" | "caution";

export type AsideVariantProps = {
  icon?: JSX.Element;
  label?: JSX.Element;
}

export type CustomAsideProps =
  & AsideVariantProps
  & {
    variant: AsideVariant;
  };




const element = <T,>(
  component: ParentComponent<T>
) => {
  return (props: ParentProps<T>, options?: { element: ICustomElement }) => {
    const mergedProps = mergeProps(
      {
        children: options
          ? () => <For each={options.element.childNodes}>{node => node}</For>
          : undefined,
      },
      props,
    ) as FlowProps<T>;
    return createMemo(() => {
      return untrack(() => component(mergedProps));
    }) as unknown as JSX.Element;
  };
}

const CustomAside = element<CustomAsideProps>((props) => {
  return (
    <aside>
      <p>
        {props.variant}
      </p>
      <section>
        {props.children}
      </section>
    </aside>
  )
});

const asideFactory = (variant: AsideVariant) => {
  const component: ParentComponent<AsideVariantProps> = (props) => {
    return <CustomAside variant={variant} {...props} />
  };
  return component;
}

export const Aside = Object.assign(
  CustomAside,
  {
    note: asideFactory("note"),
    tip: asideFactory("tip"),
    important: asideFactory("important"),
    warning: asideFactory("warning"),
    caution: asideFactory("caution"),
  },
);
