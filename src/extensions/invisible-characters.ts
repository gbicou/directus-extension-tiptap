import type { ExtensionMeta } from "./index";

const extension: ExtensionMeta = {
  name: "invisibleCharacters",
  title: "Invisible characters",
  package: "@tiptap-pro/extension-invisible-characters",
  group: "editor",
  defaults: {},
  options: [],
  load: async () => {
    const { InvisibleCharacters } = await import("@tiptap-pro/extension-invisible-characters");
    return InvisibleCharacters;
  },
};

export default extension;
