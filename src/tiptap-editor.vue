<template>
  <div class="tiptap-editor" :class="{ disabled: props.disabled }">
    <bubble-menu class="tiptap-editor__bubble" :editor="editor" :tippy-options="{ duration: 100 }">
      <v-chip
        v-if="editorExtensions.includes('bold') && editor.can().toggleBold()"
        @click="editor.chain().focus().toggleBold().run()"
        :outlined="!editor.isActive('bold')"
        v-tooltip="t('wysiwyg_options.bold')"
        clickable
        small
      >
        <icons.Bold class="icon" />
      </v-chip>
      <v-chip
        v-if="editorExtensions.includes('italic') && editor.can().toggleItalic()"
        @click="editor.chain().focus().toggleItalic().run()"
        :outlined="!editor.isActive('italic')"
        v-tooltip="t('wysiwyg_options.italic')"
        clickable
        small
      >
        <icons.Italic class="icon" />
      </v-chip>
      <v-chip
        v-if="editorExtensions.includes('underline') && editor.can().toggleUnderline()"
        @click="editor.chain().focus().toggleUnderline().run()"
        :outlined="!editor.isActive('underline')"
        v-tooltip="t('wysiwyg_options.underline')"
        clickable
        small
      >
        <icons.Underline class="icon" />
      </v-chip>
      <v-chip
        v-if="editorExtensions.includes('strike') && editor.can().toggleStrike()"
        @click="editor.chain().focus().toggleStrike().run()"
        :outlined="!editor.isActive('strike')"
        v-tooltip="t('wysiwyg_options.strikethrough')"
        clickable
        small
      >
        <icons.Strikethrough class="icon" />
      </v-chip>
    </bubble-menu>

    <div class="tiptap-editor__toolbar">
      <!-- marks -->

      <v-button
        v-if="editorExtensions.includes('bold')"
        v-tooltip="t('wysiwyg_options.bold') + ' - ' + translateShortcut(['meta', 'b'])"
        small
        icon
        :disabled="props.disabled || !editor.can().toggleBold()"
        :active="editor.isActive('bold')"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <icons.Bold />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('italic')"
        v-tooltip="t('wysiwyg_options.italic') + ' - ' + translateShortcut(['meta', 'i'])"
        small
        icon
        :disabled="props.disabled || !editor.can().toggleItalic()"
        :active="editor.isActive('italic')"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <icons.Italic />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('underline')"
        v-tooltip="t('wysiwyg_options.underline') + ' - ' + translateShortcut(['meta', 'u'])"
        small
        icon
        :disabled="props.disabled || !editor.can().toggleUnderline()"
        :active="editor.isActive('underline')"
        @click="editor.chain().focus().toggleUnderline().run()"
      >
        <icons.Underline />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('strike')"
        v-tooltip="t('wysiwyg_options.strikethrough') + ' - ' + translateShortcut(['meta', 'shift', 'x'])"
        small
        icon
        :disabled="props.disabled || !editor.can().toggleStrike()"
        :active="editor.isActive('strike')"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <icons.Strikethrough />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('subscript')"
        v-tooltip="t('wysiwyg_options.subscript') + ' - ' + translateShortcut(['meta', ','])"
        small
        icon
        :disabled="props.disabled || !editor.can().toggleSubscript()"
        :active="editor.isActive('subscript')"
        @click="editor.chain().focus().toggleSubscript().run()"
      >
        <icons.Subscript />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('superscript')"
        v-tooltip="t('wysiwyg_options.superscript') + ' - ' + translateShortcut(['meta', '.'])"
        small
        icon
        :disabled="props.disabled || !editor.can().toggleSuperscript()"
        :active="editor.isActive('superscript')"
        @click="editor.chain().focus().toggleSuperscript().run()"
      >
        <icons.Superscript />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('code')"
        v-tooltip="t('code') + ' - ' + translateShortcut(['meta', 'e'])"
        small
        icon
        :disabled="props.disabled || !editor.can().toggleCode()"
        :active="editor.isActive('code')"
        @click="editor.chain().focus().toggleCode().run()"
      >
        <icons.CodeLine />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('highlight')"
        v-tooltip="t('tiptap.highlight') + ' - ' + translateShortcut(['meta', 'shift', 'h'])"
        small
        icon
        :disabled="props.disabled || !editor.can().toggleHighlight()"
        :active="editor.isActive('highlight')"
        @click="editor.chain().focus().toggleHighlight().run()"
      >
        <icons.MarkPenLine />
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
            <icons.H1 v-if="editor.isActive('heading', { level: 1 })" />
            <icons.H2 v-if="editor.isActive('heading', { level: 2 })" />
            <icons.H3 v-if="editor.isActive('heading', { level: 3 })" />
            <icons.H4 v-if="editor.isActive('heading', { level: 4 })" />
            <icons.H5 v-if="editor.isActive('heading', { level: 5 })" />
            <icons.H6 v-if="editor.isActive('heading', { level: 6 })" />
            <icons.Heading v-if="!editor.isActive('heading')" />
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
        <icons.Paragraph />
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
        <icons.ListUnordered />
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
        <icons.ListOrdered />
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
        <icons.ListCheck />
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
        <icons.QuoteText />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('codeBlock')"
        v-tooltip="t('wysiwyg_options.codeblock') + ' - ' + translateShortcut(['meta', 'alt', 'c'])"
        small
        icon
        :disabled="props.disabled"
        :active="editor.isActive('codeBlock')"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        <icons.CodeBoxLine />
      </v-button>

      <div class="divider" />

      <v-menu v-if="editorExtensions.includes('textAlign')" show-arrow placement="bottom-start">
        <template #activator="{ toggle }">
          <v-button
            v-tooltip="t('tiptap.text_align')"
            :disabled="props.disabled || textAlignActive === undefined"
            small
            icon
            :active="textAlignActive !== undefined"
            @click="toggle"
          >
            <template v-for="opt in alignOptions" :key="opt.align">
              <component v-if="editor.isActive({ textAlign: opt.align })" :is="opt.icon" />
            </template>
            <icons.AlignLeft v-if="textAlignActive === undefined" />
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
          <v-list-item
            clickable
            :active="textAlignActive === undefined"
            @click="editor.chain().focus().unsetTextAlign().run()"
          >
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
        <icons.Separator />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('link')"
        v-tooltip="t('wysiwyg_options.link')"
        small
        icon
        :disabled="props.disabled || !editor.can().setLink({ href: '' })"
        :active="editor.isActive('link')"
        @click="linkOpen"
      >
        <icons.Link />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('link')"
        v-tooltip="t('wysiwyg_options.unlink')"
        small
        icon
        :disabled="props.disabled || !editor.isActive('link')"
        @click="linkRemove"
      >
        <icons.Unlink />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('image')"
        v-tooltip="t('wysiwyg_options.image')"
        small
        icon
        :disabled="props.disabled || !editor.can().setImage({ id: '' })"
        @click="imageOpen"
      >
        <icons.Image />
      </v-button>

      <v-emoji-picker
        v-if="editorExtensions.includes('emoji')"
        v-tooltip="t('tiptap.emoji')"
        :disabled="props.disabled"
        :x-small="false"
        :secondary="false"
        small
        icon
        @emoji-selected="
          async (emoji) => {
            const shortcode = await resolveEmoji(emoji);
            editor.chain().focus().setEmoji(shortcode).run();
          }
        "
      />

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
            <icons.Table />
          </v-button>
        </template>
        <v-list>
          <v-list-item clickable @click="editor.chain().focus().insertTable().run()">
            <v-list-item-icon>
              <icons.Table />
            </v-list-item-icon>
            <v-list-item-content><v-text-overflow :text="t(`tiptap.table_insert`)" /></v-list-item-content>
          </v-list-item>
          <v-list-item
            clickable
            :disabled="!editor.isActive('table')"
            @click="editor.chain().focus().addColumnBefore().run()"
          >
            <v-list-item-icon>
              <icons.InsertColumnLeft />
            </v-list-item-icon>
            <v-list-item-content><v-text-overflow :text="t(`tiptap.table_add_column_before`)" /></v-list-item-content>
          </v-list-item>
          <v-list-item
            clickable
            :disabled="!editor.isActive('table')"
            @click="editor.chain().focus().addColumnAfter().run()"
          >
            <v-list-item-icon>
              <icons.InsertColumnRight />
            </v-list-item-icon>
            <v-list-item-content><v-text-overflow :text="t(`tiptap.table_add_column_after`)" /></v-list-item-content>
          </v-list-item>
          <v-list-item
            clickable
            :disabled="!editor.isActive('table')"
            @click="editor.chain().focus().deleteColumn().run()"
          >
            <v-list-item-icon>
              <icons.DeleteColumn />
            </v-list-item-icon>
            <v-list-item-content><v-text-overflow :text="t(`tiptap.table_delete_column`)" /></v-list-item-content>
          </v-list-item>

          <v-list-item
            clickable
            :disabled="!editor.isActive('table')"
            @click="editor.chain().focus().addRowBefore().run()"
          >
            <v-list-item-icon>
              <icons.InsertRowTop />
            </v-list-item-icon>
            <v-list-item-content><v-text-overflow :text="t(`tiptap.table_add_row_before`)" /></v-list-item-content>
          </v-list-item>
          <v-list-item
            clickable
            :disabled="!editor.isActive('table')"
            @click="editor.chain().focus().addRowAfter().run()"
          >
            <v-list-item-icon>
              <icons.InsertRowBottom />
            </v-list-item-icon>
            <v-list-item-content><v-text-overflow :text="t(`tiptap.table_add_row_after`)" /></v-list-item-content>
          </v-list-item>
          <v-list-item
            clickable
            :disabled="!editor.isActive('table')"
            @click="editor.chain().focus().deleteRow().run()"
          >
            <v-list-item-icon>
              <icons.DeleteRow />
            </v-list-item-icon>
            <v-list-item-content><v-text-overflow :text="t(`tiptap.table_delete_row`)" /></v-list-item-content>
          </v-list-item>
          <v-list-item
            clickable
            :disabled="!editor.isActive('table')"
            @click="editor.chain().focus().mergeCells().run()"
          >
            <v-list-item-icon>
              <icons.MergeCells />
            </v-list-item-icon>
            <v-list-item-content><v-text-overflow :text="t(`tiptap.table_merge_cells`)" /></v-list-item-content>
          </v-list-item>
          <v-list-item
            clickable
            :disabled="!editor.isActive('table')"
            @click="editor.chain().focus().splitCell().run()"
          >
            <v-list-item-icon>
              <icons.SplitCell />
            </v-list-item-icon>
            <v-list-item-content><v-text-overflow :text="t(`tiptap.table_split_cell`)" /></v-list-item-content>
          </v-list-item>
          <v-list-item
            clickable
            :disabled="!editor.isActive('table')"
            @click="editor.chain().focus().toggleHeaderRow().run()"
          >
            <v-list-item-icon>
              <icons.LayoutTop />
            </v-list-item-icon>
            <v-list-item-content><v-text-overflow :text="t(`tiptap.table_toggle_header_row`)" /></v-list-item-content>
          </v-list-item>
          <v-list-item
            clickable
            :disabled="!editor.isActive('table')"
            @click="editor.chain().focus().toggleHeaderColumn().run()"
          >
            <v-list-item-icon>
              <icons.LayoutLeft />
            </v-list-item-icon>
            <v-list-item-content
              ><v-text-overflow :text="t(`tiptap.table_toggle_header_column`)"
            /></v-list-item-content>
          </v-list-item>
          <v-list-item
            clickable
            :disabled="!editor.isActive('table')"
            @click="editor.chain().focus().toggleHeaderCell().run()"
          >
            <v-list-item-icon>
              <icons.LayoutGrid />
            </v-list-item-icon>
            <v-list-item-content><v-text-overflow :text="t(`tiptap.table_toggle_header_cell`)" /></v-list-item-content>
          </v-list-item>
          <v-list-item
            clickable
            :disabled="!editor.isActive('table')"
            @click="editor.chain().focus().deleteTable().run()"
          >
            <v-list-item-icon>
              <icons.DeleteBin />
            </v-list-item-icon>
            <v-list-item-content><v-text-overflow :text="t(`tiptap.table_delete`)" /></v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-button
        v-if="editorExtensions.includes('hardBreak')"
        v-tooltip="t('tiptap.br') + ' - ' + translateShortcut(['shift', 'enter'])"
        small
        icon
        :disabled="props.disabled || !editor.can().setHardBreak()"
        @click="editor.chain().focus().setHardBreak().run()"
      >
        <icons.TextWrap />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('invisibleCharacters')"
        v-tooltip="t('tiptap.invisible_characters')"
        small
        icon
        :disabled="props.disabled"
        :active="editor.storage.invisibleCharacters?.visibility"
        @click="editor.commands.toggleInvisibleCharacters()"
      >
        <icons.InvisibleCharacters />
      </v-button>

      <v-button
        v-tooltip="t('tiptap.clear_format')"
        small
        icon
        :disabled="props.disabled"
        @click="editor.chain().focus().unsetAllMarks().run()"
      >
        <icons.FormatClear />
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
        <icons.ArrowGoBackLine />
      </v-button>

      <v-button
        v-if="editorExtensions.includes('history')"
        v-tooltip="t('wysiwyg_options.redo') + ' - ' + translateShortcut(['meta', 'shift', 'z'])"
        small
        icon
        :disabled="props.disabled || !editor.can().redo()"
        @click="editor.chain().focus().redo().run()"
      >
        <icons.ArrowGoForwardLine />
      </v-button>
    </div>

    <editor-content class="tiptap-editor__content" :editor="editor" />

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

    <v-drawer v-model="linkDrawerOpen" :title="t('wysiwyg_options.link')" icon="link" @cancel="linkClose">
      <div class="content">
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
      </div>
      <template #actions>
        <v-button v-tooltip.bottom="t('save')" icon rounded :disabled="linkHref === null" @click="linkSave">
          <v-icon name="check" />
        </v-button>
      </template>
    </v-drawer>

    <v-drawer v-model="imageDrawerOpen" :title="t('wysiwyg_options.image')" icon="image" @cancel="imageClose">
      <div class="content">
        <template v-if="imageSelection">
          <img class="image-preview" :src="`/assets/${imageSelection.id}`" />
          <div class="grid">
            <div class="field">
              <div class="type-label">{{ t("fields.directus_files.filename_download") }}</div>
              <v-input v-model="imageSelection.filename" nullable />
            </div>
            <div class="field">
              <div class="type-label">{{ t("alt_text") }}</div>
              <v-input v-model="imageSelection.alt" :nullable="false" />
            </div>
            <div class="field half">
              <div class="type-label">{{ t("width") }}</div>
              <v-input v-model="imageSelection.width" />
            </div>
            <div class="field half-right">
              <div class="type-label">{{ t("height") }}</div>
              <v-input v-model="imageSelection.height" />
            </div>
          </div>
        </template>
        <v-upload v-else :multiple="false" from-library from-url @input="imageSelect" />
      </div>

      <template #actions>
        <v-button v-tooltip.bottom="t('save_image')" icon rounded @click="imageSave">
          <v-icon name="check" />
        </v-button>
      </template>
    </v-drawer>
  </div>
