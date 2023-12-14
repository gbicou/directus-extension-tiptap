import type { ExtensionMeta } from "./index";
import { mergeAttributes, Node } from "@tiptap/core";
import { getPublicURL } from "../utils/get-root-path";

interface ImageAttributes {
  id: string;
  alt?: string;
  filename?: string;
  width?: string;
  height?: string;
  title?: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    image: {
      /**
       * Add an image
       */
      setImage: (options: ImageAttributes) => ReturnType;
    };
  }
}
interface ImageOptions {
  publicURL: string;
  HTMLAttributes: Record<string, never>;
}

export const Image = Node.create<ImageOptions>({
  name: "image",
  inline: false,
  group: "block",
  draggable: true,

  addOptions() {
    return {
      publicURL: getPublicURL(),
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-directus-id"),
        renderHTML: (attributes) => {
          return {
            "data-directus-id": attributes.id,
          };
        },
      },
      alt: {
        default: null,
      },
      filename: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-directus-filename"),
        renderHTML: (attributes) => {
          if (!attributes.filename) {
            return {};
          }
          return {
            "data-directus-filename": attributes.filename,
          };
        },
      },
      width: {
        default: null,
      },
      height: {
        default: null,
      },
      title: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img[data-directus-id]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const id = HTMLAttributes["data-directus-id"];
    const filename = HTMLAttributes["data-directus-filename"];
    const src = this.options.publicURL + id + (filename ? "/" + filename : "");
    return ["img", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { src })];
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});

export type ImageProps = {
  cdnURL?: string | null;
};

const extension: ExtensionMeta<Record<string, never>, ImageProps> = {
  name: "image",
  title: "Image",
  package: "File Library",
  group: "node",
  defaults: {},
  options: [
    {
      field: "cdnURL",
      name: "CDN URL",
      type: "string",
      meta: {
        interface: "string",
        width: "half",
        note: "CDN address for HTML output (optional)",
      },
    },
  ],
  load(props) {
    return Image.configure({
      publicURL: props.cdnURL
        ? props.cdnURL?.endsWith("/")
          ? props.cdnURL
          : props.cdnURL + "/"
        : getPublicURL() + "assets/",
    });
  },
};

export default extension;
