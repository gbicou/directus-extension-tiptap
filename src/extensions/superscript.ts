import type { ExtensionMeta } from "../extensions";
import { Superscript } from "@tiptap/extension-superscript";

const extension: ExtensionMeta<typeof Superscript> = {
  name: "superscript",
  title: "Superscript",
  package: "@tiptap/extension-superscript",
  group: "mark",
  defaults: {},
  options: [],
  load() {
    return Superscript;
  },
};

export default extension;
