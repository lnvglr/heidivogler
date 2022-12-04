<template>
  <section class="flex flex-col gap-12 p-6 sm:p-12" v-if="(events?.length > 0)">
    <div class="flex flex-col items-start gap-2">
      <NuxtLink to="/termine" class="text-3xl font-bold hover:text-primary-500"
        >{{$t('upcoming.events.title')}}</NuxtLink
      >
      <span class="font-medium text-stone-500"
        >{{$t('upcoming.events.description')}}</span
      >
    </div>
    <div class="flex flex-wrap gap-6">
      <Event :event="event" v-for="event, i in events" :size="i === 0 ? 'md' : 'sm'" />
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
    } else {
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
