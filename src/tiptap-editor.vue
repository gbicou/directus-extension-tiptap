<template>
  <div class="tiptap-editor" :class="{ disabled: props.disabled }">
    <div class="tiptap-editor__toolbar">
      <v-button
        v-tooltip="t('wysiwyg_options.bold')"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('bold')"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <v-icon name="format_bold" />
      </v-button>

      <v-button
        v-tooltip="t('wysiwyg_options.italic')"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('italic')"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <v-icon name="format_italic" />
      </v-button>
    </div>

    <editor-content class="tiptap-editor__content" :editor="editor" />
  </div>
</template>

<style scoped lang="scss">
.tiptap-editor {
  color: var(--v-input-color);
  font-family: var(--v-input-font-family);
  background-color: var(--v-input-background-color);
  border: var(--border-width) solid var(--border-normal);
  border-radius: var(--border-radius);
  transition: border-color var(--fast) var(--transition);
  min-height: 300px;

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

  &__toolbar {
    --v-button-background-color: transparent;
    --v-button-color: var(--foreground-normal);
    --v-button-background-color-hover: var(--border-normal);
    --v-button-color-hover: var(--foreground-normal);
    --v-button-background-color-active: var(--border-normal);
    --v-button-color-active: var(--foreground-normal);

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    min-height: 40px;
    padding: 0 2px;
    background-color: var(--background-subdued);
    border-bottom: 2px solid var(--border-normal);

    .v-button + .v-button {
      margin-left: 2px;
    }

    /*
    .spacer {
      flex-grow: 1;
    }
    */
  }

  &__content {
    font-family: var(--family-sans-serif);
    padding: var(--input-padding);
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
import { useI18n } from "vue-i18n";

const { t } = useI18n();

type ValueType = "json" | "text";

const props = withDefaults(
  defineProps<{
    value: JSONContent | HTMLContent | null;
    type: ValueType;
    disabled: boolean;
  }>(),
  { value: null, disabled: false }
);

const emit = defineEmits<{
  (e: "input", value: JSONContent | HTMLContent): void;
}>();

const editor = new Editor({
  editable: !props.disabled,
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
