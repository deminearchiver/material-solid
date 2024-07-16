/* @refresh reload */
import { render } from "solid-js/web"

import App from "./app";

import "@fontsource-variable/roboto-flex";
import "@fontsource-variable/material-symbols-rounded/full.css";

import "normalize.css";
import "~/styles/global.css";
import "~/theme/global.css";

render(
  () => <App />,
  document.getElementById("root")!,
);
