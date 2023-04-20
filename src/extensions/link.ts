import type { IExtension } from "../extensions";
import { Link } from "@tiptap/extension-link";

const extension: IExtension<typeof Link> = {
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
