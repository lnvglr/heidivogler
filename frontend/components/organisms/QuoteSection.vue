<template>
	<section class="bg-stone-50 p-6 sm:p-12">
		<blockquote class="max-w-2xl mx-auto my-12 font-display italic text-3xl sm:text-4xl md:text-5xl text-center text-gold-500 !leading-tight" v-html="useMarkdown(data.quote)"></blockquote>
	</section>
</template>

<script setup lang="ts">
defineProps<{
	data: any
	page: any
}>()
</script>
<style lang="scss">
blockquote {
	em, i {
		font-style: inherit;
		color: var(--color-success-500)
	}

}
</style>