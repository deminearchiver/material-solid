import type { RouteSectionProps } from "@solidjs/router";
import { createSignal, type Component } from "solid-js";

import { TabBar, Tab } from "@material-solid/components/tabs";
import { MaterialSymbol } from "@material-solid/components/icon";
import { Title } from "@solidjs/meta";

export const Dev: Component<RouteSectionProps> = (props) => {
  const [pos, setPos] = createSignal(0);

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

  return (
    <>
      <Title>&lt;dev&gt; Material Solid</Title>
      <main>
        <TabBar.primary position={pos()} onPositionChanged={setPos}>
          {tabs}
        </TabBar.primary>
        <TabBar.secondary position={pos()} onPositionChanged={setPos}>
          {tabs}
        </TabBar.secondary>
      </main>
    </>
  )
}
