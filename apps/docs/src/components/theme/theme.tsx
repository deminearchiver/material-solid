import { MaterialSymbol } from "@material-solid/components/icon";
import { IconButton } from "@material-solid/components/icon-button";
import { ButtonSegment, SegmentedButton } from "@material-solid/components/segmented-button";
import { makePersisted } from "@solid-primitives/storage";
import { createEffect, createMemo, createSignal, type JSX, mergeProps, on, onCleanup, Show, splitProps, type Component, type ParentComponent, type Signal } from "solid-js";
import { createStore } from "solid-js/store";
import { panelActionsStyle, panelWrapperStyle, panelStyle, } from "./theme.css";
import { Button } from "@material-solid/components/button";
import { Slider } from "@material-solid/components/slider";
import { usePrefersDark } from "@solid-primitives/media";
import { access, type MaybeAccessor } from "@solid-primitives/utils";
import createFloating from "@corvu/utils/create/floating";
import { mergeRefs } from "@solid-primitives/refs";
import { createPresence } from "@solid-primitives/presence";
import { clsx } from "@material-solid/utils/clsx";
import { useTheme, type ThemeBrightness } from ".";
import { SliderListItem } from "../lists";
import { createEventListener } from "@solid-primitives/event-listener";
import type { Accessor } from "solid-js";




const roundByDPR = (value: number) => {
  const dpr = window.devicePixelRatio || 1;
  return Math.round(value * dpr) / dpr;
}


export const ThemeSwitcher = () => {
  const [theme, setTheme] = useTheme()!;
  const [buttonRef, setButtonRef] = createSignal() as Signal<HTMLElement>;

  const [visible, setVisible] = createSignal(false);

  createEffect(() => {
    console.log(visible());
  })

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
        onVisibilityChanged={setVisible}>
          <SegmentedButton
            selected={theme.brightness}
            onSelectionChange={value => setTheme("brightness", value)}>
            <ButtonSegment<ThemeBrightness>
              value="auto"
              icon={<MaterialSymbol name="auto_mode" />}
              label="Auto" />
            <ButtonSegment<ThemeBrightness>
              value="light"
              icon={<MaterialSymbol name="light_mode" />}
              label="Light" />
            <ButtonSegment<ThemeBrightness>
              value="dark"
              icon={<MaterialSymbol name="dark_mode" />}
              label="Dark" />
          </SegmentedButton>
          <SliderListItem
            icon={<MaterialSymbol name="contrast_circle" />}
            label="Contrast level"
            value={0.5} />
          <div class={panelActionsStyle}>
            <Button.text onClick={() => setVisible(false)} label="Close"  />
          </div>
      </ThemePanel>
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
    children: JSX.Element;
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
      "children",
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
      enterDuration: 500,
      exitDuration: 300,
    },
  );
  const translate = createMemo(() => {
    const state = floatingState();
    const x = roundByDPR(state.x)
    const y = roundByDPR(state.y);
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
      onCancel={() => hide()}
      popover="manual"
      {...others}>
        <div
          class={
            panelWrapperStyle({
              visible: isVisible(),
              entering: isEntering(),
              exiting: isExiting(),
            })
          }>
            {local.children}
        </div>
    </dialog>
  );
}
