import type { UserConfig as VitestUserConfig } from "vitest";
declare module "vite" {
    interface UserConfig extends VitestUserConfig {
    }
}
declare const _default: import("vite").UserConfig;
export default _default;
