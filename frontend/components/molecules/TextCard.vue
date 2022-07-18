<template>
<section class="bg-stone-100 p-12 flex justify-center">
	<div class="max-w-2xl w-full mx-auto markdown my-12 bg-white rounded-md p-12" v-html="content" />
</section>
</template>

<script lang="ts">
export default defineComponent({
	props: {
		data: {
			type: Object,
		}
	},
	computed: {
		content() {
			return useMarkdown(this.data.card)
		}
	},
})
</script>
<style lang="scss">
</style>