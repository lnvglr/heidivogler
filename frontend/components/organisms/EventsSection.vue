<template>
  <section class="flex flex-col gap-12 p-12" v-if="events?.length > 0">
    <div class="flex flex-col items-start gap-2">
      <NuxtLink to="/termine" class="text-3xl font-bold hover:text-primary-500"
        >Anstehende Termine</NuxtLink
      >
      <span class="font-medium text-stone-500"
        >Alle geplanten Seminare, Retreats und Gruppentherapien, die bald
        stattfinden.</span
      >
    </div>
    <div class="flex flex-wrap gap-6">
      <Event :event="event" v-for="event in events" :size="data.size" />
    </div>
  </section>
  <section v-else class="p-12">Keine bevorstehenden Termine</section>
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
    };
  },
  async mounted() {
    if (this.data.filter !== "all" && this.page?.attributes.events?.data.length > 0) {
      this.events = this.page?.attributes.events?.data;
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
    }
  },
});
</script>
<style lang="scss"></style>
