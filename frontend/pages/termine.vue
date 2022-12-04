<template>
  <div class="p-12 mx-auto w-full">
    <h1 class="font-bold text-left text-4xl sm:text-6xl mb-10">{{$route.meta.title}}</h1>
    <EventsSection :data="{ size: 'xl' }" class="!p-0" />
  </div>
</template>

<script lang="ts">
import EventsSection from "~/components/organisms/EventsSection.vue";

export default defineComponent({
  components: {
    EventsSection
  },
  setup() {
    definePageMeta({
      title: "Termine",
    });
  },
  head() {
    return {
      title: "Termine",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t('upcoming.events.description'),
        },
      ],
    };
  },
  mounted() {
    this.$state.headerColor = "dark";
  },
  unmounted() {
    this.$state.headerColor = null;
  },
});
</script>

<style scoped></style>
