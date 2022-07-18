<template>
	<section class="">
		<Image class="h-96" :media="content" width="full" />
	</section>
</template>

<script lang="ts">
import Image from '~/components/molecules/Image.vue'
export default defineComponent({
	components: {
		Image
	},
	props: {
		data: {
			type: Object,
		}
	},
	computed: {
		content() {
			return this.data.image?.data.attributes
		}
	},
})
</script>
<style lang="scss">

</style>