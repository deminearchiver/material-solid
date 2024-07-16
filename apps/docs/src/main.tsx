/* @refresh reload */
import { render } from "solid-js/web"
import { App } from "./app";

import "normalize.css";

import "~/theme/global.css";
import "~/styles/global.css";

import "@fontsource-variable/roboto-flex";
import "@fontsource-variable/material-symbols-rounded";

render(
  () => <App />,
  document.getElementById("root")!,
);
