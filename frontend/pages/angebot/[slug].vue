<template>
  <div v-if="offer">
    <pre>{{ offer?.attributes.content?.find((e) => e.price)?.price[0] }}</pre>
    <div
      class="h-[60vh] md:h-[80vh] md:min-h-[720px] relative overflow-hidden -mt-36"
    >
      <ScrollParallax speed="0.2">
        <Image
          :media="offer.attributes.hero?.image.data.attributes"
          class="h-full -z-10 translate-y-0 lg:-translate-y-[20%]"
          width="full"
          aspectRatio="16/12"
        />
      </ScrollParallax>
    </div>
    <div class="pt-24">
      <div
        class="relative bg-white md:rounded-2xl px-5 py-10 md:px-12 lg:px-24 md:py-24 max-w-5xl md:mx-12 lg:mx-auto -mt-64 z-40 flex flex-col gap-5 items-start"
      >
        <h1 class="text-xl md:text-2xl font-bold text-stone-400">
          {{ offer.attributes.title }}
        </h1>
        <h2 class="text-3xl md:text-5xl font-bold">
          {{ offer.attributes.hero?.copy }}
        </h2>
        <h3
          class="text-xl md:text-3xl font-medium mt-2"
          v-if="offer.attributes.hero?.subCopy"
        >
          {{ offer.attributes.hero?.subCopy }}
        </h3>
      </div>
      <ContentCollection :content="offer?.attributes.content" :page="offer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import ContentCollection from "~/components/species/ContentCollection.vue";
import Image from "~/components/molecules/Image.vue";
import ScrollParallax from "vue3-parallax/src/components/ScrollParallax.vue";
import { Offer, Strapi4ResponseData, State, Strapi } from "~/types";
const route = useRoute();
const state = inject("state") as State;

const offer = ref<Strapi4ResponseData<Offer> | null>(null);
onMounted(() => {
  console.log(useStrapi());
  useStrapi()
    .find<Offer>("offers", {
      populate: ["content", "hero"],
      filters: { slug: route.params.slug },
    })
    .then(({ data }) => {
      offer.value = data[0];
      if (state) state.headerColor = data[0].attributes.headerColor;
    })
    .catch((err) => console.error(err));
});
onUnmounted(() => {
  if (state) state.headerColor = null;
});
useSchemaOrg([
  defineProduct({
    name: offer.value?.attributes.title,
    description: offer.value?.attributes.subCopy,
    image: [offer.value?.attributes.hero?.image.data.attributes.url],
    offer: {
      price: offer.value?.attributes.content?.find((e) => e.price)?.price[0]
        ?.price,
      priceCurrency: "EUR",
    },
  }),
]);
</script>
