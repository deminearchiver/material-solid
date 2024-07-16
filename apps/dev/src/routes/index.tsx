import { Title } from "@solidjs/meta";
import { createEffect, createSignal, onMount, type Component } from "solid-js";

import { SegmentedButton, ButtonSegment } from "../../../../packages/components/src/segmented-button";
import { MaterialSymbol } from "../../../../packages/components/src/icon";
import { useTheme, type ThemeMode } from "~/components/theme";

import { Slider, type SliderElement } from "../../../../packages/components/src/slider";
const Home: Component = () => {

  const [selected, setSelected] = createSignal(1);
  const { theme, setTheme } = useTheme()!;

  const [value, setValue] = createSignal(50);
  return (
    <main>
      <Title>Hello World</Title>

      <div style={{
        "padding-inline": "56px",
      }}>
        <Slider
          to={100}
          value={value()}
          valueFormatter={value => Math.round(value)}
          labelFormatter={value => `${value} px`}
          onChanged={value => setValue(value)} />
      </div>
    </main>
  );
}

export default Home;
