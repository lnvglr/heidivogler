<template>
  <div v-if="page">
    <div class="h-[90vh] min-h-[720px] relative">
      <Image
        :media="page.attributes.hero.image?.data.attributes"
        class="h-full -mt-36 -z-10 object-top"
        width="full"
        aspectRatio="16/10"
      />
      <Transition name="slide-in">
        <HeroCopy
          v-if="show"
          :copy="page.attributes.hero.copy"
          :subCopy="page.attributes.hero.subCopy"
          class="absolute bottom-0 p-24 w-full bg-gradient-to-t z-20"
        />
      </Transition>
    </div>
    <ContentCollection :content="page.attributes.content" />
  </div>
</template>

<script lang="ts">
import Image from "~/components/molecules/Image.vue";
import HeroCopy from "~/components/organisms/HeroCopy.vue";
import ContentCollection from "~/components/species/ContentCollection.vue";

export default defineComponent({
  setup() {
    definePageMeta({
      headerInverted: true,
    });
  },
  components: {
    Image,
    HeroCopy,
    ContentCollection,
  },
  data() {
    return {
      page: null,
      show: false,
    };
  },
  methods: {},
  async mounted() {
    setTimeout(() => {
      this.show = true;
    }, 500);
    this.page = (await this.$strapi.find("about")).data;
  },
});
</script>

<style scoped></style>
