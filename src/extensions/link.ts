import type { ExtensionMeta } from "./index";
import { Link } from "@tiptap/extension-link";

const extension: ExtensionMeta<typeof Link> = {
  name: "link",
  title: "Link",
  package: "@tiptap/extension-link",
  group: "mark",
  defaults: {},
  options: [],
  load() {
    return Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        target: null,
      },
    });
  },
};

export default extension;
