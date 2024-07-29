import { Title } from "@solidjs/meta";
import { TopAppBar } from "~/components/app-bar";

import { IconButton } from "@material-solid/components/icon-button";

import { createScrollPosition } from "@solid-primitives/scroll";
import { MaterialSymbol } from "@material-solid/components/icon";
import { Hero } from "~/components/hero";
import { ThemePanelTrigger } from "~/components/theme";
import { Button } from "@material-solid/components/button";
import { SimpleIcons } from "~/components/icon";
import { createSignal } from "solid-js";
import { Drawer, DrawerItem, DrawerView } from "~/components/drawer";

export default function Index() {
  const [drawerOpen, setDrawerOpen] = createSignal(false);
  const [selected, setSelected] = createSignal(0);
  return (
    <>
      <Title>Components | Material Solid</Title>

      <TopAppBar.large
        leading={
          <IconButton onClick={() => setDrawerOpen(prev => !prev)}>
            <MaterialSymbol name="menu" />
          </IconButton>
        }
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
      <DrawerView open={drawerOpen()} onClose={() => setDrawerOpen(false)}>
        <Drawer>
          <DrawerItem
            onClick={() => setSelected(0)}
            selected={selected() === 0}
            leading={<MaterialSymbol name="home" />}
            label="Home" />
          <DrawerItem
            onClick={() => setSelected(1)}
            selected={selected() === 1}
            leading={<MaterialSymbol name="description" />}
            label="Documentation" />
          <DrawerItem
            onClick={() => setSelected(2)}
            selected={selected() === 2}
            leading={<MaterialSymbol name="change_history" />}
            label="Test 1" />
          <DrawerItem
            onClick={() => setSelected(3)}
            selected={selected() === 3}
            leading={<MaterialSymbol name="change_history" />}
            label="Test 2" />
          <DrawerItem
            onClick={() => setSelected(4)}
            selected={selected() === 4}
            leading={<MaterialSymbol name="change_history" />}
            label="Test 3" />
        </Drawer>
      </DrawerView>

      <main style={{ height: "2000px" }}>
        <Hero
          headline="Material Solid"
          subtitle="SolidJS components implementing Material You"
          actions={
            <>
              <Button.filled
                as="a"
                href="/components"
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
