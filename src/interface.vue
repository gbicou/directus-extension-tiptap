<template>
  <editor-content class="tiptap-editor" :editor="editor" />
</template>

<style lang="css">
.tiptap-editor {
  padding: var(--input-padding);
  color: var(--v-input-color);
  font-family: var(--v-input-font-family);
  background-color: var(--v-input-background-color);
  border: var(--border-width) solid var(--border-normal);
  border-radius: var(--border-radius);
  transition: border-color var(--fast) var(--transition);
}
</style>

<script setup lang="ts">
import {Editor, EditorContent, JSONContent} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import {onBeforeUnmount, watch} from "vue";

const props = withDefaults(defineProps<{
  value: JSONContent
}>(), { value: null })

const emit = defineEmits<{
  (e: 'input', value: JSONContent): void
}>()

const editor = new Editor({
  content: props.value,
  extensions: [
    StarterKit,
  ],
  onUpdate: () => {
    emit('input', editor.getJSON())
  },
})

watch(() => props.value, () => {
  editor.commands.setContent(props.value, false)
})

onBeforeUnmount(() => {
  editor.destroy()
})

</script>
