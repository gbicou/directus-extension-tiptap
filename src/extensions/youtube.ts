import type { ExtensionMeta } from "./index";

const extension: ExtensionMeta = {
  name: "youtube",
  title: "Youtube",
  package: "@tiptap/extension-youtube",
  group: "node",
  defaults: {},
  options: [],
  load: async () => {
    const { Youtube } = await import("@tiptap/extension-youtube");
    return Youtube;
  },
};

export default extension;
