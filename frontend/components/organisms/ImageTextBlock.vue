<template>
  <section role="figure" :aria-labelledby="captionId">
    <div class="h-min md:min-h-[360px] max-h-[90vh] overflow-hidden">
      <Image
        :media="content"
        class="h-full -z-10 -translate-y-1/3 md:-translate-y-1/4 scale-105"
        width="full"
      />
    </div>
		{{data}}
    <p
      :id="captionId"
      class="max-w-5xl mx-auto my-3 px-5 md:px-12 markdown"
			v-if="data.Text"
			v-html="text"
    ></p>
  </section>
</template>

<script lang="ts">
import Image from "~/components/molecules/Image.vue";
import { uuid } from "vue-uuid";
export default defineComponent({
  components: {
    Image,
  },
  props: {
    data: {
      type: Object,
    },
  },
  data: () => ({ captionId: uuid.v4() }),
  computed: {
    content() {
      return this.data.image?.data.attributes;
    },
		text() {
			return useMarkdown(this.data.Text)
		}
  },
});
</script>
<style lang="scss"></style>
