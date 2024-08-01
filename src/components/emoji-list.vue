<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },

    command: {
      type: Function,
      required: true,
    },

    editor: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      selectedIndex: 0,
    };
  },

  watch: {
    items() {
      this.selectedIndex = 0;
    },
  },

  methods: {
    onKeyDown({ event }) {
      if (event.key === "ArrowUp") {
        this.upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        this.downHandler();
        return true;
      }

      if (event.key === "Enter") {
        this.enterHandler();
        return true;
      }

      return false;
    },

    upHandler() {
      this.selectedIndex = (this.selectedIndex + this.items.length - 1) % this.items.length;
    },

    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
    },

    enterHandler() {
      this.selectItem(this.selectedIndex);
    },

    selectItem(index) {
      const item = this.items[index];

      if (item) {
        this.command({ name: item.name });
      }
    },
  },
};
</script>

<template>
  <div class="emoji-list">
    <v-list dense>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        clickable
        :active="index === selectedIndex"
        @click="selectItem(index)"
      >
        <v-list-item-icon>
          {{ item.emoji }}
        </v-list-item-icon>
        <v-list-item-content> :{{ item.name }}: </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<style lang="scss">
.emoji-list {
  max-height: 30vh;
  padding: 0 4px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--theme--popover--menu--background);
  border: none;
  border-radius: var(--theme--popover--menu--border-radius);
  box-shadow: var(--theme--popover--menu--box-shadow);
  transition-timing-function: var(--transition-out);
  transition-duration: var(--fast);
  transition-property: opacity, transform;
  contain: content;

  .v-list {
    --v-list-background-color: transparent;
  }
}
</style>
