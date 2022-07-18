<template>
	<div v-html="icon" />
</template>

<script lang="ts">
export default defineComponent({
	props: {
		icon: {
			type: String,
			required: true
		}
	}
})
</script>

<style scoped>
div {
	fill: currentColor
}
</style>