import type { Options } from "tsup"

export interface ConfigMixin<T = string> {
  name: T;
  apply(this: MixinContext, overrideOptions: Options): Promise<Options | Options[]>;
}

export interface MixinContext {
  initialOptions: Options;
}
