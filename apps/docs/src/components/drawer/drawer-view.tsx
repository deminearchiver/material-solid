import { createPresence } from "@material-solid/utils/presence";
import { createContext, createEffect, createSignal, on, splitProps, useContext, type Accessor, type JSX, type ParentComponent } from "solid-js";
import { dialogStyle } from "./drawer-view.css";


type DrawerViewContextData = {
  isMounted: Accessor<boolean>;
  isVisible: Accessor<boolean>;
  isEntering: Accessor<boolean>;
  isExiting: Accessor<boolean>;
}
const DrawerViewContext = createContext<DrawerViewContextData>();
export const useDrawerViewContext = () => useContext(DrawerViewContext);

const DrawerViewContextProvider: ParentComponent<DrawerViewContextData> = (props) => {
  return (
    <DrawerViewContext.Provider
      value={props}
      children={props.children} />
  )
}


export type DrawerViewProps = {
  open?: boolean;
  onClose: () => void;
}
export const DrawerView: ParentComponent<DrawerViewProps> = (props) => {
  const [, local] = splitProps(props, []);

  let dialogRef!: HTMLDialogElement;

  const {
    isVisible,
    isMounted,
    state,
  } = createPresence(() => local.open, [600, 250]);

  createEffect(on(
    isMounted,
    mounted => {
      if(mounted) {
        dialogRef.showModal()
      } else {
        dialogRef.close();
      }
    }
  ));

  const onClick: JSX.EventHandlerUnion<HTMLDialogElement, MouseEvent> = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const rect = event.currentTarget.getBoundingClientRect();

    if(
      x < rect.left ||
      x > rect.right ||
      y < rect.top ||
      y > rect.bottom
    ) local.onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      class={
        dialogStyle({
          visible: isVisible(),
          state: state(),
        })
      }
      onClick={onClick}
      onCancel={event => {
        event.preventDefault();
        local.onClose();
      }}>
        {local.children}
    </dialog>
  );
}
