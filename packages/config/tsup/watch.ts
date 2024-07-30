import type { ConfigMixin } from "./mixin";

/**
 * Use before other mixins
 */
export const withWatch = (override: boolean = true): ConfigMixin<"watch"> => ({
  name: "watch",
  async apply(overrideOptions) {
    const watching = !!overrideOptions.watch;
    if(override || overrideOptions.clean === undefined) {
      overrideOptions.clean = !watching;
    }
    return overrideOptions;
  },
});
