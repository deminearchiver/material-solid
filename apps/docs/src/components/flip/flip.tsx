import { resolveElements } from "@solid-primitives/refs"
import { splitProps, type FlowComponent } from "solid-js"


export type FlipProps = {

}
export const Flip: FlowComponent<FlipProps> = (props) => {
  const [, local] = splitProps(props, []);
  const children = resolveElements(() => local.children);

  return (
    <></>
  );
}
