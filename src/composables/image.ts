import type { Editor } from "@tiptap/vue-3";
import { ref } from "vue";
import type { ImageAttributes } from "../extensions/image";

export function useImage(editor: Editor) {
  const imageDrawerOpen = ref(false);
  const imageSelection = ref<ImageAttributes | null>(null);

  function imageOpen() {
    if (editor.isActive("image")) {
      imageSelection.value = editor.getAttributes("image") as ImageAttributes;
    } else {
      imageSelection.value = null;
    }
    imageDrawerOpen.value = true;
  }

  function imageClose() {
    imageDrawerOpen.value = false;
    imageSelection.value = null;
  }

  function imageSave() {
    if (imageSelection.value) {
      editor.chain().focus().setImage(imageSelection.value).run();
    }
    imageClose();
  }

  function imageSelect(image: Record<string, never>) {
    imageSelection.value = {
      id: image.id,
      alt: image.title,
      filename: image.filename_download,
      width: image.width,
      height: image.height,
    };
  }

  return { imageDrawerOpen, imageSelection, imageSelect, imageOpen, imageClose, imageSave };
}
