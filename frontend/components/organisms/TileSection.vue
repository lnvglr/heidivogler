<template>
  <section class="grid grid-cols-1 md:grid-cols-2 auto-rows-fr grid-flow-row gap-6 sm:gap-12 bg-stone-100 p-12 max-w-7xl mx-auto">
    <Tile v-for="t in data.tile" :icon="t.icon" :title="t.title" :description="t.description" />
  </section>
</template>

<script lang="ts">
import Tile from "./Tile.vue";
export default defineComponent({
  components: {
    Tile,
  },
  props: {
    data: {
      type: Object,
    },
  },
  computed: {
    content() {
      return useMarkdown(this.data);
    },
  },
});
</script>
<style lang="scss"></style>
