import StarterKit from "@tiptap/starter-kit";
import type { Extensions } from "@tiptap/core";

export async function loadExtensions(underline = true, highlight = true): Promise<Extensions> {
  const extensions: Extensions = [StarterKit];
  if (underline) {
    const { Underline } = await import("@tiptap/extension-underline");
    extensions.push(Underline);
  }
  if (highlight) {
    const { Highlight } = await import("@tiptap/extension-highlight");
    extensions.push(Highlight);
  }
  return extensions;
}
