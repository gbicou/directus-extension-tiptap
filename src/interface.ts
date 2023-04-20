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
    const opts: DeepPartial<Field>[] = [];

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
          choices: localExtensions.map((ext) => ({
            value: ext.name,
            text: `${ext.title} [${ext.package}]`,
          })),
        },
      },
    });

    if (field.meta?.options) {
      // append extensions options
      for (const ext of localExtensions) {
        if (field.meta.options.extensions?.includes(ext.name)) {
          opts.push(...ext.options);
        }
      }
    }

    return opts;
  },
});
