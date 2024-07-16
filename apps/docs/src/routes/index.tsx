import { Title } from "@solidjs/meta";
import { AppBar } from "~/components/app-bar";

import { IconButton } from "@material-solid/components/icon-button";

import { createScrollPosition } from "@solid-primitives/scroll";

export default function Index() {
  return (
    <>
      <Title>Components | Material Solid</Title>

      <AppBar leading={<IconButton />} title="Material Solid" />

      <main style={{ height: "2000px" }}>

      </main>
    </>
  );
}
