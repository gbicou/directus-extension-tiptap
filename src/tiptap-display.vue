<template>
  <div>{{ text }}</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { TypeType, ValueType } from "./types";
import { generateText } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

const props = withDefaults(
  defineProps<{
    value: ValueType | null;
    type: TypeType;
  }>(),
  { value: null }
);

const text = computed(() => {
  if (props.type === "json") {
    return generateText(props.value, [StarterKit, Underline]);
  }
  return props.value;
});
</script>
