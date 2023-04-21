import type { Editor } from "@tiptap/vue-3";
import { ref } from "vue";

type ImageSelection = {
  imageUrl: string;
  alt?: string;
  width?: number;
  height?: number;
  transformationKey?: string | null;
  previewUrl?: string;
};

export function useImage(editor: Editor) {
  const imageDrawerOpen = ref(false);
  const imageSelection = ref<ImageSelection | null>(null);

  function imageOpen() {
    const attrs = editor.getAttributes("image");
    imageSelection.value = attrs.href;
    imageDrawerOpen.value = true;
  }

  function imageClose() {
    imageDrawerOpen.value = false;
    imageSelection.value = null;
  }

  function imageSave() {
    editor
      .chain()
      .focus()
      .setImage({ src: imageSelection.value.imageUrl })
      .run();
    imageClose();
  }

  function imageSelect(image: Record<string, any>) {
    const assetUrl = 'http://0.0.0.0:8055/assets/' + image.id;

    imageSelection.value = {
      imageUrl: assetUrl,
    };
  }

  return { imageDrawerOpen, imageSelection, imageSelect, imageOpen, imageClose, imageSave };
}
