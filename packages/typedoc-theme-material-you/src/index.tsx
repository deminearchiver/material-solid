import type { Application } from "typedoc";
import { JSX, ParameterType, RendererEvent } from "typedoc";
import { MaterialYouTheme } from "./theme";
import { Hct, hexFromArgb, MaterialDynamicColors, SchemeTonalSpot } from "@material/material-color-utilities";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { copyFileSync } from "fs";

export * from "./theme";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const load = (app: Application) => {

  app.options.addDeclaration({
    name: "materialYou",
    help: "",
    type: ParameterType.Object,
    defaultValue: {},
  });

  app.renderer.defineTheme("material-you", MaterialYouTheme);

  const scheme = new SchemeTonalSpot(Hct.fromInt(0xFF0000FF), true, 0);

  app.renderer.hooks.on("head.end", context => (
    <>
      <style>
        <JSX.Raw
          html={`
:root {
  --md-sys-color-primary: ${hexFromArgb(scheme.primary)};
  --md-sys-color-on-primary: ${hexFromArgb(scheme.onPrimary)};
  --md-sys-color-primary-container: ${hexFromArgb(scheme.primaryContainer)};
  --md-sys-color-on-primary-container: ${hexFromArgb(scheme.onPrimaryContainer)};

  --md-sys-color-secondary: ${hexFromArgb(scheme.secondary)};
  --md-sys-color-on-secondary: ${hexFromArgb(scheme.onSecondary)};
  --md-sys-color-secondary-container: ${hexFromArgb(scheme.secondaryContainer)};
  --md-sys-color-on-secondary-container: ${hexFromArgb(scheme.onSecondaryContainer)};

  --md-sys-color-tertiary: ${hexFromArgb(scheme.tertiary)};
  --md-sys-color-on-tertiary: ${hexFromArgb(scheme.onTertiary)};
  --md-sys-color-tertiary-container: ${hexFromArgb(scheme.tertiaryContainer)};
  --md-sys-color-on-tertiary-container: ${hexFromArgb(scheme.onTertiaryContainer)};

  --md-sys-color-surface: ${hexFromArgb(scheme.surface)};
  --md-sys-color-on-surface: ${hexFromArgb(scheme.onSurface)};

  --md-sys-color-surface-container-lowest: ${hexFromArgb(scheme.surfaceContainerLowest)};
  --md-sys-color-surface-container-low: ${hexFromArgb(scheme.surfaceContainerLow)};
  --md-sys-color-surface-container: ${hexFromArgb(scheme.surfaceContainer)};
  --md-sys-color-surface-container-high: ${hexFromArgb(scheme.surfaceContainerHigh)};
  --md-sys-color-surface-container-highest: ${hexFromArgb(scheme.surfaceContainerHighest)};
  --md-sys-color-on-surface-variant: ${hexFromArgb(scheme.onSurfaceVariant)};

  --md-sys-color-shadow: ${hexFromArgb(scheme.shadow)};
  --md-sys-color-scrim: ${hexFromArgb(scheme.scrim)};

  --md-sys-color-inverse-surface: ${hexFromArgb(scheme.inverseSurface)};
  --md-sys-color-inverse-on-surface: ${hexFromArgb(scheme.inverseOnSurface)};
}
          `} />
      </style>
      <link
        rel="stylesheet"
        href={context.relativeURL("assets/material-you-custom.css")} />
    </>
  ));

  app.renderer.hooks.on("body.end", context => (
    <>
      <script type="importmap">
        <JSX.Raw html={`
        {
          "imports": {
            "@material/web/": "https://esm.run/@material/web/"
          }
        }
        `} />
      </script>
      <script type="module">
        <JSX.Raw html={`
import '@material/web/all.js';
import {styles as typescaleStyles} from '@material/web/typography/md-typescale-styles.js';
document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
        `} />
      </script>
    </>
  ));

  app.renderer.on(RendererEvent.END, () => {
    const from = resolve(__dirname, "assets/custom.css");
    const to = resolve(
      app.options.getValue("out"),
      "assets/material-you-custom.css",
    );
    copyFileSync(from, to);
  });
}
