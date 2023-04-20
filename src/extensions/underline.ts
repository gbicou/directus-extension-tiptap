import type { IExtension } from "../extensions";
import { Underline } from "@tiptap/extension-underline";

const extension: IExtension<typeof Underline> = {
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
