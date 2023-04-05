import StarterKit from "@tiptap/starter-kit";
import type { Extensions } from "@tiptap/core";

// export const extensions: Extensions = [StarterKit];

export async function loadExtensions(underline = true): Promise<Extensions> {
  const test = await new Promise<string>((resolve) => setTimeout(() => resolve("OK 1sec"), 1000));
  console.debug(test);

  const extensions: Extensions = [StarterKit];
  if (underline) {
    const { Underline } = await import("@tiptap/extension-underline");
    extensions.push(Underline);
  }
  return extensions;
}
