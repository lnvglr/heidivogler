<template>
  <section
    class="bg-stone-100 py-24 px-5 md:px-12 duration-1000 overflow-x-auto sm:overflow-hidden"
    v-if="offers?.length > 0"
    :class="{ 'max-w-5xl mx-auto p-12 xl:px-0': offers?.length < 3 }"
  >
    <h3 class="text-3xl font-bold mb-12">{{ $t("more.offers") }}</h3>
    <div
      class="flex gap-5 md:gap-12 md:mr-12 -mx-5 p-5 w-screen md:w-full overflow-x-auto md:overflow-x-hidden md:grid md:grid-cols-1 lg:grid-cols-2"
    >
      <!-- <pre>{{ offers }}</pre> -->
      <Offer
        v-for="offer in offers"
        :key="offer.id"
        :offer="offer"
        class="offer md:w-full md:min-w-min md:max-w-full h-64 md:h-96"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import Offer from "~/components/organisms/Offer.vue";
import { Offer as OfferType, Page, Strapi4ResponseData } from "~/types";
const props = defineProps<{
  data: OfferType;
  page: Strapi4ResponseData<Page>;
}>();

const offers = ref<Strapi4ResponseData<OfferType>[]>([]);
onMounted(async () => {
  const exclude = props.page?.attributes.offers?.data
    ? props.page?.attributes.offers?.data.slice(0, 3).map(({ id }) => id)
    : [props.page?.id];
  const { data } = await useStrapi().find<OfferType>("offers", {
    publicationState: "live",
  });
  const otherOffers = data.filter((e) => !exclude.includes(e.id));
  offers.value = shuffleArray<Strapi4ResponseData<OfferType>>(
    otherOffers
  ).slice(0, 4);
});

const shuffleArray = <T = any>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
</script>
<style lang="scss">
.offer {
  min-width: min(480px, 80vw);
}
</style>
