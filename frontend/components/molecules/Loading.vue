<template>
	<div class="fixed inset-0 bg-black text-white text-4xl flex justify-center items-center">
		Loading...
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	mounted() {
		console.log('Loading mounted')
	},
	setup () {
		

		return {}
	}
})
</script>

<style scoped>

</style>