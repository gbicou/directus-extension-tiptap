import { defineInterface } from "@directus/extensions-sdk";
import type { Field, DeepPartial } from "@directus/shared/types";
import TiptapEditor from "./tiptap-editor.vue";

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
              value: "characterCount",
              text: "Character count [@tiptap/extension-character-count]",
            },
          ],
        },
      },
    });

    if (field.meta?.options) {
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
              default_value: null,
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
              default_value: "textSize",
            },
          }
        );
      }
    }

    return opts;
  },
});
