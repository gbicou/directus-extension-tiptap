import type { AnyExtension, Extensions } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import type { CharacterCountOptions } from "@tiptap/extension-character-count";
import type { TextAlignOptions } from "@tiptap/extension-text-align";
import { Link } from "@tiptap/extension-link";
import type { PlaceholderOptions } from "@tiptap/extension-placeholder";
import type { DeepPartial, Field } from "@directus/shared/types";
import underline from "./extensions/underline";
import textAlign from "./extensions/text-align";
import characterCount from "./extensions/character-count";
import subscript from "./extensions/subscript";
import superscript from "./extensions/superscript";
import highlight from "./extensions/highlight";
import typography from "./extensions/typography";
import placeholder from "./extensions/placeholder";

export interface ExtensionsProps {
  extensions: string[] | null;
  placeholder: PlaceholderOptions["placeholder"];
  characterCountLimit: CharacterCountOptions["limit"];
  characterCountMode: CharacterCountOptions["mode"];
  textAlignTypes: TextAlignOptions["types"];
}

export interface IExtension<E extends AnyExtension> {
  name: string;
  title: string;
  package: string;
  options: DeepPartial<Field>[];
  load(props: ExtensionsProps): E;
  defaults: Partial<E["options"]>;
}

export const localExtensions: IExtension<AnyExtension>[] = [
  placeholder,
  underline,
  superscript,
  subscript,
  highlight,
  textAlign,
  typography,
  characterCount,
];

export function loadExtensions(props: ExtensionsProps): Extensions {
  const extensions: Extensions = [
    StarterKit,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        target: null,
      },
    }),
  ];

  for (const ext of localExtensions) {
    if (props.extensions?.includes(ext.name)) {
      extensions.push(ext.load(props));
    }
  }

  return extensions;
}
