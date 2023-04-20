import { defineInterface } from "@directus/extensions-sdk";
import type { Field, DeepPartial } from "@directus/shared/types";
import TiptapEditor from "./tiptap-editor.vue";
import { localExtensions } from "./extensions";

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
    const options: DeepPartial<Field>[] = [
      {
        field: "extensions",
        name: "TipTap Extensions",
        type: "json",
        schema: {
          default_value: null,
        },
        meta: {
          width: "full",
          interface: "select-multiple-dropdown",
          options: {
            choices: localExtensions.map((extension) => ({
              value: extension.name,
              text: `${extension.title} [${extension.package}]`,
            })),
          },
        },
      },
    ];

    if (field.meta?.options) {
      // append options of selected extensions
      for (const extension of localExtensions) {
        if (field.meta.options.extensions?.includes(extension.name)) {
          options.push(...extension.options);
        }
      }
    }

    return options;
  },
});
