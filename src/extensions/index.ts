import type { AnyExtension, Extensions } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import type { DeepPartial, Field } from "@directus/types";
import underline from "./underline";
import textAlign, { type TextAlignProps } from "./text-align";
import characterCount, { type CharacterCountProps } from "./character-count";
import subscript from "./subscript";
import superscript from "./superscript";
import highlight from "./highlight";
import typography from "./typography";
import placeholder, { type PlaceholderProps } from "./placeholder";
import link from "./link";
import focus, { type FocusProps } from "./focus";
import task, { type TaskProps } from "./task";
import table, { type TableProps } from "./table";
import image, { type ImageProps } from "./image";
import invisibleCharacters from "./invisible-characters";
import emoji, { type EmojiProps } from "./emoji";
import uniqueId, { type UniqueIDProps } from "./unique-id";
import mathematics from "./mathematics";
type ExtensionGroup = "mark" | "node" | "editor";

export const extensionsGroups: { group: ExtensionGroup; label: string }[] = [
  { group: "mark", label: "Marks" },
  { group: "node", label: "Nodes" },
  { group: "editor", label: "Editor" },
];

export type ExtensionsProps = {
  extensions: string[] | null;
} & TableProps &
  ImageProps &
  TaskProps &
  TextAlignProps &
  PlaceholderProps &
  FocusProps &
  CharacterCountProps &
  EmojiProps &
  UniqueIDProps;

export interface ExtensionMeta<Options extends object = object, Props extends object = object> {
  name: string;
  title: string;
  package: string;
  group: ExtensionGroup;
  options: DeepPartial<Field>[];
  defaults: Options;
  load(props: Props): PromiseLike<AnyExtension> | AnyExtension;
}

export const extensionsMeta: ExtensionMeta[] = [
  // marks
  highlight,
  link,
  superscript,
  subscript,
  underline,
  // nodes
  table,
  image,
  task,
  textAlign,
  // editor
  placeholder,
  focus,
  typography,
  characterCount,
  // pro
  invisibleCharacters,
  emoji,
  uniqueId,
  mathematics,
];

export async function loadExtensions(props: ExtensionsProps): Promise<Extensions> {
  const extensions: Extensions = [StarterKit];

  const exts = await Promise.all(
    extensionsMeta.filter((ext) => props.extensions?.includes(ext.name)).map((ext) => ext.load(props)),
  );

  extensions.push(...exts);

  return extensions;
}
