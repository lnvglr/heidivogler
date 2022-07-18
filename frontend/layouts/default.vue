<template>
  <div class="flex flex-col min-h-screen">
    <Header class="absolute w-full" />
    <main class="relative top-36 mb-36">
      <h1 v-if="$slots.title" class="font-bold text-left text-4xl sm:text-6xl mb-10">
        <slot name="title" />
      </h1>
      <slot />
    </main>
    <Footer class="w-full mt-auto" />
  </div>
</template>

<script lang="ts">
import Header from "~/components/species/Header.vue";
import Footer from "~/components/species/Footer.vue";
export default defineComponent({
  components: {
    Header,
    Footer,
  },
});
</script>

<style scoped></style>
