<template>
  <div class="tiptap-editor" :class="{ disabled: props.disabled }">
    <bubble-menu class="tiptap-editor__bubble" :editor="editor" :tippy-options="{ duration: 100 }">
      <v-chip
        v-if="editorExtensions.includes('bold')"
        x-small
        @click="editor.chain().focus().toggleBold().run()"
        :outlined="!editor.isActive('bold')"
      >
        {{ t("wysiwyg_options.bold").toLowerCase() }}
      </v-chip>
      <v-chip
        v-if="editorExtensions.includes('italic')"
        x-small
        @click="editor.chain().focus().toggleItalic().run()"
        :outlined="!editor.isActive('italic')"
      >
        {{ t("wysiwyg_options.italic").toLowerCase() }}
      </v-chip>
      <v-chip
        v-if="editorExtensions.includes('strike')"
        x-small
        @click="editor.chain().focus().toggleStrike().run()"
        :outlined="!editor.isActive('strike')"
      >
        {{ t("wysiwyg_options.strikethrough").toLowerCase() }}
      </v-chip>
    </bubble-menu>

    <div class="tiptap-editor__toolbar">
      <!-- marks -->

      <v-button
        v-if="editorExtensions.includes('bold')"
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
        v-if="editorExtensions.includes('italic')"
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
        v-if="editorExtensions.includes('strike')"
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
        v-if="editorExtensions.includes('underline')"
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
        v-if="editorExtensions.includes('superscript')"
        v-tooltip="t('wysiwyg_options.superscript') + ' - ' + translateShortcut(['meta', '.'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('superscript')"
        @click="editor.chain().focus().toggleSuperscript().run()"
      >
        <icon-superscript />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('subscript')"
        v-tooltip="t('wysiwyg_options.subscript') + ' - ' + translateShortcut(['meta', ','])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('subscript')"
        @click="editor.chain().focus().toggleSubscript().run()"
      >
        <icon-subscript />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('code')"
        v-tooltip="t('code') + ' - ' + translateShortcut(['meta', 'e'])"
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
        v-tooltip="t('tiptap.highlight') + ' - ' + translateShortcut(['meta', 'shift', 'h'])"
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

      <v-menu v-if="editorExtensions.includes('heading')" show-arrow placement="bottom-start">
        <template #activator="{ toggle }">
          <v-button
            v-tooltip="t('wysiwyg_options.heading')"
            :disabled="props.disabled"
            small
            icon
            :active="editor.isActive('heading')"
            @click="toggle"
          >
            <icon-h1 v-if="editor.isActive('heading', { level: 1 })" />
            <icon-h2 v-if="editor.isActive('heading', { level: 2 })" />
            <icon-h3 v-if="editor.isActive('heading', { level: 3 })" />
            <icon-h4 v-if="editor.isActive('heading', { level: 4 })" />
            <icon-h5 v-if="editor.isActive('heading', { level: 5 })" />
            <icon-h6 v-if="editor.isActive('heading', { level: 6 })" />
            <icon-heading v-if="!editor.isActive('heading')" />
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
        v-if="editorExtensions.includes('paragraph')"
        v-tooltip="t('tiptap.paragraph') + ' - ' + translateShortcut(['meta', 'alt', '0'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('paragraph')"
        @click="editor.chain().focus().setParagraph().run()"
      >
        <icon-paragraph />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('bulletList')"
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
        v-if="editorExtensions.includes('orderedList')"
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
        v-if="editorExtensions.includes('taskList')"
        v-tooltip="
          t('interfaces.select-multiple-checkbox.checkboxes') + ' - ' + translateShortcut(['meta', 'shift', '9'])
        "
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('taskList')"
        @click="editor.chain().focus().toggleTaskList().run()"
      >
        <icon-list-check />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('blockquote')"
        v-tooltip="t('wysiwyg_options.blockquote') + ' - ' + translateShortcut(['meta', 'shift', 'b'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('blockquote')"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        <icon-quote-text />
      </v-button>

      <v-menu v-if="editorExtensions.includes('table')" show-arrow placement="bottom-start">
        <template #activator="{ toggle }">
          <v-button
            v-tooltip="t('wysiwyg_options.table')"
            :disabled="props.disabled"
            small
            icon
            :active="editor.isActive('table')"
            @click="toggle"
          >
            <icon-table />
          </v-button>
        </template>
        <v-list>
          <v-list-item clickable @click="editor.chain().focus().insertTable().run()">
            <v-list-item-icon>
              <icon-table />
            </v-list-item-icon>
            <v-list-item-content><v-text-overflow :text="t(`tiptap.table_insert`)" /></v-list-item-content>
          </v-list-item>
          <v-list-item
            clickable
            :disabled="!editor.isActive('table')"
            @click="editor.chain().focus().addColumnBefore().run()"
          >
            <v-list-item-icon>
              <icon-insert-column-left />
            </v-list-item-icon>
            <v-list-item-content><v-text-overflow :text="t(`tiptap.table_add_column_before`)" /></v-list-item-content>
          </v-list-item>
          <v-list-item
            clickable
            :disabled="!editor.isActive('table')"
            @click="editor.chain().focus().addColumnAfter().run()"
          >
            <v-list-item-icon>
              <icon-insert-column-right />
            </v-list-item-icon>
            <v-list-item-content><v-text-overflow :text="t(`tiptap.table_add_column_after`)" /></v-list-item-content>
          </v-list-item>
          <v-list-item
            clickable
            :disabled="!editor.isActive('table')"
            @click="editor.chain().focus().deleteColumn().run()"
          >
            <v-list-item-icon>
              <icon-delete-column />
            </v-list-item-icon>
            <v-list-item-content><v-text-overflow :text="t(`tiptap.table_delete_column`)" /></v-list-item-content>
          </v-list-item>

          <v-list-item
            clickable
            :disabled="!editor.isActive('table')"
            @click="editor.chain().focus().addRowBefore().run()"
          >
            <v-list-item-icon>
              <icon-insert-row-top />
            </v-list-item-icon>
            <v-list-item-content><v-text-overflow :text="t(`tiptap.table_add_row_before`)" /></v-list-item-content>
          </v-list-item>
          <v-list-item
            clickable
            :disabled="!editor.isActive('table')"
            @click="editor.chain().focus().addRowAfter().run()"
          >
            <v-list-item-icon>
              <icon-insert-row-bottom />
            </v-list-item-icon>
            <v-list-item-content><v-text-overflow :text="t(`tiptap.table_add_row_after`)" /></v-list-item-content>
          </v-list-item>
          <v-list-item
            clickable
            :disabled="!editor.isActive('table')"
            @click="editor.chain().focus().deleteRow().run()"
          >
            <v-list-item-icon>
              <icon-delete-row />
            </v-list-item-icon>
            <v-list-item-content><v-text-overflow :text="t(`tiptap.table_delete_row`)" /></v-list-item-content>
          </v-list-item>
          <v-list-item
            clickable
            :disabled="!editor.isActive('table')"
            @click="editor.chain().focus().deleteTable().run()"
          >
            <v-list-item-icon>
              <icon-delete-bin />
            </v-list-item-icon>
            <v-list-item-content><v-text-overflow :text="t(`tiptap.table_delete`)" /></v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-button
        v-if="editorExtensions.includes('codeBlock')"
        v-tooltip="t('wysiwyg_options.codeblock') + ' - ' + translateShortcut(['meta', 'alt', 'c'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('codeBlock')"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        <icon-code-box-line />
      </v-button>

      <div class="divider" />

      <v-menu v-if="editorExtensions.includes('textAlign')" show-arrow placement="bottom-start">
        <template #activator="{ toggle }">
          <v-button v-tooltip="t('tiptap.text_align')" :disabled="props.disabled" small icon active @click="toggle">
            <template v-for="opt in alignOptions" :key="opt.align">
              <component v-if="editor.isActive({ textAlign: opt.align })" :is="opt.icon" />
            </template>
          </v-button>
        </template>
        <v-list>
          <v-list-item
            v-for="opt in alignOptions"
            :key="opt.align"
            clickable
            :active="editor.isActive({ textAlign: opt.align })"
            @click="
              editor.isActive({ textAlign: opt.align })
                ? editor.chain().focus().unsetTextAlign().run()
                : editor.chain().focus().setTextAlign(opt.align).run()
            "
          >
            <v-list-item-icon>
              <component :is="opt.icon" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-text-overflow :text="opt.text" />
            </v-list-item-content>
            <v-list-item-hint>{{ opt.shortcut }}</v-list-item-hint>
          </v-list-item>
          <v-list-item clickable @click="editor.chain().focus().unsetTextAlign().run()">
            <v-list-item-content>
              <v-text-overflow :text="t('wysiwyg_options.alignnone')" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-button
        v-if="editorExtensions.includes('horizontalRule')"
        v-tooltip="t('wysiwyg_options.hr')"
        small
        icon
        :disabled="props.disabled"
        @click="editor.chain().focus().setHorizontalRule().run()"
      >
        <icon-separator />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('link')"
        v-tooltip="t('wysiwyg_options.link')"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('link')"
        @click="linkOpen"
      >
        <icon-link />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('link')"
        v-tooltip="t('wysiwyg_options.unlink')"
        small
        icon
        :disabled="props.disabled || !editor.isActive('link')"
        @click="linkRemove"
      >
        <icon-unlink />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('hardBreak')"
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
        v-if="editorExtensions.includes('history')"
        v-tooltip="t('wysiwyg_options.undo') + ' - ' + translateShortcut(['meta', 'z'])"
        small
        icon
        :disabled="props.disabled || !editor.can().undo()"
        @click="editor.chain().focus().undo().run()"
      >
        <icon-arrow-go-back-line />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('history')"
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

    <v-dialog v-model="linkDrawerOpen">
      <v-card class="card">
        <v-card-title class="card-title">{{ t("wysiwyg_options.link") }}</v-card-title>
        <v-card-text>
          <div class="grid">
            <div class="field">
              <div class="type-label">{{ t("url") }}</div>
              <v-input v-model="linkHref" :placeholder="t('url_placeholder')"></v-input>
            </div>
            <div class="field">
              <div class="type-label">{{ t("open_link_in") }}</div>
              <v-input v-model="linkTarget"></v-input>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-button secondary @click="linkClose">{{ t("cancel") }}</v-button>
          <v-button :disabled="linkHref === null" @click="linkSave">{{ t("save") }}</v-button>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="tiptap-editor__info" v-if="editorExtensions.includes('characterCount')">
      <div v-if="editorExtensions.includes('characterCount')">
        <template v-if="!editor.storage.characterCount.characters() && !editor.storage.characterCount.words()">
          ∅
        </template>
        <template v-else>
          {{ t("tiptap.count_words", editor.storage.characterCount.words()) }},
          {{ t("tiptap.count_chars", editor.storage.characterCount.characters()) }}
          <template v-if="props.characterCountLimit"> / {{ props.characterCountLimit }}</template>
        </template>
      </div>
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

    .ProseMirror {
      min-height: 230px;
      margin: var(--input-padding) 0;
      padding: 0 var(--input-padding);
    }

    * {
      margin: revert;
      font-size: revert;
      font-weight: revert;
      line-height: revert;
    }

    a {
      color: var(--blue);
      text-decoration: underline;
    }

    b,
    strong {
      font-weight: 700;
    }

    pre,
    code {
      background: var(--background-inverted);
      color: var(--foreground-inverted);
      border-radius: 0.3em;
    }

    pre {
      padding: 0.4em 0.6em;
    }
    code {
      padding: 0 0.2em;
    }

    pre > code {
      padding: 0;
    }

    .ProseMirror p.is-editor-empty:first-child::before {
      color: var(--foreground-subdued);
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
    }

    .has-focus {
      border-radius: 3px;
      //box-shadow: 0 0 6px 2px var(--background-subdued);
      box-shadow: var(--card-shadow);
    }

    ul[data-type="taskList"] {
      list-style: none;
      padding: 0;

      p {
        margin: 0;
      }

      li {
        display: flex;

        > label {
          flex: 0 0 auto;
          margin-right: 0.5rem;
          user-select: none;
        }

        > div {
          flex: 1 1 auto;
        }
      }
    }

    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      margin: 0;
      overflow: hidden;

      td,
      th {
        min-width: 1em;
        border: 1px solid var(--border-normal);
        padding: 3px 6px;
        vertical-align: top;
        box-sizing: border-box;
        position: relative;

        > * {
          margin-bottom: 0;
        }
      }

      th {
        font-weight: bold;
        text-align: left;
        background-color: var(--background-normal);
      }

      .selectedCell:after {
        z-index: 2;
        position: absolute;
        content: "";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(200, 200, 255, 0.4);
        pointer-events: none;
      }

      .column-resize-handle {
        position: absolute;
        right: -2px;
        top: 0;
        bottom: -2px;
        width: 4px;
        background-color: #adf;
        pointer-events: none;
      }

      p {
        margin: 0;
      }
    }

    .tableWrapper {
      padding: 1rem 0;
      overflow-x: auto;
    }

    .resize-cursor {
      cursor: ew-resize;
      cursor: col-resize;
    }
  }
}
</style>

