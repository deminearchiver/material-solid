import { MaterialSymbol } from "@material-solid/components/icon";
import { Slider, type SliderElement } from "@material-solid/components/slider";
import { createSignal, onMount, type Component } from "solid-js";
import { THEME } from "~/theme";

export const Components: Component = () => {
  const [brightness, setBrightness] = createSignal(50);

  return (
    <main>
        <Slider
          onChanged={setBrightness}
          value={brightness()}
          from={0}
          to={100}
          valueFormatter={value => Math.round(value)} />
    </main>
  );
}
