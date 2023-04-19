import { defineInterface } from "@directus/extensions-sdk";
import type { Field, DeepPartial } from "@directus/shared/types";
import TiptapEditor from "./tiptap-editor.vue";
import defaults from "./defaults";

export default defineInterface({
  id: "tiptap",
  name: "TipTap",
  icon: "text_fields",
  description: "Tip Tap editor",
  component: TiptapEditor,
  types: ["json", "text"],
  group: "standard",
  recommendedDisplays: ["tiptap"],
  options: ({ field }) => {
    const opts: DeepPartial<Field>[] = [];

    opts.push({
      field: "placeholder",
      name: "$t:placeholder",
      type: "string",
      meta: {
        width: "full",
        interface: "system-input-translated-string",
        options: {
          placeholder: "$t:enter_a_placeholder",
        },
      },
    });

    opts.push({
      field: "extensions",
      name: "TipTap Extensions",
      type: "json",
      schema: {
        default_value: null,
      },
      meta: {
        width: "full",
        interface: "select-multiple-checkbox",
        options: {
          choices: [
            {
              value: "textAlign",
              text: "TextAlign [@tiptap/extension-text-align]",
            },
            {
              value: "characterCount",
              text: "CharacterCount [@tiptap/extension-character-count]",
            },
          ],
        },
      },
    });

    if (field.meta?.options) {
      if (field.meta.options.extensions?.includes("textAlign")) {
        opts.push({
          field: "textAlignTypes",
          name: "Text align types",
          type: "json",
          schema: {
            default_value: defaults.textAlignTypes,
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
        });
      }

      if (field.meta.options.extensions?.includes("characterCount")) {
        opts.push(
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
              default_value: defaults.characterCountLimit,
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
              default_value: defaults.characterCountMode,
            },
          }
        );
      }
    }

    return opts;
  },
});
