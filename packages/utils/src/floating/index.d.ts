import { type AutoPlacementOptions, type DetectOverflowOptions, type FlipOptions, type HideOptions, type InlineOptions, type OffsetOptions, type Padding, type Placement, type ShiftOptions, type Strategy } from "@floating-ui/dom";
import { type MaybeAccessor } from "@solid-primitives/utils";
export type FloatingOptions = {
    offset?: OffsetOptions;
    shift?: boolean | ShiftOptions;
    flip?: boolean | FlipOptions;
    arrow?: Padding;
    size?: DetectOverflowOptions & {
        matchSize?: boolean;
        fitViewPort?: boolean;
    };
    autoPlacement?: boolean | AutoPlacementOptions;
    hide?: boolean | HideOptions;
    inline?: boolean | InlineOptions;
};
export type FloatingState = {
    placement: Placement;
    x: number;
    y: number;
    width?: number;
    height?: number;
    maxWidth?: number;
    maxHeight?: number;
    arrowX?: number;
    arrowY?: number;
};
type FloatingProps = {
    enabled?: MaybeAccessor<boolean>;
    reference: MaybeAccessor<HTMLElement | undefined>;
    floating: MaybeAccessor<HTMLElement | undefined>;
    arrow?: MaybeAccessor<HTMLElement | undefined>;
    placement?: MaybeAccessor<Placement>;
    strategy?: MaybeAccessor<Strategy>;
    options?: MaybeAccessor<FloatingOptions | undefined>;
};
export declare const createFloating: (props: FloatingProps) => FloatingState;
export {};
