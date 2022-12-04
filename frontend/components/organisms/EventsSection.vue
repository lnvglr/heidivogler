<template>
  <section class="flex flex-col gap-12 p-5 sm:p-12" v-if="(events?.length > 0)" :class="{'max-w-5xl mx-auto p-5 md:p-12 lg:px-0': events?.length < 4}">

    <div class="flex flex-col items-start gap-2">
      <NuxtLink to="/termine" class="text-3xl font-bold hover:text-primary-500"
        :class="{'pointer-events-none': title}">{{$t('upcoming.events.title')}}</NuxtLink
      >
      <span class="font-medium text-stone-500"
        >{{$t('upcoming.events.description')}}</span
      >
    </div>
    <!-- <div class="flex flex-wrap gap-6 overflow-x-auto -mx-5 px-5"> -->
    <div class="flex md:flex-wrap gap-6 overflow-x-auto -mx-5 px-5">
      <Event :event="event" v-for="event, i in events" :size="i === 0 ? 'xl' : 'md'" />
    </div>
  </section>
  <section v-else class="p-12 text-center">Keine bevorstehenden Termine</section>
  <!-- <section v-else class="p-12 my-24 text-center text-stone-300"><FontAwesomeIcon class="spin" :icon="['fas', 'circle-notch']" size="2xl" /></section> -->
  <!-- <section v-else-if="loaded" class="p-12 text-center">Keine bevorstehenden Termine</section>
  <section v-else class="p-12 my-24 text-center text-stone-300"><FontAwesomeIcon class="spin" :icon="['fas', 'circle-notch']" size="2xl" /></section> -->
</template>

<script lang="ts">
import Event from "~/components/cells/Event.vue";
export default defineComponent({
  components: {
    Event,
  },
  props: {
    data: {
      type: Object,
    },
    page: {
      type: Object,
    },
    title: {
      type: String,
    }
  },
  data() {
    return {
      events: null,
      loaded: false,
    };
  },
  async mounted() {
    if (this.data.filter !== "all" && this.page?.attributes.events?.data.length > 0) {
      this.events = this.page?.attributes.events?.data.filter(
        (event) => event.attributes.end > new Date().toISOString()
      );
      this.loaded = true;
    } else if (!this.page?.attributes.events) {
      this.events = (
        await this.$strapi.find("events", {
          sort: "start",
          filters: {
            start: {
              $gte: new Date(),
            },
          },
        })
      ).data;
      this.loaded = true;
    }
  },
});
</script>
<style lang="scss"></style>
