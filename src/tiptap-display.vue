<template>
  <div>{{ text }}</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { TypeType, ValueType } from "./types";
import { generateText } from "@tiptap/core";
import { extensions } from "./extensions";

const props = withDefaults(
  defineProps<{
    value: ValueType | null;
    type: TypeType;
  }>(),
  { value: null }
);

const text = computed(() => {
  if (props.type === "json") {
    return generateText(props.value, extensions);
  }
  return props.value;
});
</script>
