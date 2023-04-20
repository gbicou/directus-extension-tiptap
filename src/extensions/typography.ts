import type { IExtension } from "../extensions";
import { Typography } from "@tiptap/extension-typography";

const extension: IExtension<typeof Typography> = {
  name: "typography",
  title: "Typography",
  package: "@tiptap/extension-typography",
  defaults: {},
  options: [],
  load() {
    return Typography;
  },
};

export default extension;
