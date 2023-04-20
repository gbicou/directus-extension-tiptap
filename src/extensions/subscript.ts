import type { IExtension } from "../extensions";
import { Subscript } from "@tiptap/extension-subscript";

const extension: IExtension<typeof Subscript> = {
  name: "subscript",
  title: "Subscript",
  package: "@tiptap/extension-subscript",
  defaults: {},
  options: [],
  load() {
    return Subscript;
  },
};

export default extension;
