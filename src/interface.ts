import { defineInterface } from "@directus/extensions-sdk";
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
  options: [
    {
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
    },
  ],
});
