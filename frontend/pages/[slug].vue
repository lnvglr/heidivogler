<template>
  <NuxtLayout name="default" v-if="page" class="p-12 max-w-4xl mx-auto">
    <template #title>{{ page?.attributes.title }}</template>
    <div class="markdown" v-html="content" />
  </NuxtLayout>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    definePageMeta({
      layout: false,
    });
  },
  data() {
    return {
      page: null,
    };
  },
  computed: {
    content() {
      if (!this.page) return "";
      return useMarkdown(this.page.attributes.content);
    },
  },
  mounted() {
    this.$strapi.find(this.$route.params.slug).then(({ data }) => {
      this.page = data;
    });
  },
});
</script>

<style scoped></style>
