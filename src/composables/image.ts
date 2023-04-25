import type { Editor } from "@tiptap/vue-3";
import { ref } from "vue";
import { getPublicURL } from "../utils/get-root-path";

type ImageSelection = {
  id: string;
  alt: string;
  filename?: string;
  previewSrc: string;
};

const publicURL = getPublicURL();

function getPreviewSrc(id: string): string {
  return publicURL + "assets/" + id;
}

export function useImage(editor: Editor) {
  const imageDrawerOpen = ref(false);
  const imageSelection = ref<ImageSelection | null>(null);

  function imageOpen() {
    if (editor.isActive("image")) {
      const attrs = editor.getAttributes("image");
      imageSelection.value = {
        id: attrs.id,
        alt: attrs.alt,
        filename: attrs.filename,
        previewSrc: getPreviewSrc(attrs.id),
      };
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
      editor
        .chain()
        .focus()
        .setImage({
          id: imageSelection.value.id,
          alt: imageSelection.value.alt,
          filename: imageSelection.value.filename,
        })
        .run();
    }
    imageClose();
  }

  function imageSelect(image: Record<string, never>) {
    imageSelection.value = {
      id: image.id,
      alt: image.title,
      filename: image.filename_download,
      previewSrc: getPreviewSrc(image.id),
    };
  }

  return { imageDrawerOpen, imageSelection, imageSelect, imageOpen, imageClose, imageSave };
}
