import { createToken, resolveTokens } from "@solid-primitives/jsx-tokenizer"
import { For, type FlowComponent, type JSX } from "solid-js";

type TabTokenProps = {
  icon?: JSX.Element;
  label: JSX.Element;
  children: JSX.Element;
}

const TabToken = createToken<TabTokenProps>();

export {
  type TabTokenProps as ViewTabProps,
  TabToken as ViewTab,
}



export type TabBarViewProps = {

}
export const TabBarView: FlowComponent<TabBarViewProps> = (props) => {
  const tokens = resolveTokens(TabToken, () => props.children);
  return (
    <div>
      <For each={tokens()}>{
        (token, index) => (
          <div>
            {token.data.children}
          </div>
        )
      }</For>
    </div>
  );
}
