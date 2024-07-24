import { usePrefersDark } from "@solid-primitives/media";
import { makePersisted } from "@solid-primitives/storage";
import type { MaybeAccessor } from "@solid-primitives/utils";
import { createContext, createEffect, createMemo, createSignal, on, useContext, type ParentComponent } from "solid-js";
import { createStore, type SetStoreFunction, type Store } from "solid-js/store";

export type ThemeBrightness = "light" | "dark";



export type Theme = {
  useSystemBrightness: boolean;
  brightness: ThemeBrightness;
  contrast: number;
}
export type ThemeStore = [get: Store<Theme>, set: SetStoreFunction<Theme>];

export type ThemeProviderProps = {}

const ThemeContext = createContext<ThemeStore>();
export const useTheme = () => useContext(ThemeContext);

const THEME_CHANGE_DELAY_MS = 300;
const THEME_CHANGE_DURATION_MS = 200;

type TimeoutId = Parameters<typeof clearTimeout>["0"];

export const ThemeProvider: ParentComponent<ThemeProviderProps> = (props) => {
  const prefersDark = usePrefersDark();
  const defaultBrightness = createMemo<ThemeBrightness>(
    () => prefersDark() ? "dark" : "light",
  );

  const [theme, setTheme] = makePersisted(
    createStore<Theme>({
      useSystemBrightness: true,
      brightness: defaultBrightness(),
      contrast: 0,
    }),
    {
      name: STORAGE_KEY,
    },
  );

  const [durationTimeout, setDurationTimeout] = createSignal<TimeoutId>();
  const [delayTimeout, setDelayTimeout] = createSignal<TimeoutId>();


  const insertStyleTag = (brightness?: "light" | "dark", animate: boolean = true) => {

  }

  const updateAttribute = (
    brightness: "auto" | "light" | "dark",
    animate: boolean,
    delay: boolean,
  ) => {
    const style = document.createElement('style')
    style.setAttribute("type", "text/css");

    if(animate) {
      const transitionPrefixes = [
        "-webkit-transition",
        "-moz-transition",
        "-o-transition",
        "-ms-transition",
        "transition",
      ];
      const transitionProperties = ["color", "background-color"];
      const styleText = transitionPrefixes
        .map(prefix => `
          ${prefix}: color ${THEME_CHANGE_DURATION_MS} ease-in-out, background-color ${THEME_CHANGE_DURATION_MS} ease-in-out !important;
          ${prefix}-property: color, background-color !important;
          ${prefix}-duration: ${THEME_CHANGE_DURATION_MS}ms !important;
          ${prefix}-delay: 0ms !important;
          ${prefix}-timing-function: ease-in-out !important;
        `)
        .join("\n")
      style.textContent = `*, *::before, *::after {${styleText}}`;
    } else {
      // TODO: breaks certain components like Switch
      style.textContent =
      `*:not([data-theme-transition-exclude]) {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        -ms-transition: none !important;
        transition: none !important;
      }`;
    }

    const changeTheme = () => {
      document.head.appendChild(style);
      if(brightness === "auto") {
        delete document.documentElement.dataset.theme;
      } else {
        document.documentElement.dataset.theme = brightness;
      }
      window.getComputedStyle(style).opacity;

      setDurationTimeout(prev => {
        if(prev) clearTimeout(prev);
        if(animate) return setTimeout(
          () => style.remove(),
          THEME_CHANGE_DURATION_MS,
        );
      });
    }

    if(!delay) changeTheme();
    setDelayTimeout(prev => {
      if(prev) clearTimeout(prev);
      if(delay) return setTimeout(
        changeTheme,
        THEME_CHANGE_DELAY_MS,
      );
    });
  }

  createEffect(
    on(
      [
        () => theme.useSystemBrightness,
        () => theme.brightness,
      ],
      (values, prevValues) => {
        const [useSystemBrightness, brightness] = values;
        const [prevUseSystemBrightness, prevBrightness] = prevValues ?? values;

        const defaultDark = prefersDark();
        const defaultLight = !defaultDark;
        if(useSystemBrightness) {
          if(useSystemBrightness === prevUseSystemBrightness) return;
          if(
            (prevBrightness === "light" && defaultLight) ||
            (prevBrightness === "dark" && defaultDark)
          ) return;
        } else if(prevUseSystemBrightness) {
          if(
            (brightness === "light" && defaultLight) ||
            (brightness === "dark" && defaultDark)
          ) return;
        }

        updateAttribute(
          !useSystemBrightness ? brightness : "auto",
          !!prevValues,
          prevUseSystemBrightness !== useSystemBrightness,
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
