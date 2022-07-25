<template>
  <div class="bg-white p-12 rounded-lg flex flex-col items-start gap-12 min-w-[160px]">
    <FontAwesomeIcon
      v-if="icon"
      :icon="['fas', icon]"
      class="text-primary-500 text-3xl leading-none"
    />
    <h3 class="text-2xl font-bold">{{ title }}</h3>
    <div class="markdown" v-html="content">
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    icon: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  computed: {
    content() {
      return useMarkdown(this.description)
    },
  },
});
</script>
<style lang="scss"></style>
