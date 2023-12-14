import type { ExtensionMeta } from "./index";
import { Placeholder, type PlaceholderOptions } from "@tiptap/extension-placeholder";

type Options = Pick<PlaceholderOptions, "placeholder">;

const defaults: Options = {
  placeholder: "",
};

export type PlaceholderProps = {
  placeholder: Options["placeholder"];
};

const extension: ExtensionMeta<Options, PlaceholderProps> = {
  name: "placeholder",
  title: "Placeholder",
  package: "@tiptap/extension-placeholder",
  group: "editor",
  defaults,
  options: [
    {
      field: "placeholder",
      name: "$t:placeholder",
      type: "string",
      meta: {
        width: "full",
        interface: "system-input-translated-string",
        note: "Displays the text hint on the first line in an empty editor",
        options: {
          placeholder: "$t:enter_a_placeholder",
        },
      },
    },
  ],
  load(props) {
    return Placeholder.configure({
      placeholder: props.placeholder,
    });
  },
};

export default extension;
