<template>
  <section
    class="grid grid-cols-1 md:grid-cols-4 justify-center py-24 px-6 duration-1000 overflow-hidden"
  >
    <div class="hidden md:flex justify-center">
      <Button
        class="w-12 mt-24"
        @click="prev"
        v-if="data.testimonial.length > 1"
        :title="$t('prev.testimonial')"
        ><ClientOnly
          ><FontAwesomeIcon :icon="['fas', 'arrow-left']" /></ClientOnly
      ></Button>
    </div>
    <ListGroupTransition transitionName="move" class="col-span-2 mx-auto">
      <div v-for="testimonial in testimonials" :key="testimonial.id">
        <TestimonialComponent :testimonial="testimonial" />
      </div>
    </ListGroupTransition>
    <!-- <TestimonialComponent
        v-for="testimonial in testimonials"
        :key="testimonial.id"
        :testimonial="testimonial"
      /> -->
    <div class="hidden md:flex justify-center w-full">
      <Button
        class="w-12 mt-24"
        @click="next"
        v-if="data.testimonial.length > 1"
        :title="$t('next.testimonial')"
        ><ClientOnly
          ><FontAwesomeIcon :icon="['fas', 'arrow-right']" /></ClientOnly
      ></Button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Button from "~/components/molecules/Button.vue";
import TestimonialComponent from "~/components/cells/Testimonial.vue";
import ListGroupTransition from "~/components/cells/ListGroupTransition.vue";
import {
  Testimonial,
  Strapi4ResponseData,
  Strapi4ResponseSingle,
} from "~/types";
const props = defineProps<{
  data: {
    testimonial: Testimonial[];
  };
}>();
const current = ref(Math.floor(Math.random() * props.data.testimonial.length));
const timeout = ref(null as NodeJS.Timeout | null);
const testimonials = computed(() => {
  return props.data.testimonial.filter(
    (e: any, i: number) => i === current.value
  );
});
const duration = computed(() => {
  return props.data.testimonial[current.value].testimonial.length * 50 + 1500;
});
onMounted(() => {
  const interval = () => {
    next();
    timeout.value = setTimeout(interval, duration.value);
  };
  timeout.value = setTimeout(interval, duration.value);
});
onBeforeUnmount(() => {
  if (timeout.value) clearTimeout(timeout.value);
});
const prev = () => {
  clearTimeout(timeout.value);
  if (current.value === 0) {
    current.value = props.data.testimonial.length - 1;
  } else {
    current.value--;
  }
};
const next = () => {
  clearTimeout(timeout.value);
  if (current.value === props.data.testimonial.length - 1) {
    current.value = 0;
  } else {
    current.value++;
  }
};
</script>
