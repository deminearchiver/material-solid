import { ListItem } from "@material-solid/components/list";
import { Switch } from "@material-solid/components/switch";
import { splitProps, type Component, type JSX } from "solid-js";

export type SwitchListItemProps = {
  onSelectedChanged?: (value: boolean) => void;
  selected: boolean;
  icon?: JSX.Element;
  headline: JSX.Element;
  subtitle?: JSX.Element;
}

export const SwitchListItem: Component<SwitchListItemProps> = (props) => {
  const [local] = splitProps(
    props,
    ["icon", "headline", "subtitle", "selected", "onSelectedChanged"]
  )
  return (
    <ListItem
      onClick={() => {
        local.onSelectedChanged?.(!local.selected);
      }}
      type="button"
      leading={local.icon}
      headline={local.headline}
      subtitle={local.subtitle}
      trailing={
        <Switch
          onChanged={value => local.onSelectedChanged?.(value)}
          selected={local.selected} />
      } />
  );
}
