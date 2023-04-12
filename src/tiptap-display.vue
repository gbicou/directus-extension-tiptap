<template>
  <v-text-overflow class="display" placement="bottom" :text="text" />
</template>

<script setup lang="ts">
import type { JSONContent } from "@tiptap/vue-3";
import type { TypeType, ValueType } from "./types";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    value: ValueType | null;
    type: TypeType;
  }>(),
  { value: null }
);

function getText(json: JSONContent): string {
  return json.text ?? (json.content?.map(getText).join("").trim() ?? "") + "\n";
}

const text = computed(() => {
  switch (props.type) {
    case "json":
      return getText(props.value);
    case "text":
      return props.value;
  }
  return "";
});
</script>
