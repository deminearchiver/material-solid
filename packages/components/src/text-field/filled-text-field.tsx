import { splitProps, type Component } from "solid-js";
import { TextField } from "./text-field";
import { FilledField } from "../field";

export const FilledTextField: Component<TextField.PublicProps> = (props) => {
  const [, local] = splitProps(props, []);

  return (
    <TextField
      {...local}
      fieldComponent={FilledField} />
  );
}
