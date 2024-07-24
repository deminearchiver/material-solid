import { createMemo, createSignal, onMount, splitProps, type Component, type JSX, type ParentComponent, type Signal } from "solid-js";
import { listItemContentStyle, listItemStyle, listItemSubtitleStyle, listItemHeadlineStyle } from "./list-item.css";
import { Ripple } from "../ripple";
import { Dynamic } from "solid-js/web";
import { mergeRefs } from "@solid-primitives/refs";
import clsx from "clsx/lite";
import { Focus } from "../focus";

export type ListItemType = "text" | "button" | "link";
type BaseListItemProps = {
  type?: ListItemType;
  leading?: JSX.Element;
  headline: JSX.Element;
  subtitle?: JSX.Element;
  trailing?: JSX.Element;
}
export type ListItemProps = {
  href?: string;
  target?: string;
} & BaseListItemProps & Omit<JSX.HTMLAttributes<HTMLElement>, "children">;

export const ListItem: Component<ListItemProps> = (props) => {
  // let ref!: HTMLElement;
  const [ref, setRef] = createSignal() as Signal<HTMLElement>;

  const [local, others] = splitProps(
    props, [
      "ref",
      "class",
      "type",
      "leading",
      "headline",
      "subtitle",
      "trailing",
    ],
  );
  const type = createMemo((): ListItemType => local.type ?? "href" in others ? "link" : "text");
  const tag = createMemo(() => {
    switch(type()) {
      case "text": return "li";
      case "button": return "button";
      case "link": return "a";
    }
  });
  return (
    <Dynamic
      component={tag()}
      ref={mergeRefs(local.ref, setRef)}
      class={clsx(listItemStyle, local.class)}
      {...others}>
        <Focus for={ref} />
        <Ripple for={ref} disabled={type() === "text"} />
        {local.leading}
        <div class={listItemContentStyle}>
          <span class={listItemHeadlineStyle}>
            {props.headline}
          </span>
          <span class={listItemSubtitleStyle}>
            {props.subtitle}
          </span>
        </div>
        {local.trailing}
    </Dynamic>
  )
  // switch(tag()) {
  //   case "li": return (
  //     <li
  //       // ref={ref as HTMLLIElement}
  //       ref={setRef}
  //       class={listItemStyle}>
  //         {children}
  //     </li>
  //   );
  //   case "button": return (
  //     <button
  //       // ref={ref as HTMLButtonElement}
  //       ref={setRef}
  //       class={listItemStyle}>
  //         {children}
  //     </button>
  //   );
  //   case "a": return (
  //     <a
  //       // ref={ref as HTMLAnchorElement}
  //       ref={setRef}
  //       class={listItemStyle}>
  //         {children}
  //     </a>
  //   );
  // }
}
