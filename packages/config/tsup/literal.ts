import type { Options } from "tsup";
import type { ConfigMixin } from "./mixin";

export interface WithLiteral extends ConfigMixin {
  name: "literal";
}
export const withLiteral = (options: Options): WithLiteral => {
  return {
    name: "literal",
    async apply(overrideOptions) {
      return {
        ...overrideOptions,
        ...options,
      };
    },
  }
}
