<template>
  <section class="flex justify-center gap-5 p-5 sm:p-12 md:p-10 lg:p-12 flex-col lg:flex-row">
    <div
      v-for="price in data?.price"
      key="price.id"
      class="flex flex-col bg-white lg:w-96 rounded-xl overflow-hidden lg:order-0"
      :class="{
        'lg:mt-12 w-full max-lg:order-1': !price.popular,
        'bg-success-800 text-white w-full': price.popular,
      }"
    >
      <div
        v-if="price.popular"
        class="flex items-center w-full h-12 justify-center bg-success-400 text-white uppercase tracking-wider text-sm"
      >
        {{ $t("mostPopular") }}
      </div>
      <div class="flex flex-col gap-12 h-full p-5 sm:p-12 md:p-10 lg:p-12">
        <div class="flex flex-col items-center">
          <div class="text-xl">{{ price.title }}</div>
          <div class="text-4xl font-bold">{{ realPrice(price) }}</div>
          <div v-if="price.discount" class="text-sm mt-2 text-alert-500">{{ price.discount }}% Rabatt, vorher {{ price.price }}€</div>
        </div>
        <div class="markdown text-md flex flex-col gap-4">
          <div v-for="item in list(price)" class="flex gap-3 leading-tight">
            <FontAwesomeIcon
              :icon="['fas', 'check']"
              fixed-width
              class="text-success-400 mt-1 shrink-0"
            />
            <div>{{ item }}</div>
          </div>
        </div>
        <div class="flex flex-col items-center mt-auto">
          <Button
            :to="`mailto:${emailTo}?subject=${page?.attributes.title} – ${price.title}`"
            >{{ $t('register') }}</Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Button from "../molecules/Button.vue";
export default defineComponent({
  components: {
    Event,
    Button,
    FontAwesomeIcon,
  },
  props: {
    data: {
      type: Object,
    },
    page: {
      type: Object,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      prices: null,
      size: null,
      loaded: false,
      emailTo: useRuntimeConfig().public.email.to,
      lineBreak: "%0D%0A"
    };
  },
  methods: {
    realPrice(price) {
      const p = `${price.price}€`
      if (!price.discount) return p;
      return `${Math.round(price.price - price.price / price.discount)}€`;
    },
    list(price) {
      return price.list.replaceAll("\n", "").split("- ").filter(Boolean);
    },
  },
});
</script>
<style lang="scss"></style>
