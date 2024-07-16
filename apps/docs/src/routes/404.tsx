import { A } from "@solidjs/router";
import { Title } from "@solidjs/meta";

import { Button } from "@material-solid/components/button";
import { MaterialSymbol } from "@material-solid/components/icon";

import { layoutStyle, headlineStyle, imageStyle, contentStyle } from "./404.css";

import image from "~/assets/404.png";

export default function NotFound() {
  return (
    <main class={layoutStyle}>
      <Title>404 | Material Solid</Title>
      <img class={imageStyle} src={image} />

      <div class={contentStyle}>
        <p class={headlineStyle}>This page cannot be found</p>
        <p>
          Try a different destination.
        </p>
        <Button.filled
          as="a"
          href="/"
          icon={<MaterialSymbol name="arrow_back" />}
          label="Homepage" />
      </div>


    </main>
  );
}
