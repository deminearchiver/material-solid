import type { ConfigMixin } from "./mixin";

export const withSolid = async (): Promise<ConfigMixin<"solid">> => {
  const { solidPlugin } = await import("esbuild-plugin-solid");
  return {
    name: "solid",
    apply: async overrideOptions => {
      overrideOptions.platform ||= "browser";
      overrideOptions.target ||= "esnext";

      overrideOptions.esbuildPlugins ||= [];
      overrideOptions.esbuildPlugins.push(
        // @ts-expect-error
        solidPlugin({ solid: { generate: "dom" } }),
      );
      return overrideOptions;
    },
  };
}
