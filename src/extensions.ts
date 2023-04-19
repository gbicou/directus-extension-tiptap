import type { Extensions } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { CharacterCount, type CharacterCountOptions } from "@tiptap/extension-character-count";
import { Typography } from "@tiptap/extension-typography";
import { TextAlign, type TextAlignOptions } from "@tiptap/extension-text-align";
import { Link } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import defaults from "./defaults";

export interface ExtensionsOptions {
  placeholder: string | null;
  extensions: string[] | null;
  characterCountLimit: CharacterCountOptions["limit"];
  characterCountMode: CharacterCountOptions["mode"];
  textAlignTypes: TextAlignOptions["types"];
}

export function loadExtensions(props: ExtensionsOptions): Extensions {
  const extensions: Extensions = [
    StarterKit,
    Underline,
    Highlight,
    Subscript,
    Superscript,
    Typography,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        target: null,
      },
    }),
  ];

  if (props.placeholder) {
    extensions.push(Placeholder.configure({ placeholder: props.placeholder }));
  }

  if (props.extensions?.includes("textAlign")) {
    extensions.push(
      TextAlign.configure({
        types: props.textAlignTypes ?? defaults.textAlignTypes,
      })
    );
  }

  if (props.extensions?.includes("characterCount")) {
    extensions.push(
      CharacterCount.configure({
        limit: props.characterCountLimit ?? defaults.characterCountLimit,
        mode: props.characterCountMode ?? defaults.characterCountMode,
      })
    );
  }

  return extensions;
}
