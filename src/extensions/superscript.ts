import type { ExtensionMeta } from "./index";
import { Superscript } from "@tiptap/extension-superscript";

const extension: ExtensionMeta = {
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
