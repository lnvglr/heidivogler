<template>
	<section v-if="image" role="figure" :aria-labelledby="captionId">
		<div class="h-min md:min-h-[360px] max-h-[90vh] overflow-hidden dis">
			<!-- <ScrollParallax :speed="0.1"> -->
				<Image
					:media="image"
					class="h-full -z-10"
					width="full"
					object="contain"
				/>
					<!-- class="h-full -z-10 -translate-y-2/3 sm:-translate-y-1/2 lg:-translate-y-1/3 scale-105" -->
			<!-- </ScrollParallax> -->
		</div>
		<p :id="captionId" class="max-w-5xl mx-auto my-3 px-5 md:px-12 text-stone-400 leading-snug">{{image?.caption}}</p>
	</section>
</template>

<script setup lang="ts">
import Image from '~/components/molecules/Image.vue'
import ScrollParallax from "vue3-parallax/src/components/ScrollParallax.vue";
import { uuid } from 'vue-uuid'
import { StrapiMedia } from '~/types';
const props = defineProps<{
	data: {
		image: {
			data: {
				attributes: StrapiMedia
			}
		}
	}
}>()
const captionId = ref(uuid.v4())
const image = computed(() => props.data.image?.data?.attributes)

</script>