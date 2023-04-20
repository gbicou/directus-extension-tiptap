import type { AnyExtension, Extensions } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import type { CharacterCountOptions } from "@tiptap/extension-character-count";
import type { TextAlignOptions } from "@tiptap/extension-text-align";
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
import link from "./extensions/link";

interface ExtensionsProps {
  extensions: string[] | null;
  placeholder: PlaceholderOptions["placeholder"];
  characterCountLimit: CharacterCountOptions["limit"];
  characterCountMode: CharacterCountOptions["mode"];
  textAlignTypes: TextAlignOptions["types"];
}

type ExtensionGroup = "mark" | "node" | "editor";

export interface IExtension<E extends AnyExtension> {
  name: string;
  title: string;
  package: string;
  group: ExtensionGroup;
  options: DeepPartial<Field>[];
  load(props: ExtensionsProps): E;
  defaults: Partial<E["options"]>;
}

export const localExtensions: IExtension<AnyExtension>[] = [
  // marks
  highlight,
  link,
  superscript,
  subscript,
  underline,
  // nodes
  textAlign,
  // editor
  placeholder,
  typography,
  characterCount,
];

export const extensionsGroups: { group: ExtensionGroup; label: string }[] = [
  { group: "mark", label: "Marks" },
  { group: "node", label: "Nodes" },
  { group: "editor", label: "Editor" },
];

export function loadExtensions(props: ExtensionsProps): Extensions {
  const extensions: Extensions = [StarterKit];

  for (const ext of localExtensions) {
    if (props.extensions?.includes(ext.name)) {
      extensions.push(ext.load(props));
    }
  }

  return extensions;
}
