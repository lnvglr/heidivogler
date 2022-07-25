<template>
  <NuxtLayout name="default" class="p-12 max-w-1/2 mx-auto">
    <template #title v-if="$route.meta.title">{{ $route.meta.title }}</template>
    <EventsSection :data="{ size: 'xl' }" class="p-0" />
  </NuxtLayout>
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
      layout: false
    });
  },
});
</script>

<style scoped></style>
