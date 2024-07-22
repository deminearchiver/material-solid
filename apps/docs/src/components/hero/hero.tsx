import { Button } from "@material-solid/components/button";
import { MaterialSymbol } from "@material-solid/components/icon";
import type { Component } from "solid-js";

export const Hero: Component = () => {
  return (
    <section>
      <Button.filled
        icon={
          <MaterialSymbol name="rocket_launch" />
        }
        label="Let's go!" />
    </section>
  );
}
