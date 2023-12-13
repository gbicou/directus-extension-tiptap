import type { ExtensionMeta } from "./index";
import { suggestion } from "./emoji-suggestion";

const extension: ExtensionMeta = {
  name: "emoji",
  title: "Emoji",
  package: "@tiptap-pro/extension-emoji",
  group: "node",
  defaults: {
    enableEmoticons: false,
  },
  options: [
    {
      field: "emojiEnableEmoticons",
      name: "Emoji emoticons",
      type: "boolean",
      meta: {
        interface: "boolean",
        width: "half",
        note: "Specifies whether text should be converted to emoticons (e.g. <3 to ❤️)",
      },
      schema: {
        default_value: false,
      },
    },
  ],
  load: async (props) => {
    const { Emoji } = await import("@tiptap-pro/extension-emoji");
    return Emoji.configure({
      enableEmoticons: props.emojiEnableEmoticons,
      suggestion,
    });
  },
};

export default extension;
