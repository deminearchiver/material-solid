import { splitProps, type ComponentProps, type JSX, type ValidComponent } from "solid-js"
import { Dynamic, type DynamicProps, Portal as SolidPortal } from "solid-js/web";

const supportsModalDialog = () => {
  return (
    typeof HTMLDialogElement !== "undefined" &&
    typeof HTMLDialogElement.prototype === "object" &&
    "showModal" in HTMLDialogElement.prototype &&
    typeof HTMLDialogElement.prototype.showModal === "function" &&
    "close" in HTMLDialogElement.prototype &&
    typeof HTMLDialogElement.prototype.close === "function"
  );
}

const supportsManualPopover = () => {
  return (
    typeof HTMLElement !== "undefined" &&
    typeof HTMLElement.prototype === "object" &&
    "popover" in HTMLElement.prototype &&
    "showPopover" in HTMLElement.prototype &&
    typeof HTMLElement.prototype.showPopover === "function"
  );
}

const SUPPORTS_MODAL_DIALOG = supportsModalDialog();
const SUPPORTS_MANUAL_POPOVER = supportsManualPopover();

const PortalFallback = () => {
  return (
    <SolidPortal >
      <div></div>
    </SolidPortal>
  );
}

type PortalDialogProps =
  & JSX.DialogHtmlAttributes<HTMLDialogElement>;
const PortalDialog = () => {
  let ref!: HTMLDialogElement;
  return (
    <dialog>

    </dialog>
  );
}

export type PortalPopoverProps<
  T extends ValidComponent,
  P = Omit<ComponentProps<T>, "popover">
> =
  & P
  & {
    component: T | undefined;
  };

const PortalPopover = <T extends ValidComponent>(props: PortalPopoverProps<T>) => {
  const [local, others] = splitProps(
    props,
    ["component"],
  );
  return <div></div>
}

export const Portal = {
  dialog: {},
  popover: {},
}
