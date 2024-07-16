import { usePrefersDark } from "@solid-primitives/media";
import { createContext, createEffect, createMemo, createRenderEffect, createSignal, onCleanup, useContext, type Accessor, type ParentComponent, type Setter } from "solid-js";
import { makePersisted } from "@solid-primitives/storage";
import { createContextProvider } from "@solid-primitives/context";

export type ThemeMode = "auto" | "light" | "dark";
type ThemeContextData = {
  theme: Accessor<ThemeMode>;
  setTheme: Setter<ThemeMode>;
}

const STORAGE_KEY = "theme";

const ThemeContext = createContext<ThemeContextData>();
export const useTheme = () => useContext(ThemeContext);
export const ThemeProvider: ParentComponent = (props) => {
  const [theme, setTheme] = makePersisted(
    createSignal<ThemeMode>("auto"),
    { name: STORAGE_KEY },
  );

  createEffect(() => {
    const style = document.createElement('style')
    style.setAttribute("type", "text/css");
    style.textContent =
    `*:not([data-theme-transition-exclude]) {
      -webkit-transition: none !important;
      -moz-transition: none !important;
      -o-transition: none !important;
      -ms-transition: none !important;
      transition: none !important;
    }`;
    document.head.appendChild(style);

    document.documentElement.dataset.theme = theme();

    window.getComputedStyle(style).opacity;
    style.remove();
  });

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme }}
      children={props.children} />
  )
}
