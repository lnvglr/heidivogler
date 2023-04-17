<template>
  <div v-if="offer">
    <div
      class="h-[60vh] md:h-[80vh] md:min-h-[720px] relative overflow-hidden -mt-36"
    >
      <ScrollParallax :speed="0.2">
        <Image
          :media="offer.attributes.hero?.image?.data.attributes"
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
import ContentCollection from "~/components/species/ContentCollection.vue";
import Image from "~/components/molecules/Image.vue";
import ScrollParallax from "vue3-parallax/src/components/ScrollParallax.vue";
import {
  Offer,
  Strapi4ResponseData,
} from "~/types";
const route = useRoute();
const state = useAppState();

const offer = ref<Strapi4ResponseData<Offer> | null>(null);
onMounted(() => {
  useStrapi()
    .find<Offer>("offers", {
      populate: ["content", "hero"],
      filters: { slug: route.params.slug },
    })
    .then(({ data }) => {
      offer.value = data[0];
      state.setHeaderColor(data[0].attributes.headerColor);
    })
    .catch((err) => console.error(err));
});
onUnmounted(() => state.setHeaderColor("default"));

const mediaToImageObject = (heroImage: Offer["hero"]["image"]) => {
  if (!heroImage?.data.attributes) return undefined;
  const { url, caption, height, width } = heroImage?.data.attributes;
  return [{ url, caption, height, width }];
};
useSchemaOrg([
  defineProduct({
    name: offer.value?.attributes.title,
    description: offer.value?.attributes.subCopy,
    image: mediaToImageObject(offer.value?.attributes.hero?.image),
    offers: {
      price: Math.min(
        ...(offer.value?.attributes.content || [])
          ?.filter((e) => e.price)
          .map((e) => e.price.map((e: any) => e.price))
          .flat()
      ),
      priceCurrency: "EUR",
    },
  }),
  // offer.value?.attributes.events?.data
  // defineEvent({
  // 	name: 'The Adventures of Kira and Morrison',
  // 	location: [
  // 		{
  // 			name: 'Heidi Vogler',
  // 			address: {
  // 				streetAddress: 'Gailhöfe 6',
  // 				addressLocality: 'Frickingen',
  // 				postalCode: '88699',
  // 				addressCountry: 'DE',
  // 			},
  // 		},
  // 	],
  // 	image: [
  // 		'https://example.com/photos/1x1/photo.jpg',
  // 		'https://example.com/photos/4x3/photo.jpg',
  // 		'https://example.com/photos/16x9/photo.jpg',
  // 	],
  // 	organizer: {
  // 		name: 'Heidi Vogler',
  // 		url: 'https://www.heidivogler.com',
  // 	},

  // 	offers: {
  // 		price: 30,
  // 		url: 'https://www.example.com/event_offer/12345_201803180430',
  // 		validFrom: new Date(Date.UTC(2024, 5, 21, 12)),
  // 	},
  // 	description: 'The Adventures of Kira and Morrison is coming to Snickertown in a can\'t miss performance.',
  // 	startDate: '2025-07-21T19:00-05:00',
  // 	endDate: '2025-07-21T23:00-05:00',
  // 	eventStatus: 'EventScheduled',
  // 	eventAttendanceMode: 'MixedEventAttendanceMode',
  // })
]);
</script>
