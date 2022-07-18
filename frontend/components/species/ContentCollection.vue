<template>
  <div v-if="content?.length > 0">
    <component
      v-for="element in content"
      :key="element.id"
      :is="component(element.__component)"
      :data="element"
      :page="page"
    />
  </div>
</template>

<script lang="ts">
import TextBlock from "~/components/molecules/TextBlock.vue";
import TextCard from "~/components/molecules/TextCard.vue";
import QuoteSection from "~/components/organisms/QuoteSection.vue";
import ImageSection from "~/components/organisms/ImageSection.vue";
import ButtonSection from "~/components/organisms/ButtonSection.vue";
import EventsSection from "~/components/organisms/EventsSection.vue";
import TestimonialsSection from "~/components/organisms/TestimonialsSection.vue";
import ContactSection from "~/components/organisms/ContactSection.vue";

export default defineComponent({
  components: {
    TextBlock,
    TextCard,
    QuoteSection,
    ImageSection,
    ButtonSection,
    EventsSection,
    ContactSection,
    TestimonialsSection
  },
  props: {
    content: Object,
    page: Object,
  },
  methods: {
    component(name: string) {
      switch (name) {
        case "block.element":
          return TextBlock;
        case "block.card":
          return TextCard;
        case "block.quote":
          return QuoteSection;
        case "block.image":
          return ImageSection;
        case "block.button":
          return ButtonSection;
        case "block.events":
          return EventsSection;
        case "block.testimonials":
          return TestimonialsSection;
        case "block.contact-form":
          return ContactSection;
      }
    },
  },
});
</script>

<style scoped></style>
