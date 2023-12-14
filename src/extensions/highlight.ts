import type { ExtensionMeta } from "./index";
import { Highlight } from "@tiptap/extension-highlight";

const extension: ExtensionMeta = {
  name: "highlight",
  title: "Highlight",
  package: "@tiptap/extension-highlight",
  group: "mark",
  defaults: {},
  options: [],
  load() {
    return Highlight;
  },
};

export default extension;
