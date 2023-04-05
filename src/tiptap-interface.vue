<template>
  <Suspense>
    <template #default>
      <tiptap-editor
        :value="props.value"
        :type="props.type"
        :disabled="props.disabled"
        @input="(v) => emit('input', v)"
      />
    </template>

    <template #fallback>
      {{ $t("loading") }}
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import type { TypeType, ValueType } from "./types";
import TiptapEditor from "./tiptap-editor.vue";

const props = withDefaults(
  defineProps<{
    value: ValueType | null;
    type: TypeType;
    disabled: boolean;
  }>(),
  { value: null, disabled: false }
);

const emit = defineEmits<{
  (e: "input", value: ValueType): void;
}>();
</script>
