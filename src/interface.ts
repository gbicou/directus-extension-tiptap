import { defineInterface } from "@directus/extensions-sdk";
import type { Field, DeepPartial } from "@directus/types";
import TiptapInterface from "./tiptap-interface.vue";
import { extensionsMeta, extensionsGroups } from "./extensions";

const extensionsChoices = extensionsGroups.map((group) => ({
  text: group.label,
  value: group.group,
  children: extensionsMeta
    .filter((extension) => extension.group === group.group)
    .map((extension) => ({
      value: extension.name,
      text: `${extension.title} [${extension.package}]`,
    })),
}));

export default defineInterface({
  id: "tiptap",
  name: "TipTap",
  icon: "text_fields",
  description: "Tip Tap editor",
  component: TiptapInterface,
  types: ["json", "text"],
  group: "standard",
  recommendedDisplays: ["tiptap"],
  options: ({ field }) => {
    const options: DeepPartial<Field>[] = [
      {
        field: "extensions",
        name: "Extensions",
        type: "json",
        schema: {
          default_value: null,
        },
        meta: {
          width: "full",
          note: "Add new capabilities to the editor. StarterKit is already included.",
          interface: "select-multiple-checkbox-tree",
          options: { choices: extensionsChoices },
        },
      },
    ];

    if (field.meta?.options) {
      // append options of selected extensions
      for (const extension of extensionsMeta) {
        if (field.meta.options.extensions?.includes(extension.name)) {
          options.push(...extension.options);
        }
      }
    }

    return options;
  },
});
