<template>
  <div v-if="page" class="p-5 pb-10 md:p-12 max-w-4xl mx-auto">
    <h1
      class="font-bold text-left text-3xl md:text-4xl sm:text-6xl mb-10 hyphens-auto"
    >
      {{ page?.attributes.title }}
    </h1>
    <div class="markdown" v-html="useMarkdown(page?.attributes.content)" />
  </div>
</template>

<script setup lang="ts">
import { Page, Strapi4ResponseData } from "~/types";

const route = useRoute();
const page = ref<Strapi4ResponseData<Page>>();
useHead({
  title: [page.value?.attributes.title, "Heidi Vogler"].join(" - "),
});

useSchemaOrg([
  defineWebPage({
    name: page.value?.attributes.title,
    description: page.value?.attributes.content,
  }),
]);
onMounted(() => {
  const slug =
    typeof route.params.slug === "string"
      ? route.params.slug
      : route.params.slug[0];

  useAppState().setHeaderColor("dark");

  useStrapi()
    .findOne<Page>(slug)
    .then(({ data }) => (page.value = data));
});
onUnmounted(() => useAppState().setHeaderColor("default"));
</script>

