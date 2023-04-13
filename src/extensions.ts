import type { Extensions } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { CharacterCount } from "@tiptap/extension-character-count";
import { Typography } from "@tiptap/extension-typography";
import { TextAlign } from "@tiptap/extension-text-align";

export const extensions: Extensions = [
  StarterKit,
  Underline,
  Highlight,
  Subscript,
  Superscript,
  CharacterCount,
  Typography,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];
