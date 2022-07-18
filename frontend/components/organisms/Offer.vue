<template>
  <NuxtLink
    :to="offer.attributes?.slug ? `angebot/${offer.attributes.slug}` : 'angebote/'"
    class="relative rounded-md bg-stone-100 overflow-hidden duration-300 hover:-translate-y-1"
  >
    <Image
      v-if="offer.attributes.hero?.image.data"
      :media="offer.attributes.hero.image.data.attributes"
      class="absolute top-0 left-0 h-full"
      width="full"
    />
    <div
      class="relative p-12 z-10 text-white flex flex-col justify-end h-full bg-gradient-to-t from-black/70"
    >
      <div v-if="offer.attributes.events.data.length > 0" class=" p-12 -m-12 mb-auto bg-gradient-to-b from-black/70 text-shadow">
        <FontAwesomeIcon :icon="['fas', 'calendar']" class="mr-3" fixed-width /><span class="font-bold">{{offer.attributes.events.data.length}} anstehende Termine</span>
      </div>
      <div class="flex flex-col gap-2">
        <h4 class="text-xl font-medium opacity-70" v-if="offer.attributes.hero?.copy">{{ offer.attributes.title }}</h4>
        <h3 class="text-3xl font-bold leading-none">{{ offer.attributes.hero?.copy || offer.attributes.title }}</h3>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts">
import { Offer } from "~/types";
import Image from "~/components/molecules/Image.vue";

export default defineComponent({
  components: { Image },
  props: {
    offer: {
      type: Object as () => Offer,
      required: true,
    },
    size: {
      type: String,
      default: "medium",
    },
  },
	computed: {
	}
});
</script>

<style scoped></style>
