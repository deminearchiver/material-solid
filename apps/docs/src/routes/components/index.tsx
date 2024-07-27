import type { RouteSectionProps } from "@solidjs/router";
import { containerStyle, panelStyle } from "./style.css";
import { createScrollPosition } from "@solid-primitives/scroll";
import type { Component } from "solid-js";

export default function Components(props: RouteSectionProps) {
  let panelRef!: HTMLElement;
  const scroll = createScrollPosition(() => panelRef)

  return (
    <div class={containerStyle}>
      <aside>

      </aside>
      <div ref={panelRef as HTMLDivElement} class={panelStyle}>
        <main style={{ height: "2000px" }}>{props.children}</main>
      </div>
    </div>
  )
}
