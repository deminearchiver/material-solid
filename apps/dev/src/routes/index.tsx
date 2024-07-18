import { Title } from "@solidjs/meta";
import { createEffect, createSignal, onMount, type Component } from "solid-js";

import { useTheme, type ThemeMode } from "~/components/theme";

import { Slider, type SliderElement } from "@material-solid/components/slider";
import { Tab, TabBar } from "@material-solid/components/tabs";
const Home: Component = () => {

  const [selected, setSelected] = createSignal(1);
  const { theme, setTheme } = useTheme()!;

  const [value, setValue] = createSignal(50);

  const [tab, setTab] = createSignal(0);

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
      <TabBar.primary onPositionChanged={setTab} position={tab()}>
        <Tab
          label="First" />
        <Tab
          label="Second" />
        <Tab
          label="Third" />
        <Tab
          label="Fourth" />
        <Tab
          label="Fifth" />
      </TabBar.primary>
      <TabBar.secondary onPositionChanged={setTab} position={tab()}>
        <Tab
          label="First" />
        <Tab
          label="Second" />
        <Tab
          label="Third" />
        <Tab
          label="Fourth" />
        <Tab
          label="Fifth" />
      </TabBar.secondary>
    </main>
  );
}

export default Home;
