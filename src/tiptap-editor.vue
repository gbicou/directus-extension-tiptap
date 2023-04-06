<template>
  <div class="tiptap-editor" :class="{ disabled: props.disabled }">
    <bubble-menu class="tiptap-editor__bubble" :editor="editor" :tippy-options="{ duration: 100 }">
      <v-chip x-small @click="editor.chain().focus().toggleBold().run()" :outlined="!editor.isActive('bold')">
        {{ t("wysiwyg_options.bold").toLowerCase() }}
      </v-chip>
      <v-chip x-small @click="editor.chain().focus().toggleItalic().run()" :outlined="!editor.isActive('italic')">
        {{ t("wysiwyg_options.italic").toLowerCase() }}
      </v-chip>
      <v-chip x-small @click="editor.chain().focus().toggleStrike().run()" :outlined="!editor.isActive('strike')">
        {{ t("wysiwyg_options.strikethrough").toLowerCase() }}
      </v-chip>
    </bubble-menu>

    <div class="tiptap-editor__toolbar">
      <!-- marks -->

      <v-button
        v-tooltip="t('wysiwyg_options.bold') + ' - ' + translateShortcut(['meta', 'b'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('bold')"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <icon-bold />
      </v-button>

      <v-button
        v-tooltip="t('wysiwyg_options.italic') + ' - ' + translateShortcut(['meta', 'i'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('italic')"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <icon-italic />
      </v-button>

      <v-button
        v-tooltip="t('wysiwyg_options.strikethrough') + ' - ' + translateShortcut(['meta', 'shift', 'x'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('strike')"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <icon-strikethrough />
      </v-button>

      <v-button
        v-tooltip="t('wysiwyg_options.underline') + ' - ' + translateShortcut(['meta', 'u'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('underline')"
        @click="editor.chain().focus().toggleUnderline().run()"
      >
        <icon-underline />
      </v-button>

      <v-button
        v-tooltip="t('wysiwyg_options.codeblock') + ' - ' + translateShortcut(['meta', 'e'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('code')"
        @click="editor.chain().focus().toggleCode().run()"
      >
        <icon-code-line />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('highlight')"
        v-tooltip="t('tiptap.highlight') + ' - ' + translateShortcut(['meta', 'shift', 'm'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('highlight')"
        @click="editor.chain().focus().toggleHighlight().run()"
      >
        <icon-mark-pen-line />
      </v-button>

      <div class="divider" />

      <!-- nodes -->

      <v-menu show-arrow placement="bottom-start">
        <template #activator="{ toggle }">
          <v-button
            v-tooltip="t('wysiwyg_options.heading')"
            :disabled="props.disabled"
            small
            icon
            :active="editor.isActive('heading')"
            @click="toggle"
          >
            <icon-heading />
          </v-button>
        </template>
        <v-list>
          <v-list-item
            v-for="n in 6"
            :key="n"
            clickable
            :active="editor.isActive('heading', { level: n })"
            @click="editor.chain().focus().toggleHeading({ level: n }).run()"
          >
            <v-list-item-content><v-text-overflow :text="t(`wysiwyg_options.h${n}`)" /></v-list-item-content>
            <v-list-item-hint>{{ translateShortcut(["meta", "alt"]) }} {{ n }}</v-list-item-hint>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-button
        v-tooltip="t('tiptap.paragraph') + ' - ' + translateShortcut(['meta', 'shift', '0'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('paragraph')"
        @click="editor.chain().focus().setParagraph().run()"
      >
        <icon-paragraph />
      </v-button>

      <v-button
        v-tooltip="t('wysiwyg_options.bullist') + ' - ' + translateShortcut(['meta', 'shift', '8'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('bulletList')"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <icon-list-unordered />
      </v-button>

      <v-button
        v-tooltip="t('wysiwyg_options.numlist') + ' - ' + translateShortcut(['meta', 'shift', '7'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('orderedList')"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        <icon-list-ordered />
      </v-button>

      <v-button
        v-tooltip="t('wysiwyg_options.blockquote') + ' - ' + translateShortcut(['meta', 'shift', 'b'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('blockquote')"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        <icon-double-quotes-r />
      </v-button>

      <div class="divider" />

      <v-button
        v-tooltip="t('wysiwyg_options.hr')"
        small
        icon
        :disabled="props.disabled"
        @click="editor.chain().focus().setHorizontalRule().run()"
      >
        <icon-separator />
      </v-button>

      <v-button
        v-tooltip="t('tiptap.br') + ' - ' + translateShortcut(['shift', 'enter'])"
        small
        icon
        :disabled="props.disabled"
        @click="editor.chain().focus().setHardBreak().run()"
      >
        <icon-text-wrap />
      </v-button>

      <v-button
        v-tooltip="t('tiptap.clear_format')"
        small
        icon
        :disabled="props.disabled"
        @click="editor.chain().focus().unsetAllMarks().clearNodes().run()"
      >
        <icon-format-clear />
      </v-button>

      <div class="spacer" />

      <!-- history -->

      <v-button
        v-tooltip="t('wysiwyg_options.undo') + ' - ' + translateShortcut(['meta', 'z'])"
        small
        icon
        :disabled="props.disabled || !editor.can().undo()"
        @click="editor.chain().focus().undo().run()"
      >
        <icon-arrow-go-back-line />
      </v-button>

      <v-button
        v-tooltip="t('wysiwyg_options.redo') + ' - ' + translateShortcut(['meta', 'shift', 'z'])"
        small
        icon
        :disabled="props.disabled || !editor.can().redo()"
        @click="editor.chain().focus().redo().run()"
      >
        <icon-arrow-go-forward-line />
      </v-button>
    </div>

    <editor-content class="tiptap-editor__content" :editor="editor" />

    <div class="tiptap-editor__info">
      {{ editor.storage.characterCount.characters() }} chars, {{ editor.storage.characterCount.words() }} words
    </div>
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

  &__info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    min-height: 30px;
    padding: 0 8px;
    background-color: var(--background-subdued);
    color: var(--foreground-subdued);
    border-top: 2px solid var(--border-normal);
    font-family: var(--family-monospace);
    font-size: 12px;
  }

  &__toolbar {
    --v-button-background-color: transparent;
    --v-button-color: var(--foreground-normal);
    --v-button-background-color-hover: var(--border-normal);
    --v-button-color-hover: var(--foreground-normal);
    --v-button-background-color-active: var(--border-normal);
    --v-button-color-active: var(--foreground-normal);
    --v-button-background-color-disabled: transparent;

    svg {
      fill: var(--v-input-color);
    }

    [disabled] svg {
      fill: var(--foreground-subdued);
    }

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

    .divider {
      width: 2px;
      height: 24px;
      background: var(--border-normal);
      margin: 0 4px;
      opacity: 0.5;
    }

    .spacer {
      flex-grow: 1;
    }
  }

  &__bubble {
    .v-chip {
      margin-left: 2px;
      cursor: pointer;

      &.outlined {
        background-color: var(--background-page);
      }
    }
  }

  &__content {
    font-family: var(--family-sans-serif);
    font-weight: 400;
    margin: var(--input-padding) 0;
    padding: 0 var(--input-padding);

    * {
      margin: revert;
      font-size: revert;
      font-weight: revert;
      line-height: revert;
    }

    b,
    strong {
      font-weight: 700;
    }

    .ProseMirror p.is-editor-empty:first-child::before {
      color: var(--foreground-subdued);
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
    }
  }
}
</style>

