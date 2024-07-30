import type { Options } from "tsup";
import type { ConfigMixin, MixinContext } from "./mixin";

export * from "./mixin";
export * from "./package-json";
export * from "./solid";

export type ConfigBuilder<Mixins extends readonly ConfigMixin[] = []> = {
  mixin: <T extends ConfigMixin>(mixin: T | Promise<T>) => ConfigBuilder<[...Mixins, T]>;
  build: () => DefinedConfig;
}

export type DefinedConfig = (overrideOptions: Options) => Promise<Options[]>;


class ConfigBuilderImpl implements ConfigBuilder {
  private readonly mixins: (ConfigMixin | Promise<ConfigMixin>)[] = [];

  constructor(
    private readonly initialOptions: (overrideOptions: Options) => Promise<Options[]>,
  ) {

  }

  public mixin(mixin: ConfigMixin | Promise<ConfigMixin>): ConfigBuilder {
    this.mixins.push(mixin);
    return this;
  }
  public build(): DefinedConfig {
    return async (overrideOptions) => {
      const mixins = await Promise.all(this.mixins);

      return mixins.reduce<Promise<Options[]>>(
        async (prevOptions, mixin) => {
          const nextOptions: Options[] = [];
          for(const options of await prevOptions) {
            const result = await mixin.apply.call({initialOptions: {}}, options);
            nextOptions.push(
              ...Array.isArray(result) ? result : [result],
            );
          }
          return nextOptions;
        },
        this.initialOptions(overrideOptions),
      )
    };
  }
}

type MaybePromise<T> = T | Promise<T>;

export const defineConfig = (
  options: Options | Options[] | ((initialOptions: Options) => MaybePromise<Options | Options[]>)
): ConfigBuilder => {
  return new ConfigBuilderImpl(
    typeof options === "function"
      ? (overrideOptions) => Promise.resolve(options(overrideOptions))
          .then(value => Array.isArray(value) ? value : [value])
      : () => Promise.resolve(Array.isArray(options) ? options : [options])
  );
}
