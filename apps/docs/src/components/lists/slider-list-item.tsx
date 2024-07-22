import { Slider, type SliderProps } from "@material-solid/components/slider";
import { type JSX, splitProps, type Component, Show } from "solid-js";
import { containerStyle, labelStyle, materialSymbolStyle } from "./slider-list-item.css";
import { MaterialSymbolController } from "@material-solid/components/icon";


export type SliderListItemProps =
  & SliderProps
  & {
    icon: JSX.Element;
    label: JSX.Element;
  }

export const SliderListItem: Component<SliderListItemProps> = (props) => {
  const [local, others] = splitProps(
    props,
    [
      "icon",
      "label",
    ]
  );

  return (
    <div class={containerStyle}>
      <Show when={local.icon}>
        <MaterialSymbolController class={materialSymbolStyle}>
          {local.icon}
        </MaterialSymbolController>
      </Show>
      <label class={labelStyle}>
        {local.label}
        <Slider {...others} />
      </label>
    </div>
  );
}
