<template>
  <img
    v-if="source"
    :src="(inView && source) || ''"
    :srcset="(inView && srcset) || ''"
    :style="`--aspect-ratio: ${aspectRatio}`"
    :class="{ 'w-full': width === 'full' }"
    :width="w"
    :height="h"
    v-bind="$attrs"
    ref="image"
  />
  <div
    v-else
    class="placeholder flex items-center justify-center text-beige-400 font-bold"
  >
    {{ placeholder }}
  </div>
</template>
<script lang="ts">
import { Media, ImageProps } from "~/types";
export default defineComponent({
  props: {
    media: {
      type: Object as () => Media,
    },
    src: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: "small",
    },
    width: {
      type: [String, Number],
    },
    height: {
      type: String,
    },
    aspectRatio: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    lazy: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    w() {
      if (!this.width) return "auto";
      if (typeof this.width === "number") return this.width;
      return this.format?.width || "auto";
    },
    h() {
      if (typeof this.height == "number") return this.height;
      return "auto";
    },
    format() {
      if (!this.media?.formats) return null;
      const f = Object.entries((this.media as Media)?.formats)
        .sort((a, b) => a[1].width - b[1].width)
        .find((image) => this.match(image));
      if (!f) return this.media.formats["thumbnail"];
      return f[1];
    },
    largest() {
      return Object.entries((this.media as Media)?.formats).reduce(
        (a, b) => (a[1]?.width > b[1]?.width ? a : b),
        []
      );
    },
    source(): string {
      if (this.src) return this.src;
      if (this.media?.url) return this.media.url;
    },
    srcset() {
      const formats = Object.values(this.media.formats) as ImageProps[];
      formats.push({
        url: this.source,
        width: 2560,
      } as ImageProps);
      const srcset = formats.map((format) => `${format.url} ${format.width}w`).join(", ");
      return srcset;
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.image) this.observer.observe(this.$refs.image);
    });
  },
  data() {
    return {
      observer: new IntersectionObserver((e) => this.checkView(e[0])),
      inView: !this.lazy,
    };
  },
  methods: {
    checkView({ isIntersecting }) {
      if (isIntersecting) this.inView = true;
    },
    match(image: ImageProps) {
      const width = parseInt(this.width);
      if (width !== NaN && image[1]?.width > width) return image;
      if (this.width === "full" && image[0] === this.largest[0]) return image;
    },
  },
});
</script>
<style scoped>
img {
  aspect-ratio: var(--aspect-ratio);
  object-fit: cover;
}
:global(.placeholder) {
  font-size: var(--text-sm);
}
</style>
