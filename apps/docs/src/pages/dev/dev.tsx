import type { RouteSectionProps } from "@solidjs/router";
import { createEffect, createSignal, type Component } from "solid-js";

import { TabBar, Tab } from "@material-solid/components/tabs";
import { MaterialSymbol } from "@material-solid/components/icon";
import { Title } from "@solidjs/meta";
import { SearchBar } from "~/components/search";

import { FilledTextField } from "@material-solid/components/text-field";

export const Dev: Component<RouteSectionProps> = (props) => {
  const [position, setPosition] = createSignal(0);

  const tabs = <>
    <Tab
      icon={<MaterialSymbol name="flight" />}
      label="Flights" />
    <Tab
      icon={<MaterialSymbol name="trip" />}
      label="Trips" />
    <Tab
      icon={<MaterialSymbol name="explore" />}
      label="Explore" />
    <Tab
      icon={<MaterialSymbol name="travel_explore" />}
      label="Discover" />
  </>;

  const [username, setUsername] = createSignal("");

  return (
    <>
      <Title>&lt;dev&gt; Material Solid</Title>
      <main>
        <TabBar.primary position={position()} onPositionChanged={setPosition}>
          {tabs}
        </TabBar.primary>
        <TabBar.secondary position={position()} onPositionChanged={setPosition}>
          {tabs}
        </TabBar.secondary>

        <div style={{ "padding": "16px", display: "flex", "flex-direction": "column", gap: "16px", }}>
          <SearchBar />

          <FilledTextField
            label="Label"
            value={username()}
            onInput={event => setUsername(event.currentTarget.value)} />
        </div>
      </main>
    </>
  )
}
