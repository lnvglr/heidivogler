<template>
  <div>
    <div class="absolute h-screen min-h-[1280px] w-screen -mt-36 -z-10 bg-success-800 green"></div>
    <Circles />
    <TransitionGroup tag="div" name="page" style="--total: 3">
      <HeroCopy
        v-if="page?.attributes.hero" 
        :copy="page.attributes.hero.copy"
        :subCopy="page.attributes.hero.subCopy"
        :ornaments="true"
        class="p-24 pt-24 pb-12 w-full"
        style="--i: 2"
      />
      <div
        v-if="page"
        class="text-gold-200 flex flex-col items-center gap-5 relative top-12"
        style="--i: 1"
      >
        <a href="#angebote">Angebote kennenlernen</a>
        <Arrow />
      </div>
    </TransitionGroup>
    <div
      class="h-[120vh] min-h-[1280px] w-full grid grid-cols-1 grid-rows-8 p-6 gap-6 lg:grid-cols-3 lg:-mt-12 xl:p-12 xl:gap-12"
      id="angebote"
    >
      <Offer
        v-for="(offer, i) in offers"
        :key="offer.id"
        :offer="offer"
        :class="`row-span-2 lg:row-span-6 lg:col-start-${i + 1} row-start-${i * 2 + 2} lg:row-start-${
          i + 1
        } w-full`"
      />
      <div
        class="lg:row-start-2 lg:row-span-1 lg:col-start-3 text-gold-200 px-0 lg:px-12 xl:px-24"
      >
        <SocialLinks class="font-regular" :links="['instagram', 'email']" :cta="true" />
      </div>

    </div>
    <ContentCollection :content="page?.attributes.content" />
  </div>
</template>
<script lang="ts">
import HeroCopy from "~/components/organisms/HeroCopy.vue";
import SocialLinks from "~/components/species/SocialLinks.vue";
import Offer from "~/components/organisms/Offer.vue";
import Circles from "~/components/organisms/Circles.vue";
import Button from "~/components/molecules/Button.vue";
import Arrow from "~/components/molecules/Arrow.vue";
import Event from "~/components/cells/Event.vue";
import ContentCollection from "~~/components/species/ContentCollection.vue";

export default defineComponent({
  components: {
    HeroCopy,
    SocialLinks,
    Offer,
    Circles,
    Button,
    Arrow,
    Event,
    ContentCollection
},
  setup() {
    definePageMeta({
      headerInverted: true,
    });
  },
  data() {
    return {
      page: null,
      offers: null,
    }
  },
  async mounted() {
    this.page = (await this.$strapi.find("home")).data;
    this.offers = (
      await this.$strapi.find("offers")
    ).data.slice(0, 3);
  },
});
</script>
<style scoped>
.green:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  mix-blend-mode: hard-light;
  opacity: 1;
  background-image: url("/green.jpg");
  background-size: cover;
}
</style>
