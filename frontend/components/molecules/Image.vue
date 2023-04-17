<template>
  <div
    ref="image"
    class="overflow-hidden h-full w-full"
    v-bind="$attrs"
  >
  <!-- <pre class="m-12 py-20">{{ smallest.url }}</pre> -->
    <NuxtImg
      :src="sources[0].url"
      class="duration-300 w-full h-full"
      provider="cloudinary"
      :placeholder="smallest.url"
      format="webp"
      responsive
      :width="w"
      quality="90"
      :class="[aspectRatio, object, loading ? 'blur-lg scale-105' : '']"
      :alt="alt || media?.alternativeText || 'image'"
      loading="lazy"
      @load="load"
    />
      <!-- :srcset="srcset" -->
  </div>
</template>
<script lang="ts" setup>
import { CSSProperties } from "vue";
import { ImageProps, StrapiMedia } from "~/types";

const props = defineProps<{
  media?: StrapiMedia;
  src?: string;
  alt?: string;
  size?: string;
  width?: string | number;
  height?: string;
  aspectRatio?: string;
  placeholder?: string;
  lazy?: boolean;
  object?: CSSProperties['objectFit'];
}>();

const w = computed(() => {
  if (props.width === "full") return undefined;
  if (typeof props.width === "number") return props.width;
  if (typeof props.width === "string" && typeof parseInt(props.width, 10) === 'number') return parseInt(props.width, 10);
  return 100;
});
// const sizeMap = {
//   thumbnail: 'xs',
//   small: 'sm',
//   medium: 'md',
//   large: 'lg',
//   full: 'xl'
// }
// const sizes = computed(() =>{
//   const formats = Object.entries(props.media.formats) as [string, ImageProps][];
//   const srcset = formats.map(([name, format]) => `${sizeMap[name]}:${format.width}px`).join(" ");
//   return srcset;
// })
const formats = Object.values(props.media?.formats || {}) as ImageProps[];
const source = computed(() => props.src || props.media?.url || "");

const smallest = computed(()=> {
  return formats.reduce(
    (acc, curr) => (curr?.width < acc?.width ? curr : acc),
  );
})
const sources = computed(()=> {
  return formats.sort(
    (a, b) => (b?.width - a?.width),
  );
})
const srcset = computed(() =>{
  return formats.map((format) => `${format.url} ${format.width}w`).join(", ");
})


const aspectRatio = computed(() => props.aspectRatio ? `aspect-[${props.aspectRatio}]` : 'aspect-square');
const object = computed(() => props.object ? `object-[${props.object}]` : 'object-cover');

const loading = ref(true)
const load = () => {
  setTimeout(() => {
    loading.value = false;
  }, 100);
}
</script>
