/* @refresh reload */
// import "solid-devtools";

import { For, render } from "solid-js/web"
import { App } from "./app";


/* Fonts */
import "@fontsource-variable/roboto-flex/grad.css";
import "@fontsource-variable/manrope";
import "@fontsource-variable/fira-code";
import "@fontsource-variable/material-symbols-rounded/fill.css";


/* Theme */
import "~/theme/global.css";

/* Styles */
// import "~/styles/normalize.css";
import "~/styles/global.css";
import "~/styles/markdown.css";
import "~/styles/lenis.css";

if(import.meta.env.PROD) {
  location.replace("https://github.com/deminearchiver/material-solid");
}

render(
  () => <App />,
  document.getElementById("root")!,
);
