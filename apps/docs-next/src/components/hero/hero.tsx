import { Button } from "@material-solid/components/button";
import { MaterialSymbol } from "@material-solid/components/icon";
import { children, mergeProps, Show, splitProps, type Component, type JSX } from "solid-js";
import { heroActionsStyle, heroContentStyle, heroHeadlineStyle, heroStyle, heroSubtitleStyle } from "./hero.css";

export type HeroProps = {
  headline: JSX.Element;
  subtitle: JSX.Element;
  actions?: JSX.Element;
}

export const Hero: Component<HeroProps> = (props) => {
  const mergedProps = mergeProps(
    {},
    props,
  );
  const [, local] = splitProps(
    mergedProps,
    [],
  );

  const actions = children(() => local.actions);

  return (
    <section class={heroStyle}>
      <div class={heroContentStyle}>
        <div>
          <h1 class={heroHeadlineStyle}>
            {local.headline}
          </h1>
          <p class={heroSubtitleStyle}>
            {local.subtitle}
          </p>
          <Show when={actions.toArray().length > 0}>
            <div class={heroActionsStyle}>
              {actions()}
            </div>
          </Show>
        </div>
      </div>
    </section>
  );
}
