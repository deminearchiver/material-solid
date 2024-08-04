import type { RouteSectionProps } from "@solidjs/router";
import { createSignal, onMount, type Component } from "solid-js";
import { Feature, Features } from "./components/features";
import { scroll, animate, ScrollOffset } from "motion";
import { Refs } from "@solid-primitives/refs";

export const Home: Component<RouteSectionProps> = () => {
  let ref!: HTMLDivElement;

  const [refs, setRefs] = createSignal<HTMLElement[]>([]);

  onMount(() => {
    refs().forEach(
      element => scroll(
        animate(element, { opacity: [0, 1, 1, 0] }),
        {
          offset: [...ScrollOffset.Enter, ...ScrollOffset.Exit],
          target: element,
        }
      )
    )
  });

  return (
    <main style={{ height: "300vh" }}>
      <Refs ref={setRefs}>
        Work-in-progress
      </Refs>
    </main>
  );
}
