import type { ExtensionMeta } from "./index";
import { CharacterCount, type CharacterCountOptions } from "@tiptap/extension-character-count";

type Options = Pick<CharacterCountOptions, "limit" | "mode">;

const defaults: Options = {
  limit: null,
  mode: "textSize",
};

export type CharacterCountProps = {
  characterCountLimit: Options["limit"];
  characterCountMode: Options["mode"];
};

const extension: ExtensionMeta<Options, CharacterCountProps> = {
  name: "characterCount",
  title: "CharacterCount",
  package: "@tiptap/extension-character-count",
  group: "editor",
  defaults,
  options: [
    {
      field: "characterCountLimit",
      name: "Character count limit",
      type: "integer",
      meta: {
        interface: "input",
        width: "half",
        note: "The maximum number of characters that should be allowed",
      },
      schema: {
        default_value: defaults.limit,
      },
    },
    {
      field: "characterCountMode",
      name: "Character count mode",
      type: "string",
      meta: {
        interface: "select-dropdown",
        width: "half",
        note: "The mode by which the size is calculated",
        options: {
          choices: [
            { text: "text", value: "textSize" },
            { text: "node", value: "nodeSize" },
          ],
        },
      },
      schema: {
        default_value: defaults.mode,
      },
    },
  ],
  load(props) {
    return CharacterCount.configure({
      limit: props.characterCountLimit ?? defaults.limit,
      mode: props.characterCountMode ?? defaults.mode,
    });
  },
};

export default extension;
