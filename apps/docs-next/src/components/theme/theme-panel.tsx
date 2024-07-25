import { MaterialSymbol } from "@material-solid/components/icon";
import { IconButton } from "@material-solid/components/icon-button";
import { ButtonSegment, SegmentedButton } from "@material-solid/components/segmented-button";
import { createEffect, createMemo, createSignal, type JSX, mergeProps, on, splitProps, type Component, type Signal, type ComponentProps, type Setter, createContext, useContext, type Accessor } from "solid-js";
import { panelActionsStyle, panelWrapperStyle, panelStyle, panelHeadlineStyle, settingsItemStyle, settingsItemIndex, } from "./theme-panel.css";
import { Button } from "@material-solid/components/button";
import { access, type MaybeAccessor } from "@solid-primitives/utils";
import { mergeRefs } from "@solid-primitives/refs";
import { createPresence } from "@solid-primitives/presence";
import { clsx } from "@material-solid/utils/clsx";
import { useTheme, type ThemeBrightness } from ".";
import { SliderListItem, SwitchListItem } from "../list";
import { ListItem } from "@material-solid/components/list";
import { Switch } from "@material-solid/components/switch";

import { createFloating } from "@material-solid/utils/floating";
import { assignInlineVars } from "@vanilla-extract/dynamic";



const roundByDPR = (value: number) => {
  const dpr = window.devicePixelRatio || 1;
  return Math.round(value * dpr) / dpr;
}


export const ThemePanelTrigger = () => {
  const [theme, setTheme] = useTheme()!;
  const [buttonRef, setButtonRef] = createSignal() as Signal<HTMLElement>;

  const [visible, setVisible] = createSignal(false);
  return (
    <>
      <IconButton
        // variant={visible() ? "outlined" : "regular"}
        ref={setButtonRef}
        selected={visible()}
        onClick={(event: MouseEvent) => {
          setVisible(prev => !prev);
          event?.stopPropagation();
        }}>
        <MaterialSymbol name="brush" />
      </IconButton>

      <ThemePanel
        for={buttonRef}
        visible={visible()}
        onVisibilityChanged={setVisible} />
    </>
  );
}

type ThemePanelProps =
  & Omit<
    JSX.HTMLAttributes<HTMLElement>,
    "popover" | "children"
  >
  & {
    for: MaybeAccessor<HTMLElement>;
    visible: boolean;
    onVisibilityChanged?: (value: boolean) => void;
  };
const ThemePanel: Component<ThemePanelProps> = (props) => {
  const mergedProps = mergeProps(
    { visible: false },
    props,
  );
  const [local, others] = splitProps(
    mergedProps,
    [
      "ref",
      "class",
      "for",
      "visible",
      "onVisibilityChanged",
    ],
  );

  const [ref, setRef] = createSignal() as Signal<HTMLDialogElement>;

  const floatingState = createFloating({
    reference: () => access(local.for),
    floating: ref,
    enabled: () => local.visible,
    strategy: "fixed",
    options: {
      shift: {
        padding: 16,
      },
      offset: {
        mainAxis: 8,
      },
    },
  });
  const { isMounted, isVisible, isEntering, isExiting} = createPresence(
    () => local.visible,
    {
      enterDuration: 600,
      exitDuration: 300,
    },
  );
  const translate = createMemo(() => {
    const x = roundByDPR(floatingState.x)
    const y = roundByDPR(floatingState.y);
    return `${x}px ${y}px`
  });

  createEffect(on(
    isMounted,
    mounted => {
      const floating = ref();
      if(mounted) {
        floating.showModal()
      } else {
        floating.close();
      }
    }
  ));


  const hide = () => {
    local.onVisibilityChanged?.(false);
  }

  const onClick: JSX.EventHandlerUnion<HTMLDialogElement, MouseEvent> = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const rect = event.currentTarget.getBoundingClientRect();

    if(
      x < rect.left ||
      x > rect.right ||
      y < rect.top ||
      y > rect.bottom
    ) hide();
  }

  return (
    <dialog
      ref={mergeRefs(setRef, local.ref)}
      class={
        clsx(
          panelStyle({
            mounted: isMounted(),
            entering: isEntering(),
            exiting: isExiting(),
            visible: isVisible(),
          }),
          local.class,
        )
      }
      style={{
        top: '0',
        left: '0',
        translate: translate(),
      }}
      onClick={onClick}
      onCancel={event => {
        event.preventDefault();
        hide();
      }}
      popover="manual"
      {...others}>
        <ThemePanelContext.Provider value={{
          isMounted,
          isVisible,
          isEntering,
          isExiting,
        }}>
          <h1 class={panelHeadlineStyle}>
            Theme
          </h1>
          <ThemeSettings />
          <footer class={panelActionsStyle}>
            <Button.text onClick={() => local.onVisibilityChanged?.(false)} label="Close"  />
          </footer>
        </ThemePanelContext.Provider>
    </dialog>
  );
}

type ThemePanelData = {
  isMounted: Accessor<boolean>;
  isVisible: Accessor<boolean>;
  isEntering: Accessor<boolean>;
  isExiting: Accessor<boolean>;
}
const ThemePanelContext = createContext<ThemePanelData>({
  isMounted: () => true,
  isVisible: () => true,
  isEntering: () => false,
  isExiting: () => false,
});
const useThemePanel = () => useContext(ThemePanelContext);

type ThemeSettingsAnimationProps = {
  index: number;
  children: JSX.Element;
}
const ThemeSettingsAnimation: Component<ThemeSettingsAnimationProps> = (props) => {
  const { isMounted, isVisible, isEntering, isExiting } = useThemePanel();
  const [, local] = splitProps(props, []);
  return (
    <div
      class={
        settingsItemStyle({
          visible: isVisible(),
          entering: isEntering(),
          exiting: isExiting(),
        })
      }
      style={
        assignInlineVars({
          [settingsItemIndex]: `${local.index}`,
        })
      }>
        {local.children}
    </div>
  );
}

const ThemeSettings: Component = (props) => {
  const [theme, setTheme] = useTheme()!;
  return (
    <div class={panelWrapperStyle}>
        <ThemeSettingsAnimation index={0}>
          <SwitchListItem
            onSelectedChanged={value => setTheme("useSystemBrightness", value)}
            selected={theme.useSystemBrightness}
            icon={<MaterialSymbol name="auto_mode" />}
            headline="Auto brightness"
            subtitle="Automatically determine brightness" />
        </ThemeSettingsAnimation>
        <ThemeSettingsAnimation index={1}>
          <div style={{ "padding-inline": "24px", "padding-block": "8px" }}>
            <SegmentedButton
              selected={theme.brightness}
              onSelectionChange={value => setTheme("brightness", value)}>
                <ButtonSegment<ThemeBrightness>
                  value="light"
                  icon={<MaterialSymbol name="light_mode" />}
                  label="Light" />
                <ButtonSegment<ThemeBrightness>
                  value="dark"
                  icon={<MaterialSymbol name="dark_mode" />}
                  label="Dark" />
            </SegmentedButton>
          </div>
        </ThemeSettingsAnimation>
        <ThemeSettingsAnimation index={2}>
          <SliderListItem
            icon={<MaterialSymbol name="contrast_circle" />}
            label="Contrast level"
            value={0}
            from={-1}
            to={1} />
        </ThemeSettingsAnimation>
    </div>
  )
}
