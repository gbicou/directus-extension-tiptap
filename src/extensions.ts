import StarterKit from "@tiptap/starter-kit";
import type { Extensions } from "@tiptap/core";

export async function loadExtensions(underline = true): Promise<Extensions> {
  const extensions: Extensions = [StarterKit];
  if (underline) {
    const { Underline } = await import("@tiptap/extension-underline");
    extensions.push(Underline);
  }
  return extensions;
}
