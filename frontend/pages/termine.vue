<template>
  <NuxtLayout name="plain">
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
    });
  },
});
</script>

<style scoped></style>
