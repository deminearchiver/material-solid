import type { ParentComponent } from "solid-js";
import { MultiProvider } from "@material-solid/utils";

export type ThemeProps = {
  buttonTheme?: {};
}
export const Theme: ParentComponent<ThemeProps> = (props) => {
  return (
    <MultiProvider
      providers={[
        Theme
      ]}
      children={props.children} />
  );
}
