import type { CharacterCountOptions } from "@tiptap/extension-character-count";
import type { TextAlignOptions } from "@tiptap/extension-text-align";

const textAlignTypes: TextAlignOptions["types"] = ["heading", "paragraph"];

const characterCountLimit: CharacterCountOptions["limit"] = null;
const characterCountMode: CharacterCountOptions["mode"] = "textSize";

export default {
  textAlignTypes,
  characterCountLimit,
  characterCountMode,
};
