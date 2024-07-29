import { type ComponentProps, type ValidComponent } from "solid-js";
export type PortalPopoverProps<T extends ValidComponent, P = Omit<ComponentProps<T>, "popover">> = P & {
    component: T | undefined;
};
export declare const Portal: {
    dialog: {};
    popover: {};
};
