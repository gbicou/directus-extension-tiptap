import { defineDisplay } from "@directus/extensions-sdk";
import TiptapDisplay from "./tiptap-display.vue";

export default defineDisplay({
  id: "tiptap",
  name: "TipTap",
  icon: "text_fields",
  description: "Tip Tap content",
  component: TiptapDisplay,
  options: null,
  types: ["json", "text"],
});
