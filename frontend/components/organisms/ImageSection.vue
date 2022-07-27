<template>
	<section class="">
		<Image class="h-[80vh] min-h-[360px] max-h-[90vh]" :media="content" width="full" />
		<figcaption class="max-w-7xl mx-auto my-3 px-12 text-stone-400">{{content.caption}}</figcaption>
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