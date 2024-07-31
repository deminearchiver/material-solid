import type { APIRoute } from "astro";
import rss from "@astrojs/rss";

export const GET: APIRoute = (context) => {
  return rss({
    title: "Material Solid",
    description: "",
    items: [],
    site: context.site!,
  });
}
