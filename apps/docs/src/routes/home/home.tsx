import type { RouteSectionProps } from "@solidjs/router";
import { createEffect, createSignal, For, type Component, type VoidComponent } from "solid-js";

type FeatureModule = {
  default: VoidComponent;
  tagline?: string;
}
const FEATURES = import.meta.glob<FeatureModule>(
  "./content/features/*.mdx", { eager: true }
);

const features = Object.entries(FEATURES)
  .map(
    ([, module]) => Object.assign(
      module.default,
      { tagline: module.tagline ?? "" },
    ),
  );
export const Home: Component<RouteSectionProps> = () => {
  const [value, setValue] = createSignal(true);

  let ref!: HTMLButtonElement;

  return (
    <div style={{ height: "300vh" }}>
      {/* <button
        ref={ref}
        class={toggleStyle({ selected: value() })}
        onClick={() => setValue(prev => !prev)}>
          <Ripple for={ref} />
          <span>Animate</span>
          <Switch
            onChanged={setValue}
            value={value()} />
      </button> */}
      <main>

      </main>
    </div>
  );
}
