<template>
	<div class="flex flex-col gap-5 items-center bg-stone-50 rounded-md p-12 w-full max-w-2xl">
	<div class="w-24 h-24 -translate-y-24 -mb-24">
		<Image class="h-full rounded-full" :media="testimonial.image.data?.attributes" width="160" />
	</div>
	<div class="grid grid-cols-4 gap-12 w-full">
	<Stars :n="5" class="justify-center items-center -mt-10" />
	<div class="col-span-2 flex flex-col items-center gap-2 text-center">
		<div class="text-3xl font-bold">{{testimonial.name}}</div>
		<div class="text-xl text-stone-500 font-medium leading-none">{{testimonial.position}}</div>
	</div>
	<div class="flex justify-center items-center text-primary-500 text-5xl leading-none text-center -mt-10"><FontAwesomeIcon :icon="['fas', 'quote-right']" /></div>
	</div>
	<div>{{testimonial.testimonial}}</div>
	</div>
</template>

<script lang="ts">
import Image from '~/components/molecules/Image.vue'
import Stars from '~/components/molecules/Stars.vue'
export default defineComponent({
	components: {
		Image,
		Stars
	},
	props: {
		testimonial: {
			type: Object,
		}
	},
	computed: {
		content() {
			// return this.data.image?.data.attributes
		}
	},
})
</script>
<style lang="scss">

</style>