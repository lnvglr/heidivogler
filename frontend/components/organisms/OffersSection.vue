<template>
  <section class="bg-stone-100 py-24 px-5 md:px-12 duration-1000 overflow-x-auto" v-if="offers?.length > 0" :class="{'max-w-5xl mx-auto p-12 xl:px-0': offers?.length < 3}">
    <h3 class="text-3xl font-bold mb-12">{{ $t("more.offers") }}</h3>
    <div class="flex gap-12 mr-12 -mx-5 p-5 w-screen md:w-fit overflow-x-auto md:overflow-x-hidden">
      <Offer
        v-for="(offer, i) in offers"
        :key="offer.id"
        :offer="offer"
        class="min-w-[480px] max-w-[480px] h-64 md:h-96"
      />
    </div>
  </section>
</template>

<script lang="ts">
import Offer from "~/components/organisms/Offer.vue";
export default defineComponent({
  components: {
    Offer,
  },
  props: {
    data: {
      type: Object,
    },
    page: {
      type: Object,
    },
  },
  data() {
    return {
      offers: null,
    };
  },
  async mounted() {
    const exclude = this.page?.attributes.offers?.data ? this.page?.attributes.offers?.data.slice(0, 3).map(({id}) => id) : [this.page?.id];
    this.offers = (await this.$strapi.find("offers")).data.filter(
      (e: Offer) => !exclude.includes(e.id)
    );
  },
  computed: {},
  methods: {},
});
</script>
<style lang="scss"></style>
