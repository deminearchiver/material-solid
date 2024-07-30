import type { ConfigMixin } from "./mixin";

// export const withWatch = (): ConfigMixin<"watch"> => ({
//   name: "watch",
//   async apply(overrideOptions) {
//     const watching = overrideOptions.watch ?? false;
//     return {
//       watch: watching,
//       ignoreWatch: overrideOptions.ignoreWatch,
//     };
//   },
// });
