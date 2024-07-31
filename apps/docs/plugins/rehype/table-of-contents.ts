import type { Plugin } from "unified";
import type { Program } from "estree";

import { visit } from "unist-util-visit";

export const rehypeTableOfContents: Plugin<[], Program> = () => {
  return (ast, file) => {
    visit(ast, (node, index, parent) => {

    });

    ast.body.unshift()
  };
}
