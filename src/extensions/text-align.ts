import type { IExtension } from "../extensions";
import { TextAlign, type TextAlignOptions } from "@tiptap/extension-text-align";

const defaults: Partial<TextAlignOptions> = {
  types: ["heading", "paragraph"],
};

const extension: IExtension<typeof TextAlign> = {
  name: "textAlign",
  title: "TextAlign",
  package: "@tiptap/extension-text-align",
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
  load(options) {
    return TextAlign.configure({
      types: options.textAlignTypes ?? defaults.types,
    });
  },
};

export default extension;
