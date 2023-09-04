<template>
  <div
    class="flex flex-col shrink-0 w-48 h-36 rounded-xl overflow-hidden max-w-1/2"
    :class="{
      'bg-white': !highlight,
      'bg-success-800 text-white w-full': highlight,
    }"
  >
    <div class="flex flex-col gap-12 h-full p-5">
      <div class="flex flex-col items-start justify-between h-full">
        <div class="text-sm leading-none">{{ title }}</div>
        <div>
          <span class="text-2xl font-bold">{{
            $n(price, {
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 0,
              currencyDisplay: "narrowSymbol",
            }).replace(/\s/g, "")
          }}</span
          ><span v-if="unit" class="text-sm font-normal">/{{ unit }}</span>

          <div
            v-if="
              typeof discount === 'number' && typeof originalPrice === 'number'
            "
            class="text-sm mt-auto text-alert-500"
          >
            {{
              $t("discount", {
                discount: $n(discount / 100, { style: "percent" }).replace(
                  /\s/g,
                  ""
                ),
                originalPrice: $n(originalPrice, {
                  style: "currency",
                  currency: "EUR",
                  maximumFractionDigits: 0,
                  currencyDisplay: "narrowSymbol",
                }).replace(/\s/g, ""),
              })
            }}
          </div>
        </div>
        <div
          v-if="highlight"
          class="flex items-center py-1 px-2 -mx-1 mt-auto justify-center bg-success-400 text-white uppercase tracking-wider text-xs rounded-full"
        >
          {{ highlight }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  highlight: string;
  discount: boolean | number;
  title: string;
  price: number;
  originalPrice: number;
  unit: string;
  list: string[];
  mailTo: string;
}>();
</script>