</template>

<style scoped lang="scss">
@import "./styles/mixins/form-grid";

.v-menu-content {
  svg {
    fill: var(--v-input-color);
  }

  [disabled] svg,
  .disabled svg {
    fill: var(--foreground-subdued);
  }
}

.v-drawer {
  .grid {
    @include form-grid;
  }

  .content {
    padding: var(--content-padding);
    padding-top: 0;
  }

  .image-preview,
  .media-preview {
    width: 100%;
    height: var(--input-height-tall);
    margin-bottom: 24px;
    object-fit: cover;
    border-radius: var(--border-radius);
  }
}
</style>

<style lang="scss">
.tiptap-editor {
  font-family: var(--theme--fonts--sans--font-family);
  border: var(--theme--border-width) solid var(--theme--form--field--input--border-color);
  border-radius: var(--theme--border-radius);
  box-shadow: var(--theme--form--field--input--box-shadow);
  transition-duration: var(--fast);
  transition-timing-function: var(--transition);
  transition-property: box-shadow, border-color;

  --v-button-color: var(--theme--form--field--input--foreground);
  --v-button-background-color-hover: var(--theme--form--field--input--border-color);
  --v-button-color-hover: var(--theme--form--field--input--foreground);

  &:hover {
    border-color: var(--theme--form--field--input--border-color-hover);
    box-shadow: var(--theme--form--field--input--box-shadow-hover);
  }

  &:focus-within,
  &.active {
    border-color: var(--theme--form--field--input--border-color-focus);
    box-shadow: var(--theme--form--field--input--box-shadow-focus);
  }

  &.disabled {
    background-color: var(--theme--form--field--input--background-subdued);
  }

  &__info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    min-height: 30px;
    padding: 0 8px;
    background-color: var(--theme--form--field--input--background-subdued);
    border-top: var(--theme--border-width) solid var(--theme--form--field--input--border-color);
    color: var(--theme--form--field--input--border-color);
    font-family: var(--theme--fonts--monospace--font-family);
    font-size: 12px;
  }

  &__toolbar {
    --v-button-background-color: transparent;
    --v-button-color: var(--theme--form--field--input--foreground-subdued);
    --v-button-background-color-hover: var(--theme--form--field--input--border-color);
    --v-button-color-hover: var(--theme--form--field--input--foreground);
    --v-button-background-color-active: var(--theme--form--field--input--border-color);
    --v-button-color-active: var(--theme--form--field--input--foreground);

    svg {
      fill: var(--theme--form--field--input--foreground);
    }

    .v-icon {
      color: var(--theme--form--field--input--foreground);
    }

    [disabled] svg,
    .disabled svg {
      fill: var(--theme--form--field--input--foreground-subdued);
    }

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    min-height: 40px;
    padding: 2px;
    background-color: var(--theme--form--field--input--background-subdued);
    border-bottom: var(--theme--border-width) solid var(--theme--form--field--input--border-color);

    .v-button + .v-button {
      margin-left: 2px;
    }

    .divider {
      width: 2px;
      height: 24px;
      background: var(--theme--form--field--input--border-color);
      margin: 0 4px;
      opacity: 0.5;
    }

    .spacer {
      flex-grow: 1;
    }
  }

  &__bubble {
    --v-icon-size: 18px;
    --v-chip-color: var(--theme--border-color-accent);
    --v-chip-background-color: var(--theme--border-color-accent);
    --v-chip-color-hover: var(--theme--border-color-accent);
    --v-chip-background-color-hover: var(--theme--border-color-accent);

    .v-chip {
      margin-left: 1px;
      cursor: pointer;

      &.outlined {
        background-color: var(--theme--form--field--input--background-subdued);
      }
    }

    .icon {
      display: inline-block;
      width: var(--v-icon-size, 24px);
      min-width: var(--v-icon-size, 24px);
      height: var(--v-icon-size, 24px);
      color: var(--theme--foreground, currentColor);
      fill: var(--theme--foreground, currentColor);
    }
  }

  &__content {
    font-family: var(--theme--font-family-sans-serif);
    font-weight: 400;

    .ProseMirror {
      min-height: 230px;
      margin: 20px 0;
      padding: 0 20px;
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

    img {
      max-width: 100%;
      height: auto;

      &.ProseMirror-selectednode {
        outline: 2px solid var(--v-input-border-color-focus);
      }
    }
  }
}
</style>

