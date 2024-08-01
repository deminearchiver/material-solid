import { createToken, resolveTokens } from "@solid-primitives/jsx-tokenizer"
import { For, splitProps, type FlowComponent, type JSX } from "solid-js";


export type FeatureProps = {
  headline: string;
  actions?: JSX.Element;
  children: JSX.Element;
}
export const Feature = createToken<FeatureProps>();



export const Features: FlowComponent = (props) => {
  const [, local] = splitProps(props, []);
  const tokens = resolveTokens(Feature, () => local.children);

  return (
    <section>
      <div>
        <For each={tokens()}>{
          ({ data: feature }) => (
            <article>
              <h2>{feature.headline}</h2>
              <div>{feature.children}</div>
              <div>{feature.actions}</div>
            </article>
          )
        }</For>
      </div>
    </section>
  );
}
