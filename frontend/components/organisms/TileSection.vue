<template>
  <section class="bg-stone-100 p-12 flex justify-center">
    <Tile :icon="data.icon" :title="data.title" :description="data.description" />
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
