import { Title } from "@solidjs/meta";
import { TopAppBar } from "~/components/app-bar";

import { IconButton } from "@material-solid/components/icon-button";

import { createScrollPosition } from "@solid-primitives/scroll";
import { MaterialSymbol } from "@material-solid/components/icon";
import { Hero } from "~/components/hero";
import { ThemePanelTrigger } from "~/components/theme";
import { Button } from "@material-solid/components/button";
import { SimpleIcons } from "~/components/icon";

export default function Index() {
  return (
    <>
      <Title>Components | Material Solid</Title>

      <TopAppBar.large
        leading={<IconButton><MaterialSymbol name="menu" /></IconButton>}
        headline="Material Solid"
        actions={<>
          <IconButton>
            <MaterialSymbol name="help" />
          </IconButton>
          <IconButton href="https://github.com/deminearchiver/material-solid" target="_blank">
            <SimpleIcons.github />
          </IconButton>
          <ThemePanelTrigger />
        </>} />
      <main style={{ height: "2000px" }}>
        <Hero
          headline="Material Solid"
          subtitle="SolidJS components implementing Material You"
          actions={
            <>
              <Button.filled
                icon={<MaterialSymbol name="east" />}
                iconAffinity="trailing"
                label="Explore all components" />
              <Button.text
                icon={<SimpleIcons.github width={18} height={18} />}
                label="Contribute" />
            </>
          } />
      </main>
    </>
  );
}
