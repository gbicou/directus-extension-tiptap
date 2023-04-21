import type { IExtension } from "../extensions";
import { Image } from "@tiptap/extension-image";

const extension: IExtension<typeof Image> = {
  name: "image",
  title: "Image",
  package: "@tiptap/extension-image",
  group: "node",
  defaults: {},
  options: [],
  load() {
    return Image;
  },
};

export default extension;
