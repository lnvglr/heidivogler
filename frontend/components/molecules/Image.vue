<template>
  <div class="overflow-hidden h-full w-full" v-bind="$attrs">
    <img
      :src="source || smallest.url || ''"
      :srcset="(srcset) || ''"
      :style="`--aspect-ratio: ${aspectRatio}`"
      class="duration-300"
      :class="{
        'w-full h-full': width === 'full',
        'duration-75 blur-lg brightness-75 scale-105': loading,
      }"
      :width="w"
      :height="h"
      ref="image"
      :alt="alt || media?.alternativeText || 'image'"
      @load="load"
      loading="lazy"
    />
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
    alt: {
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
    largest(): Media {
      return Object.entries((this.media as Media)?.formats).reduce(
        (a, b) => (a[1]?.width > b[1]?.width ? a : b),
        []
      );
    },
    smallest(): Media {
      return Object.entries((this.media as Media)?.formats).reduce(
        (a, b) => (a[1]?.width < b[1]?.width ? a : b),
        []
      ) as Media;
    },
    source(): string {
      if (this.src) return this.src;
      if (this.media?.url) return this.media.url;
    },
    srcset() {
      const formats = Object.values(this.media.formats) as ImageProps[];
      // formats.push({
      //   url: this.source,
      //   width: 2560,
      // } as ImageProps);
      const srcset = formats.map((format) => `${format.url} ${format.width}w`).join(", ");
      return srcset;
    },
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    load() {
      console.log(this.media)
      this.loading = false;
    },
    match(image: ImageProps) {
      const width = parseInt(this.width);
      if (!isNaN(width) && image[1]?.width > width) return image;
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
