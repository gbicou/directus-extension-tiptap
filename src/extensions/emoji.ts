import type { ExtensionMeta } from "./index";
import { suggestion } from "./emoji-suggestion";
import type { EmojiOptions } from "@tiptap-pro/extension-emoji";

type Options = Pick<EmojiOptions, "enableEmoticons">;

const defaults: Options = {
  enableEmoticons: false,
};

export type EmojiProps = {
  emojiEnableEmoticons: Options["enableEmoticons"];
};

const extension: ExtensionMeta<Options, EmojiProps> = {
  name: "emoji",
  title: "Emoji",
  package: "@tiptap-pro/extension-emoji",
  group: "node",
  defaults,
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
        default_value: defaults.enableEmoticons,
      },
    },
  ],
  load: async (props) => {
    const { Emoji } = await import("@tiptap-pro/extension-emoji");
    return Emoji.configure({
      enableEmoticons: props.emojiEnableEmoticons ?? defaults.enableEmoticons,
      suggestion,
    });
  },
};

export default extension;
