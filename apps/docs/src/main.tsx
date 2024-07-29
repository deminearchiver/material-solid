/* @refresh reload */
import { For, render } from "solid-js/web"
import { App } from "./app";

import { customElement, type ComponentType } from "solid-element";
import { Aside, type CustomAsideProps } from "./components/aside";


import "~/theme/global.css";
// import "~/styles/normalize.css";
import "~/styles/global.css";
import "~/styles/markdown.css";

import "@fontsource-variable/roboto-flex";
import "@fontsource-variable/manrope";
import "@fontsource-variable/fira-code";
import "@fontsource-variable/material-symbols-rounded/fill.css";




customElement("msd-aside", Aside);

render(
  () => <App />,
  document.getElementById("root")!,
);
