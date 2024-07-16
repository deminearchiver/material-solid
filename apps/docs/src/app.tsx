import { Route, Router, type RouteDefinition, type RouteSectionProps } from "@solidjs/router";
import { lazy, Suspense, type Component } from "solid-js";
import { MetaProvider, Title} from "@solidjs/meta";
import { MultiProvider } from "@material-solid/utils";
import { MaterialSymbolController } from "@material-solid/components/icon";

const Layout: Component<RouteSectionProps> = (props) => {
  return (
    <MultiProvider
      providers={[
        MetaProvider,
        [MaterialSymbolController, { defaultVariant: "rounded" }],
      ]}>
        <Title>Material Solid</Title>
        <Suspense>{props.children}</Suspense>
    </MultiProvider>
  );
}

const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("~/routes")),
  },
  {
    path: "/components",
    component: lazy(() => import("~/routes/components")),
    children: [
      {
        path: "/",
      },
      {
        path: "/slider",
        component: lazy(() => import("~/routes/components/slider"))
      },
    ],
  },
  {
    path: "*404",
    component: lazy(() => import("~/routes/404")),
  },
];

export const App = () => {
  return (
    <Router root={Layout}>
      {routes}
    </Router>
  );
}
