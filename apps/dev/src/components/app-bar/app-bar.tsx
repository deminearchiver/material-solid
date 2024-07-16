import { createMemo, createSignal, Show, type Component } from "solid-js";
import { assignInlineVars } from "@vanilla-extract/dynamic";

import { useWindowScrollPosition } from "@solid-primitives/scroll";
import { actionsStyle, appBarStyle, scrolledUnderPercentage } from "./app-bar.css";

import { IconButton } from "../../../../../packages/components/src/icon-button";
import { MaterialSymbol } from "../../../../../packages/components/src/icon";
import { Button } from "../../../../../packages/components/src/button";
import { useTheme, type ThemeMode } from "../theme";
import { A, useBeforeLeave } from "@solidjs/router";
import { ButtonSegment, SegmentedButton } from "../../../../../packages/components/src/segmented-button";

export const AppBar: Component = () => {
  const { theme, setTheme } = useTheme()!;
  const scroll = useWindowScrollPosition();

  const scrollPercentage = createMemo(
    () => Math.min(Math.max(scroll.y / 64, 0), 1) * 100,
  );

  return (
    <header
      class={appBarStyle()}
      style={
        assignInlineVars({
          [scrolledUnderPercentage]: `${scrollPercentage()}%`,
        })
      }>
        <div class={actionsStyle}>
          <SegmentedButton
            onSelectionChange={setTheme}
            selected={theme()}>
              <ButtonSegment<ThemeMode>
                value="auto"
                icon={<MaterialSymbol name="auto_mode" />}
                label="Auto" />
              <ButtonSegment<ThemeMode>
                value="light"
                icon={<MaterialSymbol name="light_mode" />}
                label="Light" />
              <ButtonSegment<ThemeMode>
                value="dark"
                icon={<MaterialSymbol name="dark_mode" />}
                label="Dark" />
          </SegmentedButton>
        </div>
    </header>
  );
}
