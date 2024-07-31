import { createContext, createEffect, on, splitProps, useContext, type Component, type JSX } from "solid-js"
import { handleContainerStyle, handleStyle, inputStyle, switchStyle, trackStyle } from "./switch.css";

const SwitchContext = createContext();
const useSwitchContext = () => useContext(SwitchContext);

export type SwitchProps = {
  onChanged?: (value: boolean) => void;
  value: boolean;

  unselectedIcon?: JSX.Element;
  selectedIcon?: JSX.Element;
}

export const Switch: Component<SwitchProps> = (props) => {
  const [, local] = splitProps(props, []);

  let inputRef!: HTMLInputElement;

  let handleRef!: HTMLElement;

  createEffect(on(
    () => local.value,
    (selected, prev) => {
      if(prev === undefined) return;
      handleRef.animate(
        [{
          width: "32px",
          height: "20px",
          offset: 0.5
        }],
        {
          duration: 300,
          fill: "none",
          easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }
      )

      // handleRef.animate(
      //   {
      //     width: handleRef.style.width,
      //   }
      // );
    },
  ));

  return (
    <div class={switchStyle()}>
      <input
        ref={inputRef}
        class={inputStyle}
        type="checkbox"
        role="switch"
        checked={local.value} />
      <div
        class={
          trackStyle({
            selected: local.value,
          })
        }>
          <div
            class={
              handleContainerStyle({
                selected: local.value,
              })
            }>

            <div ref={handleRef as HTMLDivElement} class={
              handleStyle({
                selected: local.value
              })
            }>

            </div>
          </div>
      </div>
    </div>
  )
}
