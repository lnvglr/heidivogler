<template>
  <section ref="tiles" class="bg-stone-100 p-5 md:p-12 min-h-[50vh] grid grid-cols-1 md:grid-cols-2 auto-rows-fr grid-flow-row gap-6 sm:gap-12 max-w-7xl mx-auto" :style="`--total: ${data.tile.length}`" v-if="data.tile.length">
    <Tile v-for="t, i in data.tile" class="flex" :class="{
      'transition-show': inView,
      'transition-hide': !inView,
      '!delay-[0ms] !duration-75': hasTransitioned
       }" :style="`--i: ${data.tile.length - i}`" :icon="t.icon" :title="t.title" :description="t.description" />
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
  data() {
    return {
      observer: new IntersectionObserver((e) => this.checkView(e[0])),
      inView: false,
      hasTransitioned: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.tiles) this.observer.observe(this.$refs.tiles);
    });
  },
  methods: {
    checkView({ isIntersecting }) {
      if (isIntersecting) {
        setTimeout(() => {
          this.inView = true;
          setTimeout(() => {
            this.hasTransitioned = true;
          }, this.data.tile.length * 250);
        }, 500);
      }
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
