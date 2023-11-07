<template>
  <Suspense>
    <template #default>
      <tiptap-editor v-bind="$attrs" />
    </template>

    <template #fallback>
      {{ $t("loading") }}
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import TiptapEditor from "./tiptap-editor.vue";
</script>
