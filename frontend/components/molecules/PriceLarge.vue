<template>
  <div
    class="flex flex-col lg:w-96 rounded-xl overflow-hidden lg:order-0"
    :class="{
      'bg-white lg:mt-12 w-full max-lg:order-1': !highlight,
      'bg-success-800 text-white w-full': highlight,
    }"
  >
    <div
      v-if="highlight"
      class="flex items-center w-full h-12 justify-center bg-success-400 text-white uppercase tracking-wider text-sm"
    >
      {{ highlight }}
    </div>
    <div class="flex flex-col gap-12 h-full p-5 sm:p-12 md:p-10 lg:p-12">
      <div class="flex flex-col items-center text-center">
        <div class="text-xl">{{ title }}</div>
        <div v-if="typeof price === 'number'" class="text-4xl font-bold flex flex-col">
          <span>{{ $n(price, {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
                currencyDisplay: "narrowSymbol",
              }).replace(/\s/g,'') }}</span
          ><span v-if="unit" class="text-sm font-normal">{{
            $t("per", { unit })
          }}</span>
        </div>
        <div
          v-if="
            typeof discount === 'number' && typeof originalPrice === 'number'
          "
          class="text-sm mt-2 text-alert-500"
        >
          {{
            $t("discount", {
              discount: $n(discount / 100, { style: "percent" }).replace(/\s/g,''),
              originalPrice: $n(originalPrice, {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
                currencyDisplay: "narrowSymbol",
              }).replace(/\s/g,''),
            })
          }}
        </div>
      </div>
      <div class="markdown text-md flex flex-col gap-4">
        <div v-for="item in list" class="flex gap-3 leading-tight">
          <FontAwesomeIcon
            :icon="['fas', 'check']"
            fixed-width
            class="text-success-400 mt-1 shrink-0"
          />
          <div v-html="useMarkdown(item)" class="markdown" />
        </div>
      </div>
      <div class="flex flex-col items-center mt-auto" v-if="mailTo">
        <Button :to="mailTo">{{ $t("register") }}</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Button from "../molecules/Button.vue";
defineProps<{
  highlight: string;
  discount: boolean | number;
  title: string;
  price: number;
  originalPrice: number;
  list: string[];
  mailTo: string;
  unit: string;
}>();
</script>
