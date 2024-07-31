import { defineCollection, z } from "astro:content";
import { docsSchema } from "../schemas/docs";

export const collections = {
  docs: defineCollection({
    type: "content",
    schema: docsSchema,
  }),
};
