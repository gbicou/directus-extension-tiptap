import type { Editor } from "@tiptap/vue-3";
import { ref } from "vue";
import { getPublicURL } from "../utils/get-root-path";

type ImageSelection = {
  imageUrl: string;
  alt: string;
};

export function useImage(editor: Editor) {
  const imageDrawerOpen = ref(false);
  const imageSelection = ref<ImageSelection | null>(null);

  function imageOpen() {
    if (editor.isActive("image")) {
      const attrs = editor.getAttributes("image");
      imageSelection.value = {
        imageUrl: attrs.src,
        alt: attrs.alt,
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
          src: imageSelection.value.imageUrl,
          alt: imageSelection.value.alt,
        })
        .run();
    }
    imageClose();
  }

  function imageSelect(image: Record<string, never>) {
    const assetUrl = getPublicURL() + "assets/" + image.id;

    imageSelection.value = {
      imageUrl: assetUrl,
      alt: image.title,
    };
  }

  return { imageDrawerOpen, imageSelection, imageSelect, imageOpen, imageClose, imageSave };
}
