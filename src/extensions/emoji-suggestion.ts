import { VueRenderer } from "@tiptap/vue-3";
import EmojiList from "../components/emoji-list.vue";
import type { SuggestionOptions } from "@tiptap/suggestion";
import type { EmojiItem } from "@tiptap-pro/extension-emoji";
import tippy, { type Instance as TippyInstance } from "tippy.js";

export const suggestion: Omit<SuggestionOptions, "editor"> = {
  items: ({ editor, query }) => {
    return editor.storage.emoji.emojis
      .filter(({ shortcodes, tags }: EmojiItem) => {
        return (
          shortcodes.find((shortcode) => shortcode.startsWith(query.toLowerCase())) ||
          tags.find((tag) => tag.startsWith(query.toLowerCase()))
        );
      })
      .slice(0, 5);
  },

  render: () => {
    let component: VueRenderer | null = null;
    let popup: TippyInstance | null = null;

    return {
      onStart: (props) => {
        component = new VueRenderer(EmojiList, {
          props,
          editor: props.editor,
        });

        popup = tippy(document.body, {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },

      onUpdate(props) {
        component?.updateProps(props);

        popup?.setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props) {
        if (props.event.key === "Escape") {
          popup?.hide();
          component?.destroy();

          return true;
        }

        return component?.ref?.onKeyDown(props);
      },

      onExit() {
        popup?.destroy();
        component?.destroy();
      },
    };
  },
};
