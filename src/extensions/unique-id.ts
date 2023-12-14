import type { ExtensionMeta } from "./index";
import type { UniqueIDOptions } from "@tiptap-pro/extension-unique-id";
import type { AnyExtension } from "@tiptap/core";

export type UniqueIDProps = {
  uniqueIdAttributeName: UniqueIDOptions["attributeName"];
  uniqueIdTypes: UniqueIDOptions["types"];
};

const defaults: Partial<UniqueIDOptions> = {
  attributeName: "id",
  types: ["heading", "paragraph"],
};

const extension: ExtensionMeta<AnyExtension, UniqueIDOptions, UniqueIDProps> = {
  name: "uniqueId",
  title: "Unique ID",
  package: "@tiptap-pro/extension-unique-id",
  group: "editor",
  defaults,
  options: [
    {
      field: "uniqueIdAttributeName",
      name: "Unique ID attribute name",
      type: "string",
      schema: {
        default_value: defaults.attributeName,
      },
      meta: {
        width: "half",
        interface: "input",
        note: "Name of the attribute that is attached to the HTML tag",
        options: {
          placeholder: "id, uid, data-id, ...",
        },
      },
    },
    {
      field: "uniqueIdTypes",
      name: "Unique ID types",
      type: "json",
      schema: {
        default_value: defaults.types,
      },
      meta: {
        width: "full",
        interface: "select-multiple-dropdown",
        note: "All types that should get a unique ID",
        options: {
          choices: [
            {
              value: "heading",
              text: "heading",
            },
            {
              value: "paragraph",
              text: "paragraph",
            },
          ],
          allowOther: true,
          previewThreshold: 5,
        },
      },
    },
  ],
  load: async (props) => {
    const { UniqueID } = await import("@tiptap-pro/extension-unique-id");
    return UniqueID.configure({
      attributeName: props.uniqueIdAttributeName ?? defaults.attributeName,
      types: props.uniqueIdTypes ?? defaults.types,
    });
  },
};

export default extension;
