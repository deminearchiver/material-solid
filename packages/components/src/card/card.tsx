import { splitProps, type JSX, type ParentComponent } from "solid-js";
import { cardBackgroundStyle, cardOutlineStyle, cardStyle } from "./card.css";
import clsx from "clsx/lite";

export type CardVariant = typeof CARD_VARIANTS[number];

export type CardVariantProps = JSX.HTMLAttributes<HTMLElement>;
export type CardProps = {
  variant: CardVariant;
} & CardVariantProps;

const Card: ParentComponent<CardProps> = (props) => {
  const [localProps, otherProps] = splitProps(
    props,
    ["variant", "class", "children"],
  );
  return (
    <div
      class={clsx(cardStyle, localProps.class)}
      {...otherProps as JSX.HTMLAttributes<HTMLDivElement>}>
        <div class={
          cardBackgroundStyle({
            variant: localProps.variant,
          })
        } />
        {localProps.children}
        <div class={
          cardOutlineStyle({
            variant: localProps.variant,
          })
        } />
    </div>
  )
}

type CardVariantComponent = ParentComponent<CardVariantProps>;

const CARD_VARIANTS = ["elevated", "filled", "outlined"] as const;

type CardComponent =
  & typeof Card
  & {
    [Variant in CardVariant]: CardVariantComponent;
  };


const proxy = new Proxy(
  Card,
  {
    get(target, variant, receiver) {
      if(!CARD_VARIANTS.includes(variant as any)) return;
      const component: CardVariantComponent = (props) => {
        return (
          <Card
            variant={variant as CardVariant}
            {...props} />
        );
      };
      return component;
    },
  },
) as CardComponent;

export {
  proxy as Card,
}
