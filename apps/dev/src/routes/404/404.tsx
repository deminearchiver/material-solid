import { Title } from "@solidjs/meta";
import type { Component } from "solid-js";

import { headingStyle } from "./404.css";

export const Layout: Component = () => {
  return (
    <main>
      <Title>Not Found</Title>
      <h1 class={headingStyle}>Page Not Found</h1>
    </main>
  );
}
