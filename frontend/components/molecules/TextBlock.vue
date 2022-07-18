<template>
	<div class="max-w-2xl mx-auto markdown my-12" v-html="content" />
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