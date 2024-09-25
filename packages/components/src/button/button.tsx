// import { type JSX, createMemo, createSignal, splitProps, type ParentComponent, type Signal, Show, type ValidComponent, type Ref, type ComponentProps } from "solid-js";
// import { Ripple} from "../ripple";
// import { buttonControlStyle, buttonOutlineStyle, buttonStyle } from "./button.css";
// import clsx from "clsx/lite";
// import { Dynamic, type DynamicProps, type ElementOf, type OverrideProps } from "../dynamic";
// import { Focus } from "../focus";
// import { mergeRefs } from "@solid-primitives/refs";



// type ButtonVariant = "elevated" | "filled" | "tonal" | "outlined" | "text";
// // export type ButtonProps = {
// //   disabled?: boolean;
// //   variant: ButtonVariant;
// //   leading?: JSX.Element;
// //   trailing?: JSX.Element;
// // } & (
// //   | JSX.ButtonHTMLAttributes<HTMLButtonElement>
// //   | JSX.AnchorHTMLAttributes<HTMLAnchorElement>
// // );




// // export type ButtonProps<
// //   T extends keyof JSX.HTMLElementTags = "button",
// // > = OverrideProps<
// //   ComponentProps<T>,
// //   {
// //     as?: T;
// //     ref?: Ref<ElementOf<T>>;
// //     variant: ButtonVariant;
// //     disabled?: boolean;
// //     leading?: JSX.Element;
// //     trailing?: JSX.Element;
// //     children: JSX.Element;
// //   }
// // >;
// export type ButtonProps<
//   T extends keyof JSX.HTMLElementTags,
//   P = ComponentProps<T>,
// > = OverrideProps<
//   P,
//   {
//     variant: ButtonVariant;
//   }
// >;

// export const Button = <
//   T extends keyof HTMLElementTagNameMap
// >(props: ButtonProps<T>) => {
//   const [local, others] = splitProps(
//     props,
//     [
//       // "as",
//       "ref",
//       "class",
//       // "variant",
//       // "leading",
//       // "trailing",
//       // "children",
//     ],
//   );

//   const [ref, setRef] = createSignal() as Signal<HTMLElement>;

//   return (
//     <Dynamic
//       as={local.as ?? "button"}
//       ref={mergeRefs(setRef, local.ref)}
//       class={clsx(
//         buttonStyle({
//           leading: !!local.leading,
//           trailing: !!local.trailing,
//           variant: local.variant,
//           disabled: local.disabled,
//         }),
//         local.class,
//       )}
//       {...({ disabled: local.disabled })}
//       {...others}>
//         <Focus for={ref} />
//         <Ripple for={ref} disabled={local.disabled} />
//         <Show when={props.leading}>
//           <div class={buttonControlStyle}>{local.leading}</div>
//         </Show>
//         {local.children}
//         <Show when={props.trailing}>
//           <div class={buttonControlStyle}>{local.trailing}</div>
//         </Show>
//         <Show when={local.variant === "outlined"}>
//           <div class={buttonOutlineStyle({ disabled: local.disabled })} />
//         </Show>
//     </Dynamic>
//   );
// }

import { createMemo, createSignal, mergeProps, Show, splitProps, type Component, type ComponentProps, type JSX, type Signal } from "solid-js";
import { useButtonTheme, type ButtonVariants } from "./theme";
import { Dynamic } from "solid-js/web";
import { clsx } from "clsx/lite";
import { Ripple } from "../ripple";
import { mergeRefs } from "@solid-primitives/refs";
import { Focus } from "../focus";
import { buttonIconStyle, buttonOutlineStyle, buttonStyle } from "./button.css";
import { MaterialSymbolController } from "../icon";

const BUTTON_VARIANTS = [
  "elevated",
  "filled",
  "filledTonal",
  "outlined",
  "text",
] as const;
type ButtonVariant = typeof BUTTON_VARIANTS[number];

type ButtonBaseProps<T extends keyof JSX.HTMLElementTags> = {
  as?: T;
  disabled?: boolean;
  icon?: JSX.Element;
  iconAffinity?: "leading" | "trailing";
  label: JSX.Element;
}

type ButtonVariantProps<
  T extends keyof JSX.HTMLElementTags,
  P = Omit<JSX.HTMLElementTags[T], "children">,
> = P & ButtonBaseProps<T>;

const BUTTON_INPUT_TYPES = ["button", "color", "file", "image", "reset", "submit"]
type ButtonFullProps<T extends keyof JSX.HTMLElementTags> = ButtonVariantProps<T> & {
  variant: ButtonVariant;
}
const Button = <
  T extends keyof JSX.HTMLElementTags = "button",
>(props: ButtonFullProps<T>): JSX.Element => {
  const mergedProps = mergeProps(
    { iconAffinity: "leading" as const },
    props,
  );
  const [local, others] = splitProps(
    mergedProps as any,
    [
      "variant",
      "as",
      "class",
      "ref",
      "disabled",
      "icon",
      "iconAffinity",
      "label"
    ]
  );

  const [ref, setRef] = createSignal() as Signal<HTMLElement>;

  const tag = () => local.as ?? "button";

  const isButton = createMemo(() => {
    if(tag() === "button") return true;
    if (tag() === "input") {
      const type: string | undefined = others.type;
      if(!type) return false;
      return BUTTON_INPUT_TYPES.indexOf(type) !== -1;
    }
    return false;
  });

  return (
    // @ts-ignore
    <Dynamic
      component={tag()}
      ref={mergeRefs(setRef, local.ref as any)}
      class={
        clsx(
          buttonStyle({
            iconAffinity: !!local.icon ? local.iconAffinity : undefined,
            variant: local.variant,
            disabled: local.disabled,
          }),
          local.class,
        )
      }
      {...(tag() === "button" && { disabled: local.disabled })}
      type={isButton() ? "button" : undefined}
      role={!isButton() ? "button" : undefined}
      aria-disabled={local.disabled}

      {...others}>
        <Focus for={ref} />
        <Ripple for={ref} />
        <Show when={local.icon && local.iconAffinity === "leading"}>
          <MaterialSymbolController
            class={buttonIconStyle}
            children={local.icon} />
        </Show>
        {local.label}
        <Show when={local.icon && local.iconAffinity === "trailing"}>
          <MaterialSymbolController
            class={buttonIconStyle}
            children={local.icon} />
        </Show>
        <div class={
          buttonOutlineStyle({
            variant: local.variant,
            disabled: local.disabled,
          })
        } />
    </Dynamic>
  );
}

/**
 * @category Component
 */
const proxy = new Proxy(
  Button,
  {
    get: (target, variant, receiver) => {
      if(!BUTTON_VARIANTS.includes(variant as any)) return;
      const component: ButtonVariantComponent = <
        T extends keyof JSX.HTMLElementTags
      >(props: ButtonVariantProps<T>) => {
        return (
          <Button
            variant={variant as ButtonVariant}
            {...props} />
        )
      };
      return component;
    },
  }
) as ButtonComponent;

type ButtonVariantComponent = <
  T extends keyof JSX.HTMLElementTags,
>(
  props: ButtonVariantProps<T>,
) => JSX.Element;


type ButtonComponent =
  & typeof Button
  & {
    [Variant in ButtonVariant]: ButtonVariantComponent;
  };

export {
  proxy as Button,
}
