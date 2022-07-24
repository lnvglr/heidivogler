<template>
  <section class="p-12 py-24 bg-stone-50">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
      <div class="col-span-1 md:col-span-2 text-stone-500 font-medium">{{ data.preCopy }}</div>
      <div class="flex flex-col gap-3">
        <div class="text-4xl mb-12">{{ data.copy }}</div>
      </div>
      <FormKit
        type="form"
        v-model="contact"
        class="flex-grow"
        style="--fk-max-width-input: 100%"
      >
        <FormKit
          type="text"
          name="name"
          :placeholder="$t('your.name')"
          v-if="touched"
        />
        <FormKit
          type="email"
          name="email"
          :placeholder="$t('your.email')"
          v-if="touched"
        />
        <FormKit
          type="textarea"
          name="message"
          :placeholder="$t('your.message')"
          @focus="touched = true"
        />
      </FormKit>
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
      touched: false,
      contact: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
});
</script>

<style scoped></style>
