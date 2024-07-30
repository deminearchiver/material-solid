import type { ConfigMixin } from "./mixin";

export const withSolid = async (): Promise<ConfigMixin<"solid">> => {
  const { solidPlugin } = await import("esbuild-plugin-solid");
  return {
    name: "solid",
    apply: async options => {
      options.platform ||= "browser";
      options.target ||= "esnext";

      options.esbuildPlugins ||= [];
      options.esbuildPlugins.push(
        // @ts-expect-error
        solidPlugin({ solid: { generate: "dom" } }),
      );
      return options;
    },
  };
}
