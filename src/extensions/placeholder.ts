import type { ExtensionMeta } from "./index";
import { Placeholder } from "@tiptap/extension-placeholder";

const extension: ExtensionMeta<typeof Placeholder> = {
  name: "placeholder",
  title: "Placeholder",
  package: "@tiptap/extension-placeholder",
  group: "editor",
  defaults: {
    placeholder: "",
  },
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
