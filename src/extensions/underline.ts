import type { ExtensionMeta } from "./index";
import { Underline } from "@tiptap/extension-underline";

const extension: ExtensionMeta = {
  name: "underline",
  title: "Underline",
  package: "@tiptap/extension-underline",
  group: "mark",
  defaults: {},
  options: [],
  load() {
    return Underline;
  },
};

export default extension;
