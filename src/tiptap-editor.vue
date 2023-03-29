<template>
  <div class="tiptap-editor" :class="{ disabled: props.disabled }">
    <div class="tiptap-editor__toolbar">
      <v-button
        v-tooltip="t('wysiwyg_options.bold') + ' - ' + translateShortcut(['meta', 'b'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('bold')"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <v-icon name="format_bold" />
      </v-button>

      <v-button
        v-tooltip="t('wysiwyg_options.italic') + ' - ' + translateShortcut(['meta', 'i'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('italic')"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <v-icon name="format_italic" />
      </v-button>

      <v-button
        v-tooltip="t('wysiwyg_options.strikethrough') + ' - ' + translateShortcut(['meta', 'shift', 'x'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('strike')"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <v-icon name="format_strikethrough" />
      </v-button>

      <v-button
        v-tooltip="t('wysiwyg_options.bullist') + ' - ' + translateShortcut(['meta', 'shift', '8'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('bulletList')"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <v-icon name="format_list_bulleted" />
      </v-button>

      <v-button
        v-tooltip="t('wysiwyg_options.numlist') + ' - ' + translateShortcut(['meta', 'shift', '7'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('orderedList')"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        <v-icon name="format_list_numbered" />
      </v-button>

      <v-button
        v-tooltip="t('wysiwyg_options.blockquote') + ' - ' + translateShortcut(['meta', 'shift', 'b'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('blockquote')"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        <v-icon name="format_quote" />
      </v-button>

      <v-button
        v-tooltip="t('wysiwyg_options.codeblock') + ' - ' + translateShortcut(['meta', 'e'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('code')"
        @click="editor.chain().focus().toggleCode().run()"
      >
        <v-icon name="code" />
      </v-button>

      <v-button
        v-tooltip="t('wysiwyg_options.hr')"
        small
        icon
        :disabled="props.disabled"
        @click="editor.chain().focus().setHorizontalRule().run()"
      >
        <v-icon name="horizontal_rule" />
      </v-button>

      <div class="spacer" />

      <v-button
        v-tooltip="t('wysiwyg_options.undo') + ' - ' + translateShortcut(['meta', 'z'])"
        small
        icon
        :disabled="props.disabled || !editor.can().undo()"
        @click="editor.chain().focus().undo().run()"
      >
        <v-icon name="undo" />
      </v-button>

      <v-button
        v-tooltip="t('wysiwyg_options.redo') + ' - ' + translateShortcut(['meta', 'shift', 'z'])"
        small
        icon
        :disabled="props.disabled || !editor.can().redo()"
        @click="editor.chain().focus().redo().run()"
      >
        <v-icon name="redo" />
      </v-button>
    </div>

    <editor-content class="tiptap-editor__content prose" :editor="editor" />
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
    --v-button-background-color-disabled: transparent;

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

    .spacer {
      flex-grow: 1;
    }
  }

  &__content {
    font-family: var(--family-sans-serif);
    padding: 0 var(--input-padding);
  }

  .ProseMirror {
  }
}
</style>

<script setup lang="ts">
import { Editor, EditorContent, HTMLContent, JSONContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { onBeforeUnmount, watch } from "vue";
import { useI18n } from "vue-i18n";
import { translateShortcut } from "./utils/translate-shortcut";

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
