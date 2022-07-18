<template>
  <NuxtLayout name="plain">
    <template #title v-if="$route.meta.title">{{ $route.meta.title }}</template>
    <div class="flex flex-wrap gap-5"><Button v-for="offer in offers" :key="offer.id" :to="`/angebot/${offer.attributes.slug}`">{{offer.attributes.title}}</Button></div>
  </NuxtLayout>
</template>

<script lang="ts">
import Button from "~/components/molecules/Button.vue";
export default defineComponent({
	components: {
		Button
	},
  setup() {
    definePageMeta({
      title: "Angebote",
    });

    return {};
  },
  data() {
    return { offers: null };
  },
  async mounted() {
    this.offers = (
      await this.$strapi.find("offers", { populate: ["content", "hero"] })
    ).data;
  },
});
</script>

<style scoped></style>
