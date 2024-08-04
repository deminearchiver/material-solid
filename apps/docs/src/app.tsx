import { A, Route, Router, type RouteDefinition, type RouteSectionProps } from "@solidjs/router";
import { For, lazy, Suspense, type Component } from "solid-js";
import { MetaProvider, Title} from "@solidjs/meta";
import { MultiProvider } from "@material-solid/utils/multi-provider";
import { MaterialSymbolController } from "@material-solid/components/icon";
import { ThemeProvider } from "./components/theme";

import { MDXProvider } from "solid-jsx";
import { TopAppBar } from "./components/app-bar";
import { Layout } from "./layout";


const resolveComponentName = (path: string): string | undefined => {
  const matches =  /.*\/(.*)\/.*\.mdx$/.exec(path);
  return matches?.[1];
}

const components = Object.fromEntries(
  Object.entries(
    import.meta.glob<{
      default: Component, title: string
    }>("~/routes/components/*/index.mdx"),
  )
    .map(
      ([path, module]) => [
        resolveComponentName(path),
        lazy(async () => {
          const { default: Component, title } = await module();
          return { default: () => {
            return (
              <>
                <Title>{title}</Title>
                <Component />
              </>
            )
          } };
        }),
      ]
    )
) as Record<string, Component>;







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
      {/* <Route path="/components" component={lazy(() => import("~/routes/components"))}>
        <Route path="/" />
        <For each={Object.entries(components)}>{
          ([name, Component]) => (
            <Route
              path={`/${name}`}
              component={Component} />
          )
        }</For>
      </Route> */}
    </Router>
  );
}
