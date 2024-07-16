import { MetaProvider, Title } from "@solidjs/meta";
import { Router, type RouteSectionProps, A, type RouteDefinition, Route } from "@solidjs/router";
import { lazy, Show, Suspense, type Component, type ComponentProps, type ParentComponent } from "solid-js";
import { AppBar } from "./components/app-bar";
import { ThemeProvider } from "./components/theme";
import { MaterialSymbolController } from "../../../packages/components/src/icon";
import { MultiProvider } from "@material-solid/utils";

const Layout: Component<RouteSectionProps> = (props) => {
  return (
    <MultiProvider
      providers={[
        MetaProvider,
        ThemeProvider,
        [MaterialSymbolController, { defaultVariant: "rounded" }]
      ]}>
        <Title>Solid Start</Title>
        <AppBar />
        <Suspense>{props.children}</Suspense>
    </MultiProvider>
  );
}

const routes: RouteDefinition[] = [
  {
    path: "*404",
    component: lazy(() => import("~/routes/404")),
  },
  {
    path: "/",
    component: lazy(() => import("~/routes/index")),
  },
  {
    path: "/components",
    component: lazy(() => import("~/routes/components")),
  }
];

const App: Component = () => {
  return (
    <Router root={Layout}>
      {routes}
    </Router>
  );
}

export default App;
