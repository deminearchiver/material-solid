import { MetaProvider, Title } from "@solidjs/meta";
import { Router, type RouteSectionProps } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, type Component } from "solid-js";
import { MultiProvider } from "@material-solid/utils";
import { MaterialSymbolController } from "@material-solid/components/icon";
import { ThemeProvider } from "./components/theme";

import "~/theme/global.css";

import "~/styles/global.css";

import "@fontsource-variable/roboto-flex";
import "@fontsource-variable/fira-code";
import "@fontsource-variable/material-symbols-rounded";

const Layout: Component<RouteSectionProps> = (props) => {
  return (
    <MultiProvider
      providers={[
        MetaProvider,
        ThemeProvider,
        [MaterialSymbolController, { defaultVariant: "rounded" }],
      ]}>
        <Title>Material Solid</Title>
        <Suspense>{props.children}</Suspense>
    </MultiProvider>
  );
}

export default function App() {
  return (
    <Router root={Layout}>
      <FileRoutes />
    </Router>
  );
}
