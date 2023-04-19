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
      field: "characterCountEnable",
      name: "Enable character count",
      type: "boolean",
      meta: {
        width: "full",
        interface: "boolean",
      },
      schema: {
        default_value: false,
      },
    });

    if (field.meta?.options) {
      if (field.meta?.options.characterCountEnable) {
        opts.push(
          {
            field: "characterCountLimit",
            name: "Limit",
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
            name: "Mode",
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
