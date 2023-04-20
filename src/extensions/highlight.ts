import type { IExtension } from "../extensions";
import { Highlight } from "@tiptap/extension-highlight";

const extension: IExtension<typeof Highlight> = {
  name: "highlight",
  title: "Highlight",
  package: "@tiptap/extension-highlight",
  defaults: {},
  options: [],
  load() {
    return Highlight;
  },
};

export default extension;
