import type { Editor } from "@tiptap/vue-3";
import { ref } from "vue";

/**
 * Composable providing functionality for managing links in the tiptap editor
 *
 * @param {Editor} editor - The Tiptap editor instance
 * @returns An object containing link functions and state.
 */
export function useLink(editor: Editor) {
  /**
   * ref tracking if the link drawer UI is open.
   */
  const linkDrawerOpen = ref(false);
  /**
   * ref tracking the href for the link being edited.
   */
  const linkHref = ref("");
  /**
   * ref tracking the target for the link being edited.
   */
  const linkTarget = ref("");

  /**
   * Opens the link drawer and populates href/target refs from current link.
   */
  function linkOpen() {
    const attrs = editor.getAttributes("link");
    linkHref.value = attrs.href;
    linkTarget.value = attrs.target;
    linkDrawerOpen.value = true;
  }

  /**
   * Closes the link drawer and resets href/target refs.
   */
  function linkClose() {
    linkDrawerOpen.value = false;
    linkHref.value = "";
    linkTarget.value = "";
  }

  /**
   * Applies the href/target values to the current link in the editor.
   */
  function linkSave() {
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: linkHref.value, target: linkTarget.value || null })
      .run();
    linkClose();
  }

  /**
   * Removes the link from the current selection.
   */
  function linkRemove() {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
  }

  return { linkDrawerOpen, linkHref, linkTarget, linkOpen, linkClose, linkSave, linkRemove };
}
