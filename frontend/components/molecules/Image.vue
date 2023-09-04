<template>
  <div class="overflow-hidden h-full w-full" v-bind="$attrs">
    <img
      :src="source"
      :srcset="srcset"
      :style="aspectRatio ? `aspect-ratio: ${aspectRatio}` : ''"
      class="duration-300 object-cover w-full h-full"
      :class="{
        'duration-75 blur-lg brightness-75 scale-105': !isLoaded && !isCached,
      }"
      :width="w"
      :height="h"
      ref="image"
      :alt="alt || media?.caption || `Unbekanntes Bild`"
      :aria-label="alt || media?.caption || `Unbekanntes Bild`"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<script lang="ts" setup>
import { StrapiMedia } from "~/types";

const props = withDefaults(defineProps<{
  media?: StrapiMedia;
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string;
  aspectRatio?: string;
  lazy?: boolean;
}>(), {
  width: "auto",
  height: "auto",
  aspectRatio: "1/1",
  lazy: true,
});

const isLoaded = ref(false);
const isCached = ref(false);

const w = computed(() => {
  if (!props.width) return "auto";
  if (typeof props.width === "number") return props.width;
  return props?.width || "auto";
});

const h = computed(() => {
  if (typeof props.height == "number") return props.height;
  return "auto";
});

const formats = computed(() => Object.values(props.media?.formats || {}));

const smallest = computed(() =>
  formats.value.reduce((a, b) => (a?.width < b?.width ? a : b))
);

const source = computed(() => {
  if (props.src) return props.src;
  if (props.media?.url) return props.media.url;
  return smallest.value?.url;
});

const srcset = computed(() =>
  formats.value.map((format) => `${format.url} ${format.width}w`).join(", ")
);

const onLoad = () => {
  isLoaded.value = true;
};

const onError = () => {
  isLoaded.value = true;
};

// Check if image is already cached in browser cache
const checkCache = async () => {
  if (!source.value) return;

  try {
    await fetch(source.value, { cache: "force-cache" });
    isCached.value = true;
  } catch (error) {
    console.log(error);
  }
};
onMounted(checkCache);
</script>
