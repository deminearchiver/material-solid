import type { MaterialSymbol as MaterialSymbolName } from "material-symbols";
import { type JSX, type Component, splitProps, createContext, type Accessor, createMemo, type ParentComponent, useContext, type FlowComponent, createEffect } from "solid-js";
import { materialSymbolStyle, materialSymbolTheme } from "./material-symbol.css";
import { createContextProvider } from "@solid-primitives/context";
import { access, asAccessor, type MaybeAccessor } from "@solid-primitives/utils";
import clsx from "clsx/lite";
import { assignInlineVars } from "@vanilla-extract/dynamic";

export type MaterialSymbolVariant = "rounded" | "sharp";

export type MaterialSymbolVariantProps = {
  name: MaterialSymbolName | (string & {});
  fill?: number;
} & Omit<JSX.HTMLAttributes<HTMLElement>, "children">;
export type MaterialSymbolProps =
  MaterialSymbolVariantProps & {
    variant?: MaterialSymbolVariant;
  };

const MaterialSymbolBase: Component<MaterialSymbolProps> = (props) => {
  const controller = useMaterialSymbolController();

  const [local, others] = splitProps(
    props,
    ["variant", "name", "class", "fill"],
  );

  const variant = createMemo(() => {
    const variant = local.variant ?? controller?.defaultVariant();
    if(!variant) {
      throw new Error(
        "Cannot have a default variant without an ancestor `MaterialSymbolController`"
      );
    }
    return variant;
  });

  const className = createMemo(() => {
    return clsx(
      materialSymbolStyle({
        variant: variant(),
      }),
      controller?.class(),
      local.class,
    );
  });


  return (
    <span
      class={className()}
      style={
        assignInlineVars({
          [materialSymbolTheme.fill]: local.fill?.toString(),
        })
      }
      {...others}
      children={local.name} />
  );
};

const materialSymbolFactory = (variant: MaterialSymbolVariant) => {
  return (props: MaterialSymbolVariantProps) => (
    <MaterialSymbolBase variant={variant} {...props} />
  );
}


export const MaterialSymbol = Object.assign(
  MaterialSymbolBase,
  {
    rounded: materialSymbolFactory("rounded"),
    sharp: materialSymbolFactory("sharp"),
  },
);




type MaterialSymbolControllerProps = {
  defaultVariant?: MaterialSymbolVariant;
  class?: string;
}
type MaterialSymbolData = {
  defaultVariant: Accessor<MaterialSymbolVariant | undefined>;
  class: Accessor<string | undefined>;
}

const MaterialSymbolControllerContext = createContext<MaterialSymbolData>();
const useMaterialSymbolController = () => useContext(MaterialSymbolControllerContext);
export const MaterialSymbolController: ParentComponent<MaterialSymbolControllerProps> = (props) => {
  const ancestor = useMaterialSymbolController();
  return (
    <MaterialSymbolControllerContext.Provider
      value={{
        defaultVariant: () => props.defaultVariant ?? ancestor?.defaultVariant(),
        class: () => props.class ?? ancestor?.class(),
      }}
      children={props.children} />
  );
}
