import type { ExtensionMeta } from "./index";
import Focus, { type FocusOptions } from "@tiptap/extension-focus";

const defaults: Partial<FocusOptions> = {
  mode: "all",
};

const extension: ExtensionMeta<typeof Focus> = {
  name: "focus",
  title: "Focus",
  package: "@tiptap/extension-focus",
  group: "editor",
  defaults,
  options: [
    {
      field: "focusMode",
      name: "Focus mode",
      type: "string",
      meta: {
        interface: "select-dropdown",
        width: "half",
        note: "Apply the effect to 'all', the 'shallowest' or the 'deepest' node",
        options: {
          choices: [
            { text: "all", value: "all" },
            { text: "shallowest", value: "shallowest" },
            { text: "deepest", value: "deepest" },
          ],
        },
      },
      schema: {
        default_value: defaults.mode,
      },
    },
  ],
  load(props) {
    return Focus.configure({
      mode: props.focusMode ?? defaults.mode,
    });
  },
};

export default extension;
