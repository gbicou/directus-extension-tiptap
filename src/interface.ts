import { defineInterface } from "@directus/extensions-sdk";
import TiptapInterface from "./tiptap-interface.vue";

export default defineInterface({
  id: "tiptap",
  name: "TipTap",
  icon: "text_fields",
  description: "Tip Tap editor",
  component: TiptapInterface,
  types: ["json", "text"],
  group: "standard",
  options: null,
  recommendedDisplays: ["tiptap"],
});
