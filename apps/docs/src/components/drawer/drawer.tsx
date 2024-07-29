import type { ParentComponent } from "solid-js"
import { containerStyle } from "./drawer.css"

export const Drawer: ParentComponent = (props) => {
  return (
    <aside class={containerStyle}>
      {props.children}
    </aside>
  )
}
