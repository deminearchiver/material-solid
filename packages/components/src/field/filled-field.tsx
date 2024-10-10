import { mergeProps, splitProps, type Component } from "solid-js";
import { activeIndicatorStyle, backgroundStyle, stateLayerStyle } from "./filled-field.css";

import { Field } from ".";

export const FilledField: Component<Field.PublicProps> = (props) => {
  const mergedProps = mergeProps(
    {
      focused: false,
      disabled: false,
      label: "",
    } as Field.PublicProps<true>,
    props,
  ) as Field.PublicProps<true>;

  const [, local] = splitProps(
    mergedProps,
    [],
  );


  return (
    <Field<true>
      {...local}
      background={
        <div class={backgroundStyle()} />
      }
      stateLayer={
        <div class={stateLayerStyle()} />
      }
      indicator={
        <div class={
          activeIndicatorStyle({
            focused: local.focused,
          })
        } />
      } />
  )
}

export namespace FilledField {
  export type Props = {

  }
}
