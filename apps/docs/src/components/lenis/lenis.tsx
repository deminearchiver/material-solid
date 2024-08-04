import { createContext, createEffect, createSignal, onCleanup, splitProps, useContext, type Accessor, type ParentComponent, type Signal } from "solid-js"
import Lenis, { type LenisEvents, type LenisOptions } from "lenis";
import { createRaf } from "~/utils";


export type LenisData = {
  lenis: Accessor<Lenis>;
}
const LenisContext = createContext<LenisData>();

export const useLenis = () => useContext(LenisContext);

export type LenisProps = {
  options?: LenisOptions;
}
const LenisProvider: ParentComponent<LenisProps> = (props) => {
  const [, local] = splitProps(props, []);

  const [lenis, setLenis] = createSignal() as Signal<Lenis>;
  const [, start, stop] = createRaf(time => lenis().raf(time));

  createEffect(() => {
    const lenis = new Lenis(local.options);

    setLenis(lenis);
    start();

    onCleanup(() => {
      stop();
      lenis.destroy();
      setLenis(undefined!);
    });
  });


  return (
    <LenisContext.Provider
      value={{
        lenis,
      }}
      children={local.children} />
  )
}

export { LenisProvider as Lenis };






export const createScroll = (callback: LenisEvents["scroll"]) => {
  const { lenis } = useLenis()!;

  createEffect(() => {
    const instance = lenis();
    const unsubscribe = instance.on("scroll", callback);
    callback(instance);

    onCleanup(unsubscribe);
  });
}