<script setup lang="ts">
import { BubbleMenu, Editor, EditorContent } from "@tiptap/vue-3";
import { onBeforeUnmount, watch } from "vue";
import { useI18n } from "vue-i18n";
import { translateShortcut } from "./utils/translate-shortcut";
import type { TypeType, ValueType } from "./types";
import { loadExtensions } from "./extensions";
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
import IconH1 from "./icons/h1.vue";
import IconH2 from "./icons/h2.vue";
import IconH3 from "./icons/h3.vue";
import IconH4 from "./icons/h4.vue";
import IconH5 from "./icons/h5.vue";
import IconH6 from "./icons/h6.vue";
import IconSeparator from "./icons/separator.vue";
import IconArrowGoForwardLine from "./icons/arrow-go-forward-line.vue";
import IconCodeLine from "./icons/code-line.vue";
import IconQuoteText from "./icons/quote-text.vue";
import IconTextWrap from "./icons/text-wrap.vue";
import IconFormatClear from "./icons/format-clear.vue";
import IconMarkPenLine from "./icons/mark-pen-line.vue";
import IconSubscript from "./icons/subscript.vue";
import IconSuperscript from "./icons/superscript.vue";
import IconCodeBoxLine from "./icons/code-box-line.vue";
import IconAlignLeft from "./icons/align-left.vue";
import IconAlignCenter from "./icons/align-center.vue";
import IconAlignRight from "./icons/align-right.vue";
import IconAlignJustify from "./icons/align-justify.vue";
import IconLink from "./icons/link.vue";
import IconUnlink from "./icons/unlink.vue";
import IconListCheck from "./icons/list-check.vue";
import IconTable from "./icons/table.vue";
import type { CharacterCountOptions } from "@tiptap/extension-character-count";
import type { TextAlignOptions } from "@tiptap/extension-text-align";
import textAlign from "./extensions/text-align";
import characterCount from "./extensions/character-count";
import type { PlaceholderOptions } from "@tiptap/extension-placeholder";
import placeholder from "./extensions/placeholder";
import { useLink } from "./composables/link";
import type { FocusOptions } from "@tiptap/extension-focus";
import focus from "./extensions/focus";
import type { TaskItemOptions } from "@tiptap/extension-task-item";
import task from "./extensions/task";
import type { TableOptions } from "@tiptap/extension-table";
import table from "./extensions/table";
import IconInsertColumnLeft from "./icons/insert-column-left.vue";
import IconInsertColumnRight from "./icons/insert-column-right.vue";
import IconDeleteColumn from "./icons/delete-column.vue";
import IconInsertRowTop from "./icons/insert-row-top.vue";
import IconInsertRowBottom from "./icons/insert-row-bottom.vue";
import IconDeleteRow from "./icons/delete-row.vue";
import IconDeleteBin from "./icons/delete-bin.vue";

