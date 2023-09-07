<template>
  <div>
    <div
      :class="[page ? 'opacity-100': 'opacity-0']"
      class="duration-1000 transition-opacity absolute h-screen min-h-[1280px] w-screen -mt-36 after:bg-success-800 after:absolute after:w-full after:h-full after:top-0 -z-10"
    >
      <NuxtImg src="/green.jpg" format="webp" class="relative object-cover w-full h-full z-10 mix-blend-hard-light" alt="" role="presentation" />
    </div>
    
    <Circles />
    <TransitionGroup tag="div" name="page" style="--total: 2">
      <HeroCopy
        v-if="page?.attributes?.hero"
        :copy="page.attributes.hero.copy"
        :subCopy="page.attributes.hero.subCopy"
        class="p-5 md:p-12 lg:p-24 pt-24 pb-12 w-full"
        :ornaments="true"
        style="--i: 2"
        :key="2"
      />
      <div
        v-if="page"
        class="text-gold-200 flex flex-col items-center gap-5 relative lg:top-12"
        style="--i: 1"
        :key="1"
      >
        <span class="cursor-pointer" @click.prevent="scrollToHash('#angebote')"
          >Angebote kennenlernen</span
        >
        <Arrow />
      </div>
    </TransitionGroup>
    <TransitionGroup
      tag="div"
      name="page"
      :style="`--total: ${offers.length}`"
      class="h-[150vh] min-h-[1280px] max-h-[1920px] w-full grid grid-cols-1 grid-rows-6 lg:mb-[-30vh] p-6 gap-6 lg:-mt-12 xl:p-12 xl:gap-12"
      :class="{
        'lg:grid-cols-1': offers.length === 1,
        'lg:grid-cols-2': offers.length === 2,
        'lg:grid-cols-3': offers.length === 3,
      }"
    >
      <Offer
        v-for="(offer, i) in offers"
        :key="offer.id"
        :offer="offer"
        :parallax="i + 1"
        innerClass="lg:p-8 xl:p-12"
        class="z-50 w-full row-span-2 lg:row-span-4"
        :class="{
          'row-start-1 lg:row-start-1 lg:col-start-1': i === 0,
          'row-start-3 lg:row-start-2 lg:col-start-2': i === 1,
          'row-start-5 lg:row-start-3 lg:col-start-3': i === 2,
        }"
        :style="`--i: ${offers.length - i}`"
        :loading="i === 0 ? 'eager' : 'lazy'"
        :vertical="verticalHero"
      />
      <div
        key="SocialLinks"
        class="sticky bottom-0 hidden lg:block lg:row-start-2 lg:row-span-1 text-gold-200 px-0 lg:px-12 xl:px-24"
        :class="{
          'lg:col-start-1': offers.length === 1,
          'lg:col-start-2': offers.length === 2,
          'lg:col-start-3': offers.length === 3,
        }"
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
<script setup lang="ts">
import HeroCopy from "~/components/organisms/HeroCopy.vue";
import SocialLinks from "~/components/species/SocialLinks.vue";
import Offer from "~/components/organisms/Offer.vue";
import Circles from "~/components/organisms/Circles.vue";
import Arrow from "~/components/molecules/Arrow.vue";
import ContentCollection from "~~/components/species/ContentCollection.vue";

import { Page } from "~/types";


const { data: page } = await useStrapi().findOne<Page>("home")
const verticalHero = ref(true)

const setHeroAspect = () => verticalHero.value = window.innerWidth >= 1024


onMounted(() => {
  setHeroAspect()
  window.addEventListener('resize', setHeroAspect)
})
onUnmounted(() => window.removeEventListener('resize', setHeroAspect))

const offers = computed(() => {
  return page?.attributes?.offers?.data
    .filter(e => e.attributes.publishedAt)
})

const scrollToHash = (hash: string) => {
  document?.querySelector(hash)?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

useHead({
  title: page?.attributes?.meta?.title,
  meta: [
    {
      hid: "description",
      name: "description",
      content:
        page?.attributes?.hero.copy +
        " " +
        page?.attributes?.hero.subCopy,
    },
  ],
  link: [
    {
      rel: "preload",
      as: "image",
      href: offers.value?.[0]?.attributes?.hero.image?.data.attributes,
    },
  ],
})
</script>