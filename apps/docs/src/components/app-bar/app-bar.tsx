import { createMemo, splitProps, type Component, type JSX } from "solid-js";
import { appBarStyle, headlineStyle, leadingStyle, scrollTransition } from "./app-bar.css";
import { useWindowScrollPosition } from "@solid-primitives/scroll";
import { assignInlineVars } from "@vanilla-extract/dynamic";

export type AppBarProps = {
  leading?: JSX.Element;
  title: JSX.Element;
  scroll?: number;
}
export const AppBar: Component<AppBarProps> = (props) => {
  const windowScroll = useWindowScrollPosition();

  const scroll = createMemo(() => {
    console.log(props.scroll);
    return Math.min(
      Math.max(props.scroll ?? windowScroll.y, 0),
      64,
    );
  });

  const scrollPercentage = createMemo(
    () => scroll() / 64 * 100,
  );

  const [local, others] = splitProps(
    props,
    [
      "leading",
      "title",
    ],
  )
  return (
    <header
      class={
        appBarStyle()
      }
      style={
        assignInlineVars({
          [scrollTransition]: `${scrollPercentage()}%`,
        })
      }>
        <div class={leadingStyle}>
          {props.leading}
        </div>
        <h1 class={headlineStyle}>{local.title}</h1>
    </header>
  );
}