<script setup lang="ts">
import { Editor, EditorContent, BubbleMenu } from "@tiptap/vue-3";
import { Placeholder } from "@tiptap/extension-placeholder";
import { onBeforeUnmount, watch } from "vue";
import { useI18n } from "vue-i18n";
import { translateShortcut } from "./utils/translate-shortcut";
import type { TypeType, ValueType } from "./types";
import { extensions } from "./extensions";
import messages from "./messages.json";
import IconArrowGoBackLine from "./icons/arrow-go-back-line.vue";
import IconParagraph from "./icons/paragraph.vue";
import IconListUnordered from "./icons/list-unordered.vue";
import IconListOrdered from "./icons/list-ordered.vue";
import IconBold from "./icons/bold.vue";
import IconItalic from "./icons/italic.vue";
import IconStrikethrough from "./icons/strikethrough.vue";
import IconUnderline from "./icons/underline.vue";
import IconHeading from "./icons/heading.vue";
import IconSeparator from "./icons/separator.vue";
import IconArrowGoForwardLine from "./icons/arrow-go-forward-line.vue";
import IconCodeLine from "./icons/code-line.vue";
import IconDoubleQuotesR from "./icons/double-quotes-r.vue";
import IconTextWrap from "./icons/text-wrap.vue";
import IconFormatClear from "./icons/format-clear.vue";
import IconMarkPenLine from "./icons/mark-pen-line.vue";

const { t } = useI18n({ messages });

const props = withDefaults(
  defineProps<{
    value: ValueType | null;
    type: TypeType;
    disabled: boolean;
    placeholder: string | null;
  }>(),
  { value: null, disabled: false, placeholder: null }
);

const emit = defineEmits<{
  (e: "input", value: ValueType): void;
}>();

extensions.push(
  Placeholder.configure({
    placeholder: props.placeholder,
  })
);

const editor = new Editor({
  editable: !props.disabled,
  content: props.value,
  extensions,
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

watch(
  () => props.disabled,
  (disabled) => editor.setEditable(!disabled)
);

onBeforeUnmount(() => {
  editor.destroy();
});
</script>
