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
  options: null,
  recommendedDisplays: ["tiptap"],
});
