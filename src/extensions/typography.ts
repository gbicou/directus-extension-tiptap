import type { ExtensionMeta } from "./index";
import { Typography } from "@tiptap/extension-typography";

const extension: ExtensionMeta<typeof Typography> = {
  name: "typography",
  title: "Typography",
  package: "@tiptap/extension-typography",
  group: "editor",
  defaults: {},
  options: [],
  load() {
    return Typography;
  },
};

export default extension;
