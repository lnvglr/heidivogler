<template>
	<NuxtLayout name="plain">
		<template #title v-if="$route.meta.title">{{ $route.meta.title }}</template>
		kontakt content
	</NuxtLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    definePageMeta({
      // layout: false,
      title: "Kontakt",
    });

    return {};
  },
});
</script>

<style scoped></style>
