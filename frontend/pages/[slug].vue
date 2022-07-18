<template>
  <NuxtLayout name="plain" v-if="page">
    <template #title>{{ page?.attributes.title }}</template>
    <div class="markdown max-w-4xl" v-html="content" />
  </NuxtLayout>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
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
