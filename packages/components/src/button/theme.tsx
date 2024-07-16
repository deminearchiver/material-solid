import { createContext, createMemo, type JSX, useContext, type ParentComponent, type Component } from "solid-js";

export type ButtonVariant =
  | {
    getClasses: () => string[];
  };
export interface ButtonVariants {
  elevated: ButtonVariant;
  filled: ButtonVariant;
  filledTonal: ButtonVariant;
  outlined: ButtonVariant;
  text: ButtonVariant;
}

const DEFAULT_VARIANTS = {
  elevated: {},
  filled: {},
  filledTonal: {},
  outlined: {},
  text: {},
}



type ButtonThemeData = {
  getVariant: (variant: string) => void;
}
const Context = createContext<ButtonThemeData>({
  getVariant: () => {},
});

export const useButtonTheme = () => {
  return useContext(Context);
}



export type ButtonThemeProps = {
  variants: {
    [Key in keyof ButtonVariants]: () => JSX.Element;
  }
}
export const ButtonTheme: ParentComponent<ButtonThemeProps> = (props) => {
  const ancestor = useContext(Context);

  return (
    <Context.Provider
      value={{
        getVariant: () => {},
      }}
      children={props.children} />
  )
}
