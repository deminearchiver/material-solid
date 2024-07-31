import type { RouteSectionProps } from "@solidjs/router";
import type { Component } from "solid-js";
import { layoutStyle, contentStyle, tableOfContentsStyle, paneStyle } from "./layout.css";
import { Drawer, DrawerHeadline, DrawerItem } from "~/components/drawer";
import { MaterialSymbol } from "@material-solid/components/icon";

export const Layout: Component<RouteSectionProps> = (props) => {
  return (
    <div class={layoutStyle}>
      <aside>
        <Drawer>
          <DrawerHeadline>Getting started</DrawerHeadline>
          <DrawerItem
            selected
            leading={<MaterialSymbol name="question_mark" />}
            label="Why?" />
          <DrawerItem
            leading={<MaterialSymbol name="download" />}
            label="Installation" />
          <DrawerHeadline>Components</DrawerHeadline>
        </Drawer>
      </aside>
      <main class={contentStyle}>
        <div class={paneStyle}>

        </div>
        <aside class={tableOfContentsStyle}>
          Table of contents
        </aside>
      </main>
    </div>
  );
}
