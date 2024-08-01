import type { RouteSectionProps } from "@solidjs/router";
import type { Component } from "solid-js";
import { Feature, Features } from "./components/features";

export const Home: Component<RouteSectionProps> = () => {
  return (
    <>
      <main>
        <Features>
          <Feature headline="Performance">
            <p>Components use as little JavaScript as possible. Animations are hardware accelerated.</p>
          </Feature>
        </Features>
      </main>
    </>
  );
}
