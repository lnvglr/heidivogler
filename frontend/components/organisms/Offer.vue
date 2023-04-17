<template>
  <component
    :is="parallaxSpeed ? ScrollParallax : 'div'"
    :speed="parallaxSpeed / -10"
    direction="y"
    :up="true"
  >
    <NuxtLink
      v-if="offer?.attributes"
      :to="
        offer.attributes.slug
          ? `/angebot/${offer.attributes.slug}`
          : '/angebote'
      "
      class="block h-full relative rounded-2xl bg-stone-700 overflow-hidden duration-300 hover:-translate-y-1"
    >
      <Image
        v-if="offer.attributes.hero?.image.data"
        :media="offer.attributes.hero.image.data.attributes"
        class="absolute inset-0 h-full"
        width="full"
        :loading="loading"
      />
      <div
        class="relative z-10 text-white flex flex-col justify-end h-full bg-gradient-to-t from-black/70 rounded-2xl"
      >
        <div
          v-if="events.length > 0"
          class="p-5 md:p-12 mb-auto overflow-hidden rounded-2xl"
          :class="{
            'text-white': offer.attributes.headerColor === 'light',
            'text-gold-300': offer.attributes.headerColor === 'default',
            'text-stone-700':
              !offer.attributes.headerColor ||
              offer.attributes.headerColor === 'dark',
          }"
        >
          <ClientOnly>
            <FontAwesomeIcon
              :icon="['fas', 'calendar']"
              class="mr-3"
              fixed-width
            />
          </ClientOnly>
          <span class="font-bold">
            {{ $t("upcoming.events", { n: events.length }) }}
          </span>
        </div>
        <div class="flex flex-col gap-2 p-5 lg:p-12">
          <h3
            class="textlg md:text-xl leading-none font-medium opacity-70"
            v-if="offer.attributes.hero?.copy"
          >
            {{ offer.attributes.title }}
          </h3>
          <span
            class="text-2xl md:text-3xl font-bold leading-none hyphens-auto"
          >
            {{ offer.attributes.hero?.copy || offer.attributes.title }}
          </span>
        </div>
      </div>
    </NuxtLink>
  </component>
</template>

<script lang="ts" setup>
import { Offer, Strapi4ResponseData } from "~/types";
import Image from "~/components/molecules/Image.vue";
import VueScrollParallax from "vue3-parallax/src/components/ScrollParallax.vue";
import { markRaw } from "vue";

interface OfferProps {
  offer: Strapi4ResponseData<Offer>;
  size?: string;
  parallax?: number;
  loading?: 'lazy' | 'eager';
}
// defineprops with defaults
const props = withDefaults(defineProps<OfferProps>(), {
  size: "medium",
  parallax: 0,
});

const ScrollParallax = ref(markRaw(VueScrollParallax))
const parallaxSpeed = ref(props.parallax)
const events = computed(() => props.offer.attributes.events?.data.filter(
  (event) => event.attributes.end > new Date().toISOString()
))

const getParallaxSpeed = () => {
  parallaxSpeed.value = window.innerWidth >= 1024 ? props.parallax : 0;
  }

onMounted(() => {
  window.addEventListener("resize", () => {
    getParallaxSpeed();
  });
  getParallaxSpeed();
})
onUnmounted(() => {
  window.removeEventListener("resize", () => {
    getParallaxSpeed();
  });
})
</script>