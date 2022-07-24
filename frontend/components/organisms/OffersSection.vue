<template>
  <section class="grid grid-cols-1 md:grid-cols-6 justify-center py-24 px-6 duration-1000">
    offers
  </section>
</template>

<script lang="ts">
import Button from "~/components/molecules/Button.vue";
import Testimonial from "~/components/cells/Testimonial.vue";
import ListGroupTransition from "~/components/cells/ListGroupTransition.vue";
export default defineComponent({
  components: {
    Button,
    Testimonial,
    ListGroupTransition,
  },
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  computed: {
  },
  methods: {
  },
});
</script>
<style lang="scss"></style>
