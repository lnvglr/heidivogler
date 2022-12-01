<template>
  <NuxtLayout name="default" class="p-12">
    <template #title v-if="$route.meta.title">{{ $route.meta.title }}</template>
    <p class="text-xl mb-12 max-w-2xl" v-if="$route.meta.description">{{ $route.meta.description }}</p>
    <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
    <Offer
      v-for="(offer, i) in offers"
      :key="offer.id"
      :offer="offer"
      class="min-w-[360px] h-96"
      :class="{'lg:col-span-2': featured.includes(offer.id) || i === 0}"
    />
    </div>
  </NuxtLayout>
</template>

<script lang="ts">
import Button from "~/components/molecules/Button.vue";
import Offer from "~/components/organisms/Offer.vue";
export default defineComponent({
  components: {
    Button,
    Offer,
  },
  setup() {
    definePageMeta({
      title: "Angebote",
      description: "Hier wirst du deinen Weg finden und kannst im Wald oder mit den Pferden einen Prozess der Heilung zu beginnen.",
      layout: false,
    });

    return {};
  },
  data() {
    return {
      offers: null,
      featured: []
    };
  },
  async mounted() {
    // this.$strapi.find("home").then(({data}) => {
    //   this.featured = data?.attributes?.offers?.data.slice(0, 3).map(({id}) => id)
    // })
    this.offers = (
      await this.$strapi.find("offers", { populate: ["content", "hero"] })
    ).data;
  },
});
</script>

<style scoped></style>
