import { usePrefersDark } from "@solid-primitives/media";
import { makePersisted } from "@solid-primitives/storage";
import type { MaybeAccessor } from "@solid-primitives/utils";
import { createContext, createEffect, on, useContext, type ParentComponent } from "solid-js";
import { createStore, type SetStoreFunction, type Store } from "solid-js/store";

export type ThemeBrightness = "auto" | "light" | "dark";



export type Theme = {
  brightness: ThemeBrightness;
  contrast: number;
}
export type ThemeStore = [get: Store<Theme>, set: SetStoreFunction<Theme>];

export type ThemeProviderProps = {}

const ThemeContext = createContext<ThemeStore>();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: ParentComponent<ThemeProviderProps> = (props) => {
  const [theme, setTheme] = makePersisted(
    createStore<Theme>({
      brightness: "auto",
      contrast: 0,
    }),
    {
      name: STORAGE_KEY,
    },
  );

  const prefersDark = usePrefersDark();

  const updateAttribute = (brightness?: "light" | "dark") => {
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

    if(brightness) {
      document.documentElement.dataset.theme = brightness;
    } else {
      delete document.documentElement.dataset.theme;
    }

    window.getComputedStyle(style).opacity; // Force repaint
    style.remove();
  }

  createEffect(
    on(
      () => theme.brightness,
      (brightness, prevBrightness) => {
        const prefersLight = !prefersDark();
        if(brightness === "auto") {
          if(
            (prevBrightness === "light" && prefersLight) ||
            (prevBrightness === "dark" && !prefersLight)
          ) return;
        } else if(prevBrightness === "auto") {
          if(
            (brightness === "light" && prefersLight) ||
            (brightness === "dark" && !prefersLight)
          ) return;
        }

        updateAttribute(
          brightness !== "auto" ? brightness : undefined,
        );
      },
    )
  );

  return (
    <ThemeContext.Provider
      value={[theme, setTheme]}
      children={props.children} />
  )
}

const STORAGE_KEY = "theme";
