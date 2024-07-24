/* @refresh reload */
import { render } from "solid-js/web"
import { App } from "./app";


import "~/theme/global.css";
// import "~/styles/normalize.css";
import "~/styles/global.css";

import "@fontsource-variable/roboto-flex";
import "@fontsource-variable/fira-code";
import "@fontsource-variable/material-symbols-rounded";

render(
  () => <App />,
  document.getElementById("root")!,
);
