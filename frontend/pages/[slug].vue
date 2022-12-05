<template>
  <div v-if="page" class="p-5 pb-10 md:p-12 max-w-4xl mx-auto">
    <h1 class="font-bold text-left text-3xl md:text-4xl sm:text-6xl mb-10 hyphens-auto">
      {{ page?.attributes.title }}
    </h1>
    <div class="markdown" v-html="content" />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const route = useRoute()
    useHead({
      title: `${route.meta.title} - Heidi Vogler`,
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
