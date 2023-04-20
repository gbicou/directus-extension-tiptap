import type { Editor } from "@tiptap/vue-3";
import { ref } from "vue";

export function useLink(editor: Editor) {
  const linkDrawerOpen = ref(false);
  const linkHref = ref("");
  const linkTarget = ref("");

  function linkOpen() {
    const attrs = editor.getAttributes("link");
    linkHref.value = attrs.href;
    linkTarget.value = attrs.target;
    linkDrawerOpen.value = true;
  }

  function linkClose() {
    linkDrawerOpen.value = false;
    linkHref.value = "";
    linkTarget.value = "";
  }

  function linkSave() {
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: linkHref.value, target: linkTarget.value || null })
      .run();
    linkClose();
  }

  return { linkDrawerOpen, linkHref, linkTarget, linkOpen, linkClose, linkSave };
}
