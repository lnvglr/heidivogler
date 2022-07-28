<template>
	<section class="">
	<div class="h-[80vh] min-h-[360px] max-h-[90vh] overflow-hidden">
			<ScrollParallax speed="0.1">
				<Image
					:media="content"
					class="h-full -z-10 -translate-y-1/3"
					width="full"
				/>
			</ScrollParallax>
			</div>
		<figcaption class="max-w-7xl mx-auto my-3 px-12 text-stone-400">{{content.caption}}</figcaption>
	</section>
</template>

<script lang="ts">
import Image from '~/components/molecules/Image.vue'
import ScrollParallax from "vue3-parallax/src/components/ScrollParallax.vue";
export default defineComponent({
	components: {
		Image,
		ScrollParallax
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