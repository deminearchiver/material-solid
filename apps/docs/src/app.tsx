import { Route, Router } from "@solidjs/router";
import { lazy, Show, type Component } from "solid-js";
import { Layout } from "./layout";





// const routes: RouteDefinition[] = [
//   {
//     path: "/",
//     component: lazy(() => import("~/routes")),
//   },
//   {
//     path: "/components",
//     component: lazy(() => import("~/routes/components")),
//     children: [
//       {
//         path: "/",
//       },
//       ...Object.entries(components)
//         .map<RouteDefinition>(
//           ([path, module]) => ({
//             path: `/${resolveComponentName(path)}`,
//             component: (),
//           }),
//         )
//     ],
//   },
//   {
//     path: "*404",
//     component: lazy(() => import("~/routes/404")),
//   },
// ];


type ComponentComponentProps = {
  title: string;
  component: Component;
}
const ComponentComponent: Component<ComponentComponentProps> = (props) => {
  return (
    <>

      <props.component />
    </>
  );
}

export const App = () => {
  return (
    <Router root={Layout}>
      <Route path="*404" component={lazy(() => import("~/routes/404"))} />
      <Route path="/" component={lazy(() => import("~/pages/home"))} />
      <Route path="/docs" component={lazy(() => import("~/routes/docs/layout"))}>
        <Route path="/" component={lazy(() => import("~/routes/docs"))} />
        <Route path="/roadmap" component={lazy(() => import("~/routes/docs/roadmap"))} />
      </Route>
      <Show when={import.meta.env.DEV}>
        <Route path="/dev" component={lazy(() => import("~/pages/dev"))} />
      </Show>
    </Router>
  );
}
