import { z, type SchemaContext } from "astro:content";

export const docsSchema = (context: SchemaContext) =>
  z.object({
    title: z.string(),
  });
