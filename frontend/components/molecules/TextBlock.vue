<template>
	<div class="max-w-2xl mx-auto markdown px-5 py-10 md:px-12md:py-24" v-html="useMarkdown(data.editor)" />
</template>

<script setup lang="ts">
defineProps<{data: any, page: any}>()
</script>