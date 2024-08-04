import { MultiProvider } from "@material-solid/utils/multi-provider";
import { MetaProvider, Title } from "@solidjs/meta";
import { type RouteSectionProps, A } from "@solidjs/router";
import { type Component, Suspense } from "solid-js";
import { MDXProvider } from "solid-jsx";
import { ThemeProvider } from "./components/theme";
import { MaterialSymbolController } from "@material-solid/components/icon";
import { Lenis } from "./components/lenis";

export const Layout: Component<RouteSectionProps> = (props) => {
  return (
    <MultiProvider
      providers={[
        MetaProvider,
        ThemeProvider,
        Lenis,
        [MaterialSymbolController, { defaultVariant: "rounded" }],
      ]}>
        <Title>Material Solid</Title>
        <Suspense>{props.children}</Suspense>
    </MultiProvider>
  );
}
