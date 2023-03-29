<template>
  <div class="tiptap-editor">
    <!--
        <button @click="editor.chain().focus().toggleBold().run()">
            Bold
        </button>
        -->
    <editor-content class="tiptap-editor__content" :editor="editor" />
  </div>
</template>

<style lang="scss">
.tiptap-editor {
  color: var(--v-input-color);
  font-family: var(--v-input-font-family);
  background-color: var(--v-input-background-color);
  border: var(--border-width) solid var(--border-normal);
  border-radius: var(--border-radius);
  transition: border-color var(--fast) var(--transition);

  .tiptap-editor__content {
    padding: var(--input-padding);
  }

  &:hover {
    --arrow-color: var(--border-normal-alt);
    color: var(--v-input-color);
    background-color: var(--background-input);
    border-color: var(--border-normal-alt);
  }

  &:focus-within,
  &.active {
    --arrow-color: var(--border-normal-alt);
    color: var(--v-input-color);
    background-color: var(--background-input);
    border-color: var(--v-input-border-color-focus);
    box-shadow: 0 0 16px -8px var(--v-input-box-shadow-color-focus);
  }

  &.disabled {
    --arrow-color: var(--border-normal);
    color: var(--foreground-subdued);
    background-color: var(--background-subdued);
    border-color: var(--border-normal);
  }

  .ProseMirror {
    > * + * {
      margin-top: 0.75em;
    }
  }
}
</style>

<script setup lang="ts">
import { Editor, EditorContent, HTMLContent, JSONContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { onBeforeUnmount, watch } from "vue";

type ValueType = "json" | "text";

const props = withDefaults(
  defineProps<{
    value: JSONContent | HTMLContent | null;
    type: ValueType;
  }>(),
  { value: null }
);

const emit = defineEmits<{
  (e: "input", value: JSONContent | HTMLContent): void;
}>();

const editor = new Editor({
  content: props.value,
  extensions: [StarterKit],
  onUpdate: () => {
    switch (props.type) {
      case "json":
        emit("input", editor.getJSON());
        break;
      case "text":
        emit("input", editor.getHTML());
        break;
    }
  },
});

watch(
  () => props.value,
  (value) => {
    const isSame =
      props.type === "json" ? JSON.stringify(editor.getJSON()) === JSON.stringify(value) : editor.getHTML() === value;

    if (isSame) {
      return;
    }

    editor.commands.setContent(value, false);
  }
);

onBeforeUnmount(() => {
  editor.destroy();
});
</script>
