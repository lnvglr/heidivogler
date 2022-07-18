<template>
  <section class="p-12">
    <div class="max-w-3xl mx-auto">
      <div class="text-stone-500 font-medium">{{ data.preCopy }}</div>
      <div class="text-4xl">{{ data.copy }}</div>

      <FormKit type="form" v-model="contact">
        <FormKit type="text" name="name" />
        <FormKit type="email" name="email" />
        <FormKit type="textarea" name="message" />
      </FormKit>
      {{contact}}
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      contact: {
        name: "",
        email: "",
        message: "",
      },
    }
  }
});
</script>

<style scoped></style>
