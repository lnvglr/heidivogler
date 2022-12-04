<template>
  <div>
    <div
      class="absolute h-screen min-h-[1280px] w-screen -mt-36 -z-10 bg-success-800 green"
      :class="{'show-green': page}"
    ></div>
    <Circles />
    <TransitionGroup tag="div" name="page" style="--total: 2">
      <HeroCopy
        v-if="page?.attributes?.hero"
        :copy="page.attributes.hero.copy"
        :subCopy="page.attributes.hero.subCopy"
        :ornaments="true"
        class="p-6 sm:p-12 lg:p-24 pt-24 pb-12 w-full"
        style="--i: 2"
        :key="2"
      />
      <div
        v-if="page"
        class="text-gold-200 flex flex-col items-center gap-5 relative lg:top-12"
        style="--i: 1"
        :key="1"
      >
        <span class="cursor-pointer" @click.prevent="scrollToHash('#angebote')">Angebote kennenlernen</span>
        <Arrow />
      </div>
    </TransitionGroup>
    <TransitionGroup
      tag="div" name="page" style="--total: 3"
      class="h-[150vh] min-h-[1280px] max-h-[1920px] w-full grid grid-cols-1 grid-rows-6 lg:mb-[-30vh] p-6 gap-6 lg:grid-cols-3 lg:-mt-12 xl:p-12 xl:gap-12"
      id="angebote"
    >
      <Offer
        v-for="(offer, i) in offers"
        :key="offer.id"
        :offer="offer"
        :parallax="i + 1"
        innerClass="lg:p-8 xl:p-12"
        :class="`row-span-2 lg:row-span-4 lg:col-start-${i + 1} row-start-${
          i * 2 - 1
        } lg:row-start-${i + 1} w-full`"
        :style="`--i: ${3 - i}`"
      />
      <div
        key="SocialLinks"
        class="hidden lg:block lg:row-start-2 lg:row-span-1 lg:col-start-3 text-gold-200 px-0 lg:px-12 xl:px-24"
      >
        <SocialLinks
          v-if="page"
          class="font-regular"
          :links="['instagram', 'email']"
          :cta="true"
        />
      </div>
    </TransitionGroup>
    <ContentCollection :content="page?.attributes?.content" :page="page" />
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
    ContentCollection,
  },
  head() {
    return {
      title: this.page?.attributes?.meta?.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.page?.attributes?.hero.copy + " " + this.page?.attributes?.hero.subCopy,
        },
      ],
    };
  },
  setup() {
    definePageMeta({
      headerInverted: true,
    });
    console.log("setup");
  },
  data() {
    return {
      page: null,
    };
  },
  mounted() {
    console.log("mounted");
    this.$strapi.find("home").then(({data}) => {
      this.page = data;
      console.log(data?.attributes?.content)
    });
  },
  computed: {
    offers() {
      return this.page?.attributes?.offers?.data.slice(0, 3)
    }
  },
  methods: {
    scrollToHash(hash: string) {
      document.querySelector(hash).scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    },
  }
});
</script>
<style scoped>
.green:after {
  opacity: 0;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  mix-blend-mode: hard-light;
  background-image: url("/green.jpg");
  background-size: cover;
  transition: 2s;
}
.show-green:after {
  opacity: 1;
}
</style>
