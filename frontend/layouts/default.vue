<template>
  <main class="relative top-36 mb-36">
    <h1 v-if="$slots.title" class="font-bold text-left text-4xl sm:text-6xl mb-10">
      <slot name="title" />
    </h1>
    <slot />
  </main>
</template>

<script lang="ts">
export default defineComponent({

});
</script>

<style scoped></style>
