import type { MdIcon } from "@material/web/icon/icon";
import type { MdIconButton } from "@material/web/iconbutton/icon-button";

declare module "typedoc" {
  namespace JSX {
    namespace JSX {
      export interface JsxHtmlGlobalProps {
        accessKey?: string;
        autocapitalize?: string;
        children?: JsxChildren;
        class?: string;
        contentEditable?: string;
        [data: `data-${string}`]: string;
        dir?: string;
        draggable?: boolean;
        enterKeyHint?: string;
        hidden?: boolean;
        id?: string;
        inputMode?: string;
        is?: string;
        itemId?: string;
        itemProp?: string;
        itemRef?: string;
        itemScope?: string;
        itemType?: string;
        lang?: string;
        nonce?: string;
        part?: string;
        role?: string;
        slot?: string;
        spellcheck?: boolean;
        style?: string;
        tabIndex?: number;
        title?: string;
        translate?: boolean;
      }

      interface IntrinsicElements {
        "md-icon": JsxHtmlGlobalProps;
        "md-icon-button": JsxHtmlGlobalProps & {
          type?: "button" | "reset" | "submit";
          disabled?: boolean;
          selected?: boolean;
          toggle?: true;
        };
      }
    }
  }
}
