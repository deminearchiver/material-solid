import type { RouteSectionProps } from "@solidjs/router";
import { containerStyle, panelStyle } from "./style.css";
import { AppBar } from "~/components/app-bar";
import { createScrollPosition } from "@solid-primitives/scroll";

export default function Components(props: RouteSectionProps) {
  let panelRef!: HTMLElement;
  const scroll = createScrollPosition(() => panelRef)

  return (
    <div class={containerStyle}>
      <aside>

      </aside>
      <div ref={panelRef as HTMLDivElement} class={panelStyle}>
        <AppBar title="Components" scroll={scroll.y} />
        <main style={{ height: "2000px" }}>{props.children}</main>
      </div>
    </div>
  )
}