<script setup lang="ts">
import { BubbleMenu, Editor, EditorContent } from "@tiptap/vue-3";
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { translateShortcut } from "./utils/translate-shortcut";
import type { TypeType, ValueType } from "./types";
import { loadExtensions } from "./extensions";
import messages from "./messages.json";
import type { CharacterCountOptions } from "@tiptap/extension-character-count";
import type { TextAlignOptions } from "@tiptap/extension-text-align";
import textAlign from "./extensions/text-align";
import characterCount from "./extensions/character-count";
import type { PlaceholderOptions } from "@tiptap/extension-placeholder";
// eslint-disable-next-line vue/no-dupe-keys
import placeholder from "./extensions/placeholder";
import { useLink } from "./composables/link";
import type { FocusOptions } from "@tiptap/extension-focus";
import focus from "./extensions/focus";
import type { TaskItemOptions } from "@tiptap/extension-task-item";
import task from "./extensions/task";
import type { TableOptions } from "@tiptap/extension-table";
import table from "./extensions/table";
import icons from "./icons";
import { useImage } from "./composables/image";

const { t } = useI18n({ messages });

interface Props {
  value: ValueType | null;
  type: TypeType;
  disabled: boolean;
  autofocus: boolean;
  extensions: string[] | null;
  // extensions options
  cdnURL: string | null;
  placeholder: PlaceholderOptions["placeholder"];
  textAlignTypes: TextAlignOptions["types"];
  characterCountLimit: CharacterCountOptions["limit"];
  characterCountMode: CharacterCountOptions["mode"];
  focusMode: FocusOptions["mode"];
  taskItemNested: TaskItemOptions["nested"];
  tableResizable: TableOptions["resizable"];
  emojiEnableEmoticons: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: null,
  disabled: false,
  autofocus: false,
  extensions: null,
  cdnURL: null,
  placeholder: () => placeholder.defaults.placeholder,
  textAlignTypes: () => textAlign.defaults.types,
  characterCountLimit: () => characterCount.defaults.limit,
  characterCountMode: () => characterCount.defaults.mode,
  focusMode: () => focus.defaults.mode,
  taskItemNested: () => task.defaults.nested,
  tableResizable: () => table.defaults.resizable,
  emojiEnableEmoticons: false,
});