const { t } = useI18n({ messages });

interface Props {
  value: ValueType | null;
  type: TypeType;
  disabled: boolean;
  autofocus: boolean;
  extensions: string[] | null;
  // extensions options
  placeholder: PlaceholderOptions["placeholder"];
  textAlignTypes: TextAlignOptions["types"];
  characterCountLimit: CharacterCountOptions["limit"];
  characterCountMode: CharacterCountOptions["mode"];
  focusMode: FocusOptions["mode"];
  taskItemNested: TaskItemOptions["nested"];
  tableResizable: TableOptions["resizable"];
}

const props = withDefaults(defineProps<Props>(), {
  value: null,
  disabled: false,
  autofocus: false,
  extensions: null,
  placeholder: () => placeholder.defaults.placeholder,
  textAlignTypes: () => textAlign.defaults.types,
  characterCountLimit: () => characterCount.defaults.limit,
  characterCountMode: () => characterCount.defaults.mode,
  focusMode: () => focus.defaults.mode,
  taskItemNested: () => task.defaults.nested,
  tableResizable: () => table.defaults.resizable,
});

const emit = defineEmits<{
  (e: "input", value: ValueType): void;
}>();

const alignOptions = [
  {
    align: "left",
    icon: IconAlignLeft,
    text: t("wysiwyg_options.alignleft"),
    shortcut: translateShortcut(["meta", "shift", "l"]),
  },
  {
    align: "center",
    icon: IconAlignCenter,
    text: t("wysiwyg_options.aligncenter"),
    shortcut: translateShortcut(["meta", "shift", "e"]),
  },
  {
    align: "right",
    icon: IconAlignRight,
    text: t("wysiwyg_options.alignright"),
    shortcut: translateShortcut(["meta", "shift", "r"]),
  },
  {
    align: "justify",
    icon: IconAlignJustify,
    text: t("wysiwyg_options.alignjustify"),
    shortcut: translateShortcut(["meta", "shift", "j"]),
  },
];

const extensions = loadExtensions(props);

const editor = new Editor({
  editable: !props.disabled,
  content: props.value,
  extensions,
  autofocus: props.autofocus,
  onUpdate: ({ editor }) => {
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

const editorExtensions = editor.extensionManager.extensions.map((ext) => ext.name);

const { linkDrawerOpen, linkHref, linkTarget, linkOpen, linkClose, linkSave, linkRemove } = useLink(editor);

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
