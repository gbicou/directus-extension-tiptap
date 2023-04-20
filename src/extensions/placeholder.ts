import type { IExtension } from "../extensions";
import { Placeholder } from "@tiptap/extension-placeholder";

const extension: IExtension<typeof Placeholder> = {
  name: "placeholder",
  title: "Placeholder",
  package: "@tiptap/extension-placeholder",
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
