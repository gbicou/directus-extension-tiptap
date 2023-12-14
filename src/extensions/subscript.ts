import type { ExtensionMeta } from "./index";
import { Subscript } from "@tiptap/extension-subscript";

const extension: ExtensionMeta = {
  name: "subscript",
  title: "Subscript",
  package: "@tiptap/extension-subscript",
  group: "mark",
  defaults: {},
  options: [],
  load() {
    return Subscript;
  },
};

export default extension;
