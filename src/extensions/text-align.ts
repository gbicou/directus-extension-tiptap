import type { ExtensionMeta } from "./index";
import { TextAlign, type TextAlignOptions } from "@tiptap/extension-text-align";

type Options = Pick<TextAlignOptions, "types">;

const defaults: Options = {
  types: ["heading", "paragraph"],
};

export type TextAlignProps = {
  textAlignTypes: Options["types"];
};

const extension: ExtensionMeta<Options, TextAlignProps> = {
  name: "textAlign",
  title: "TextAlign",
  package: "@tiptap/extension-text-align",
  group: "node",
  defaults,
  options: [
    {
      field: "textAlignTypes",
      name: "Text align types",
      type: "json",
      schema: {
        default_value: defaults.types,
      },
      meta: {
        width: "full",
        interface: "select-multiple-dropdown",
        note: "Nodes where the text align attribute should be applied to",
        options: {
          choices: [
            {
              value: "heading",
              text: "heading",
            },
            {
              value: "paragraph",
              text: "paragraph",
            },
          ],
          allowOther: true,
          previewThreshold: 5,
        },
      },
    },
  ],
  load(props) {
    return TextAlign.configure({
      types: props.textAlignTypes ?? defaults.types,
    });
  },
};

export default extension;
