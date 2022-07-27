<template>
  <component :is="parallaxSpeed ? ScrollParallax : 'div'" :speed="parallaxSpeed / -10" direction="y" :up="true">
    <NuxtLink
      v-if="offer?.attributes"
      :to="offer.attributes.slug ? `angebot/${offer.attributes.slug}` : 'angebote/'"
      class="block h-full relative rounded-md bg-stone-700 overflow-hidden duration-300 hover:-translate-y-1"
    >
      <Image
        v-if="offer.attributes.hero?.image.data"
        :media="offer.attributes.hero.image.data.attributes"
        class="absolute top-0 left-0 h-full"
        width="full"
      />
      <div
        class="relative p-8 lg:p-12 z-10 text-white flex flex-col justify-end h-full bg-gradient-to-t from-black/70"
      >
        <div
          v-if="offer.attributes.events?.data.length > 0"
          class="p-12 -m-12 mb-auto bg-gradient-to-b from-black/40"
        >
          <FontAwesomeIcon :icon="['fas', 'calendar']" class="mr-3" fixed-width />
          <span class="font-bold">
          {{ $t('upcoming.events', { n: offer.attributes.events.data.length }) }}
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <h3 class="text-xl font-medium opacity-70" v-if="offer.attributes.hero?.copy">
            {{ offer.attributes.title }}
          </h3>
          <span class="text-3xl font-bold leading-none hyphens-auto">
            {{ offer.attributes.hero?.copy || offer.attributes.title }}
          </span>
        </div>
      </div>
    </NuxtLink>
  </component>
</template>

<script lang="ts">
import { Offer } from "~/types";
import Image from "~/components/molecules/Image.vue";
import ScrollParallax from "vue3-parallax/src/components/ScrollParallax.vue";
import { markRaw } from "vue";

export default defineComponent({
  components: { Image, ScrollParallax },
  props: {
    offer: {
      type: Object as () => Offer,
      required: true,
    },
    size: {
      type: String,
      default: "medium",
    },
    parallax: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      ScrollParallax: markRaw(ScrollParallax),
      parallaxSpeed: this.parallax
    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.getParallaxSpeed()
    })
    this.getParallaxSpeed()
  },
  methods: {
    getParallaxSpeed() {
      this.parallaxSpeed = window.innerWidth >= 1024 ? this.parallax : 0;
    },
  }
});
</script>

<style scoped></style>
