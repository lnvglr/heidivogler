<template>
	<div v-if="data.editor" class="max-w-2xl mx-auto markdown py-12 md:py-24 px-5 md:px-12" v-html="content" />
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
			return useMarkdown(this.data.editor)
		}
	},
})
</script>
<style lang="scss">
</style>