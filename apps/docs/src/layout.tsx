import { MultiProvider } from "@material-solid/utils";
import { MetaProvider, Title } from "@solidjs/meta";
import { type RouteSectionProps, A } from "@solidjs/router";
import { type Component, Suspense } from "solid-js";
import { MDXProvider } from "solid-jsx";
import { ThemeProvider } from "./components/theme";

export const Layout: Component<RouteSectionProps> = (props) => {
  return (
    <MultiProvider
      providers={[
        MetaProvider,
        ThemeProvider,
      ]}>
        <Title>Material Solid</Title>
        <Suspense>{props.children}</Suspense>
    </MultiProvider>
  );
}
