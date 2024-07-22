import type { ExtensionMeta } from "./index";

const extension: ExtensionMeta = {
  name: "mathematics",
  title: "Mathematics",
  package: "@tiptap-pro/extension-mathematics",
  group: "editor",
  defaults: {},
  options: [],
  load: async () => {
    const { Mathematics } = await import("@tiptap-pro/extension-invisible-characters");
    return Mathematics;
  },
};

export default extension;
