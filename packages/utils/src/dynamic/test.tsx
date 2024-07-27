import { Dynamic } from "solid-js/web";
import { splitProps, type Component, type ComponentProps, type JSX, type ParentComponent, type Ref, type ValidComponent } from "solid-js";
import type { Simplify } from "@solid-primitives/utils";
import { mergeRefs } from "@solid-primitives/refs";

type ButtonVariant = "elevated" | "filled" | "tonal" | "outlined" | "text";

type ButtonSelfProps<Host extends ValidButtonHost> = {
  as?: Host;

  variant: ButtonVariant;
  icon?: JSX.Element;
  label: JSX.Element;
}

type ButtonHostProps = {
  ref?: Ref<HTMLElement>;
  class?: string;
  children?: JSX.Element;
}

type OverrideProps<T, P> = Omit<T, keyof P> & P;
type OverridePropsMerge<T, P, K extends keyof T> = OverrideProps<OverrideProps<T, P>, Pick<T, K>>;
type ButtonPassthroughProps<T extends ValidButtonHost> = Omit<
  OverridePropsMerge<
    ComponentProps<T>,
    ButtonHostProps,
    "ref"
  >,
  "children"
>;

type ValidateButtonProps<Host extends ValidButtonHost, T = ComponentProps<Host>> = {
  [P in keyof T as P extends keyof ButtonHostProps ? T[P] extends ButtonHostProps[P] ? P : never : never]: true;
}

type ValidButtonHost =
  | keyof JSX.IntrinsicElements
  | Component<{} & ButtonHostProps>;

type ButtonProps<
  Host extends ValidButtonHost
> = OverrideProps<
  ButtonPassthroughProps<Host>,
  ButtonSelfProps<Host>
>;

const Button = <
  T extends ValidButtonHost = "button"
>(
  props: ButtonProps<T>
): JSX.Element => {
  const [local, others] = splitProps(
    props,
    ["as", "ref", "icon", "label"],
  );

  let ref!: HTMLElement;

  return (
    <Dynamic
      component={local.as ?? "button"}
      ref={mergeRefs(element => ref = element, local.ref as any)}
      {...others}>
        <span>{local.label}</span>
    </Dynamic>
  )
}
