<template>
  <div class="p-5 md:p-12 mx-auto w-full">
    <h1 class="font-bold text-left text-4xl sm:text-6xl mb-10">
      {{ $route.meta.title }}
    </h1>
    <p class="text-xl mb-12 max-w-2xl" v-if="$route.meta.description">
      {{ $route.meta.description }}
    </p>
    <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-12">
      <OfferComponent
        v-for="(offer, i) in offers"
        :key="offer.id"
        :offer="offer"
        class="md:min-w-[360px] h-96"
        :class="{ 'lg:col-span-2': featured.includes(offer.id) || i === 0 }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import OfferComponent from "~/components/organisms/Offer.vue";
import { Offer, Strapi4ResponseData } from "~/types";

const offers = ref(null as Strapi4ResponseData<Offer>[] | null)
const featured = ref([] as number[])
onMounted(async () => {
  useStrapi().find<Offer>("offers", { populate: ["content", "hero"] }).then(({ data }) => offers.value = data);
  useState().setHeaderColor("dark")
})
onUnmounted(() => useState().setHeaderColor(null))

definePageMeta({
  title: "Angebote",
  description:
    "Hier wirst du deinen Weg finden und kannst im Wald oder mit den Pferden einen Prozess der Heilung zu beginnen.",
});

</script>