const emit = defineEmits<{
  (e: "input", value: ValueType): void;
}>();

const alignOptions = [
  {
    align: "left",
    icon: icons.AlignLeft,
    text: t("wysiwyg_options.alignleft"),
    shortcut: translateShortcut(["meta", "shift", "l"]),
  },
  {
    align: "center",
    icon: icons.AlignCenter,
    text: t("wysiwyg_options.aligncenter"),
    shortcut: translateShortcut(["meta", "shift", "e"]),
  },
  {
    align: "right",
    icon: icons.AlignRight,
    text: t("wysiwyg_options.alignright"),
    shortcut: translateShortcut(["meta", "shift", "r"]),
  },
  {
    align: "justify",
    icon: icons.AlignJustify,
    text: t("wysiwyg_options.alignjustify"),
    shortcut: translateShortcut(["meta", "shift", "j"]),
  },
];

const editorInitiated = ref<boolean>(false);

const extensions = await loadExtensions(props);

const editor = new Editor({
  editable: !props.disabled,
  content: props.value,
  extensions,
  autofocus: props.autofocus,
  onUpdate: ({ editor }) => {
    if (editor.isEmpty && !editorInitiated.value) {
      return;
    }
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

const { imageDrawerOpen, imageSelection, imageSelect, imageOpen, imageClose, imageSave } = useImage(editor);

const textAlignActive = computed(() => {
  return ["left", "center", "right", "justify"].find((align) => editor.isActive({ textAlign: align }));
});

watch(
  () => props.value,
  (value) => {
    if (!value) {
      return;
    }

    const isSame =
      props.type === "json" ? JSON.stringify(editor.getJSON()) === JSON.stringify(value) : editor.getHTML() === value;

    if (isSame) {
      return;
    }

    editor.commands.setContent(value, false);
    editorInitiated.value = true;
  },
  {
    immediate: true,
  },
);

watch(
  () => props.disabled,
  (disabled) => editor.setEditable(!disabled),
);

const resolveEmoji = async (emoji) => {
  const { emojiToShortcode } = await import("@tiptap-pro/extension-emoji");
  return emojiToShortcode(emoji, editor.storage.emoji.emojis);
};

onBeforeUnmount(() => {
  editor.destroy();
});
</script>
